import express from 'express'
import { authenticator } from '#middleware/auth.js'
import home from '#routes/modules/home.js'
import restaurant from '#routes/modules/restaurant.js'
import user from '#routes/modules/user.js'
import auth from '#routes/modules/auth.js'
const router = express.Router()

router.use('/restaurant', authenticator, restaurant)
router.use('/user', user)
router.use('/auth', auth)
router.use('/', authenticator, home)

export default router
