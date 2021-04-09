const router = require('koa-router')()
const Class = require('../dbs/models/class')

router.prefix('/class')

router.post('/add', async function(ctx, next){
    const result = new Class({
        grade:ctx.request.body.grade,
        class:ctx.request.body.class
    }).save()
    ctx.body={
        result
    }
})

router.post('/find', async function(ctx, next){
    const result =  await Class.find({
        grade:ctx.request.body.grade
    })
    ctx.body={
        result
    }
})

module.exports = router