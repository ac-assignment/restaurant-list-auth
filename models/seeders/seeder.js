import bcrypt from 'bcryptjs'
import { readFile } from 'fs/promises'
import db from '#config/mongoose.js'
import Restaurant from '#models/restaurant.js'
import User from '#models/user.js'

const SEED_USER = {
  name: 'root',
  email: 'root@gmail.com',
  password: '123'
}

db.once('open', async () => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(SEED_USER.password, salt)
    const user = await User.create({ ...SEED_USER, password: hash })
    
    const data = await readFile(new URL('./restaurant.json', import.meta.url))
    const restaurantList = JSON.parse(data).results
    restaurantList.forEach((r) => {
      r.userId = user._id
    })
    
    await Restaurant.insertMany(restaurantList)
    console.log('done')
    process.exit()
  } catch (error) {
    console.log(error)
  }
})
