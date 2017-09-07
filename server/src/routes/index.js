const Router = require('koa-router')
const router = new Router()
const fs = require('fs')
const path = require('path')

const resolve = file => path.resolve(__dirname, file)
const clientRouter = require('./client')
const adminRouter = require('./admin')

router.use('/api/client', clientRouter.routes())
router.use('/api/admin', adminRouter.routes())

router.get('/admin', (ctx, next) => {
	const html = fs.readFileSync(resolve('../../dist/' + 'admin.html'), 'utf-8')
	ctx.body = html
})

router.get('/admin/*', (ctx, next) => {
	const html = fs.readFileSync(resolve('../../dist/' + 'admin.html'), 'utf-8')
	ctx.body = html
})

router.get('*', (ctx, next) => {
	const html = fs.readFileSync(resolve('../../dist/' + 'index.html'), 'utf-8')
	ctx.body = html
})

module.exports = router