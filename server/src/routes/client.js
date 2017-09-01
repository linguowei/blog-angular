const Router = require('koa-router')
const fs = require('fs')
const path = require('path')
const DB = require('../models')

const resolve = file => path.resolve(__dirname, file)
const router = new Router()

router.get('/api/client', async (ctx, next) => {
  ctx.response.body = 'client11'
})

module.exports = router