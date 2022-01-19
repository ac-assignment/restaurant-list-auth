import db from '#config/mongoose.js'
import Restaurant from '#models/restaurant.js'
import { results as restaurantList } from './restaurant.json'

db.once('open', () => {
  restaurantList.forEach(r => {
    Restaurant.create({ ...r })
  })
  console.log('done')
})
