import express from 'express'
import { authenticator } from '../middleware/auth.js'
import home from './modules/home.js'
import restaurant from './modules/restaurant.js'
import user from './modules/user.js'
import auth from './modules/auth.js'
const router = express.Router()

router.use('/restaurant', authenticator, restaurant)
router.use('/user', user)
router.use('/auth', auth)
router.use('/', authenticator, home)

export default router
