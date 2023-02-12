const Router = require('koa-router');

const {
  verifyAuth
} = require('../middleware/auth.middleware');
const {
  create,
  reply,
  remove,
  getCommentsByApplyId,
  getCommentsList
} = require('../controller/commentM.controller.js')

const commentMRouter = new Router({prefix: '/comment'});
// 获取所有的评论列表
commentMRouter.post('/list', verifyAuth, getCommentsList);
// 回复
commentMRouter.patch('/:commentId', verifyAuth, reply);// 系统
commentMRouter.post('/:commentId', verifyAuth, reply);// 小程序
// 发表评论
commentMRouter.post('/', verifyAuth, create);
// 删除评论
commentMRouter.delete('/:id', verifyAuth, remove);
// 根据订单id获取评论列表
commentMRouter.get('/list/:applyId',verifyAuth,getCommentsByApplyId);

module.exports = commentMRouter;
