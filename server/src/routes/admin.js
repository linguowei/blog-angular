const Router = require('koa-router')
const fs = require('fs')
const path = require('path')
const DB = require('../models')
const users = require('../users/index').items

const findUser = (name, password) => {
	return users.find((item) => {
		return item.name === name && item.password === password;
	});
};

const resolve = file => path.resolve(__dirname, file)
const router = new Router()

router.post('/login', async (ctx, next) => {
	let user = findUser(ctx.request.body.name, ctx.request.body.pwd);
	if(user){
		let session = ctx.session
		session.isLogin = true
		session.userName = ctx.request.body.name
		ctx.body = {
      code: 200,
      msg: '登录成功！'
    }
	}else{
		ctx.body = {
      code: 400,
      msg: '账号或密码错误！'
    }
	}
})

router.get('/logout', async (ctx, next) => {
	ctx.session = null;
	ctx.response.body = {
    code: 200,
		msg: '退出登录成功！'
  }
})

router.all('*', async (ctx, next) => {
  if ( ctx.session && ctx.session.isLogin && ctx.session.userName ) {
		await next()
	} else {
		ctx.body = {
      code: 401,
			msg: 'Unauthorized'
    }
	}
})

// 保存文章
router.post('/addArticle', async (ctx, next) => {
  await new DB.Article(ctx.request.body).save((err, docs) => {
    if(err){
      ctx.throw(500)
      return
    }
    ctx.response.body = {
      code: 200,
      msg: '保存成功',
      data: docs
    }
  })
})

// 删除文章
router.post('/deleteArticle', async (ctx, next) => {
  await DB.Article.remove({_id: ctx.request.body.id,}, (err, docs) => {
    if(err){
      ctx.throw(500)
      return
    }
    ctx.response.body = {
      code: 200,
      msg: '删除成功',
      data: docs
    }
  })
})

// 修改文章
router.post('/modifyArticle', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    DB.Article.update({
      _id: ctx.request.body._id, 
    }, ctx.request.body, (err, docs) => {
      if(err){
        reject(err)
      }else{
        resolve(docs)
      }
    })
  }).then((success) => {
    ctx.response.body = {
      code: 200,
      msg: '修改成功',
      data: ctx.request.body
    }
  })
})

// 获取文章列表数据
router.get('/articleList', async (ctx, next) => {
  await DB.Article.find({state: "publish"}, (err, docs) => {
    if (err) {
      ctx.throw(500)
      return;
    }
    ctx.response.body = {
      code: 200,
      msg: 'success',
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
      msg: 'success',
      data: docs
    }
  })
})

// 新增标签
router.post('/addTag', async (ctx, next) => {
  await new DB.Tag(ctx.request.body).save((err, docs) => {
    if(err){
      ctx.throw(500)
      return
    }
    ctx.response.body = {
      code: 200,
      msg: '新增成功',
      data: docs
    }
  })
})

// 删除标签
router.post('/deleteTag', async (ctx, next) => {
  await DB.Tag.remove({
    _id: ctx.request.body.id,
  }, (err, docs) => {
    if(err){
      ctx.throw(500)
      return
    }
    ctx.response.body = {
      code: 200,
      msg: '删除成功',
      data: docs
    }
  })
})


module.exports = router