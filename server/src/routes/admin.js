const Router = require('koa-router')
const fs = require('fs')
const path = require('path')
const DB = require('../models')

const resolve = file => path.resolve(__dirname, file)
const router = new Router()

router.get('/api/admin', async (ctx, next) => {
  ctx.response.body = 'admin'
})

module.exports = router