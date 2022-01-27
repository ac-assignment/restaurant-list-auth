import express from 'express'
import session from 'express-session'
import methodOverride from 'method-override'
import flash from 'connect-flash'
import hbs from '#configs/handlebars.js'
import usePassport from '#configs/passport.js'
import viewData from '#middleware/viewData.js'
import router from '#routers/index.js'
import '#configs/mongoose.js'

const app = express()
const PORT = process.env.PORT

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set("views", "./views")
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
usePassport(app)
app.use(flash())
app.use(viewData)
app.use(router)
app.use(function(err, req, res, next) {
  console.error(err.stack);
  next(err);
})

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})
