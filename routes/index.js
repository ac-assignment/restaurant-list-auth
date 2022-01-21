import express from 'express'
import { authenticator } from '#middleware/auth.js'
import user from '#routes/modules/user.js'
import restaurant from '#routes/modules/restaurant.js'
import home from '#routes/modules/home.js'
const router = express.Router()

router.use('/user', user)
router.use('/restaurant', authenticator, restaurant)
router.use('/', authenticator, home)

export default router
