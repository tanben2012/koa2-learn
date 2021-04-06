const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/testAsync', async (ctx, next) => {
  global.console.log('start',new Date().getTime())
  const a = await new Promise((resolve,reject)=>{
    setTimeout(()=>{
      global.console.log('async a',new Date().getTime())
      resolve('a++')
    },1000)
  })
  const b = await 123
  ctx.body = {
    a,
    b
  }
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
