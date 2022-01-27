import express from 'express'
import passport from 'passport'
import bcrypt from 'bcryptjs'
import User from '#models/user.js'
const router = express.Router()

router.get('/login', (req, res) => {
  return res.render('login')
})
router.post('/login', 
  (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
      req.flash('error', '輸入不完整')
    }
    next()
  },
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/user/login'
  }
))
router.get('/register', (req, res) => {
  return res.render('register')
})
router.post('/register', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!email || !password || !confirmPassword) {
    errors.push({ message: '輸入不完整，請重新檢查。' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  if (errors.length) {
    return res.render('register', { errors, name, email, password, confirmPassword })
  }
  try {
    const user = await User.findOne({ email }).lean()
    if (user) {
      errors.push({ message: '這個 Email 已經註冊過了。' })
      return res.render('register', { errors, name, email, password, confirmPassword })
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    await User.create({ name, email, password: hash })
    return res.redirect('/user/login')
  } catch (error) {
    console.log(error)
  }
})
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '您已經成功登出。')
  return res.redirect('/user/login')
})

export default router