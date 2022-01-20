import express from 'express'
import user from '#routes/modules/user.js'
import restaurant from '#routes/modules/restaurant.js'
import home from '#routes/modules/home.js'
const router = express.Router()

router.use('/user', user)
router.use('/restaurant', restaurant)
router.use('/', home)

export default router
