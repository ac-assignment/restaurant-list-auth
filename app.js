import express from 'express'
import session from 'express-session'
import methodOverride from 'method-override'
import flash from 'connect-flash'
import hbs from '#config/handlebars.js'
import usePassport from '#config/passport.js'
import viewData from '#middleware/viewData.js'
import router from '#routes/index.js'
import '#config/mongoose.js'

const app = express()
const PORT = process.env.PORT

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set("views", "./views")
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
usePassport(app)
app.use(viewData)
app.use(router)

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})
