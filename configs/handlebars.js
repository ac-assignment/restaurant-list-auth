import { create } from 'express-handlebars'

const hbs = create({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
    isEqual(prevOption, thisOption) {
      return prevOption === thisOption
    }
  }
})

export default hbs
