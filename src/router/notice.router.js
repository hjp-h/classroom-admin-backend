const Router = require('koa-router');
const {
  getNoticeList,
  create,
  deleteNotice,
  update,
  getNotice
} = require('../controller/notice.controller');
const { verifyAuth } = require('../middleware/auth.middleware');

const noticeRouter = new Router({prefix: '/notice'});

// 查看公告列表
noticeRouter.post('/list',verifyAuth,getNoticeList)
// 创建公告
noticeRouter.post("/", verifyAuth, create)
// 删除公告
noticeRouter.delete('/:id', verifyAuth, deleteNotice)
// 修改公告
noticeRouter.patch('/:id', verifyAuth, update)
// 获取某个公告
noticeRouter.get('/:id',verifyAuth,getNotice)
module.exports = noticeRouter;
