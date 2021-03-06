const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const Redis = require('koa-redis')
const pv = require('./middleware/koa-pv')
const m1 = require('./middleware/m1')
const m2 = require('./middleware/m2')
const m3 = require('./middleware/m3')

const mongooose = require('mongoose')
const dbConfig = require('./dbs/config')
const index = require('./routes/index')
const users = require('./routes/users')
const Class = require('./routes/class')

// error handler
onerror(app)
// 连接session服务
app.keys=['keys','keys,keys']
app.use(session({
  key:'mt',
  prefix:'mtpr',
  store:new Redis()
}))

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(pv())
app.use(m1())
app.use(m2())
app.use(m3())
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(Class.routes(), Class.allowedMethods())
mongooose.connect(dbConfig.dbs,{
  useNewUrlParser:true,
  useUnifiedTopology: true
})
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
