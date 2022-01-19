import express from 'express'
import home from '#routes/modules/home.js'
import restaurant from '#routes/modules/restaurant.js'
const router = express.Router()

router.use('/', home)
router.use('/', restaurant)

export default router
