import express from 'express'
import passport from 'passport'
import User from '#models/user.js'
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login')
})
router.post('/login', (req, res) => {
  
})
router.get('/register', (req, res) => {
  res.render('register')
})
router.post('/register', (req, res) => {
  
})

export default router