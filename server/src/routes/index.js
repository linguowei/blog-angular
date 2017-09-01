const Router = require('koa-router')
const router = new Router()

const clientRouter = require('./client')
const adminRouter = require('./admin')

router.use('/client', clientRouter.routes())
router.use('/admin', adminRouter.routes())

module.exports = router