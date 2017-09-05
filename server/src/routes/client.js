const Router = require('koa-router')
const fs = require('fs')
const path = require('path')
const DB = require('../models')

const resolve = file => path.resolve(__dirname, file)
const router = new Router()

// 获取文章列表数据
router.get('/articleList', async (ctx, next) => {
  await DB.Article.find({state: "publish"}, (err, docs) => {
    if (err) {
      ctx.throw(500)
      return;
    }
    ctx.response.body = {
      code: 200,
      msg: 'msg',
      data: docs
    }
  })
})

// 获取标签数据
router.get('/tagList', async (ctx, next) => {
  await DB.Tag.find({}, (err, docs) => {
    if (err) {
      ctx.throw(500)
      return;
    }
    ctx.response.body = {
      code: 200,
      msg: 'msg',
      data: docs
    }
  })
})

module.exports = router