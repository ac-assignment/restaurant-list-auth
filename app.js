import express from 'express'
import methodOverride from 'method-override'
import router from '#routes/index.js'
import hbs from '#config/handlebars.js'
import '#config/mongoose.js'

const app = express()
const PORT = process.env.PORT

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set("views", "./views")
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(router)

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})
