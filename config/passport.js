import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import bcrypt from 'bcryptjs'
import User from '#models/user.js'

export default (app) => {
  //初始化
  app.use(passport.initialize())
  app.use(passport.session())
  //設定登入策略
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      try {
        const user = await User.findOne({ email }).lean()
        if (!user) {
          req.flash('error', '此信箱尚未註冊')
          return done(null, false)
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
          req.flash('error', '信箱或密碼錯誤')
          return done(null, false)
        }
        return done(null, user)
      } catch (error) {
        return done(error, false)
      }
    }
  ))
  passport.use(new FacebookStrategy({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_APP_CALLBACK,
      profileFields: ['email', 'displayName']
    },
    async (accessToken, refreshToken, profile, done) => {
      const { email, name } = profile._json
      try {
        const existUser = await User.findOne({ email })
        if (existUser) {
          return done(null, existUser)
        }
        
        const randomPassword = Math.random().toString(36).slice(-8)
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(randomPassword, salt)
        const user = await User.create({ name, email, password: hash })
        done(null, user)
      } catch (error) {
        done(error, false)
      }
    }
  ))
  //序列化/反序列化
  passport.serializeUser((user, done) => {
    done(null, user._id)
  })
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).lean()
      done(null, user)
    } catch (error) {
      done(error, false)
    }
  })
}
