import bcrypt from 'bcryptjs'
import { readFile } from 'fs/promises'
import db from '#configs/mongoose.js'
import Restaurant from '#models/restaurant.js'
import User from '#models/user.js'

const SEED_USERS = [{
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
    restaurantList: [1,2,3]
  }, {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
    restaurantList: [4,5,6]
  }
]

db.once('open', async () => {
  try {
    const data = await readFile(new URL('./restaurant.json', import.meta.url))
    const restaurantRaw = JSON.parse(data).results
    
    for (const seedUser of SEED_USERS) {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(seedUser.password, salt)
      const user = await User.create({ ...seedUser, password: hash })
      
      const restaurantForUser = restaurantRaw.filter(r => seedUser.restaurantList.includes(r.id))
      restaurantForUser.forEach(r => r.user_id = user._id)
      await Restaurant.insertMany(restaurantForUser)
    }
    
    console.log('done')
  } catch (error) {
    console.log(error)
  } finally {
    process.exit()
  }
})
