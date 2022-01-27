import express from 'express'
import Restaurant from '#models/restaurant.js'
const router = express.Router()

router.get('/', async (req, res) => {
  const user_id = req.user._id
  try {
    const entityList = await Restaurant.find({ user_id }).lean()
    res.render('index', { entityList })
  } catch (error) {
    next(error)
  }
})

router.get('/search', async (req, res, next) => {
  const user_id = req.user._id
  const keyword = req.query.keyword.trim()
  const { sort } = req.query
  const sortOptions = {
    'name_en_asc': { name_en: 'asc' },
    'name_en_desc': { name_en: 'desc' },
    'category_asc': { category: 'asc' },
    'location_asc': { location: 'asc' },
  }
  try {
    const selector = {
      user_id,
      $or: [
        { name: RegExp(keyword, 'i') },
        { category: RegExp(keyword, 'i') }
      ]
    }
    const entityList = await Restaurant.find(selector).sort(sortOptions[sort]).lean()
    const isNoResult = entityList.length === 0
    res.render('index', { entityList, keyword, sort, isNoResult })
  } catch (error) {
    next(error)
  }
})

export default router
