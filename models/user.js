import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('User', userSchema)
