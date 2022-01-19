import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/restaurant_list')
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

export default db
