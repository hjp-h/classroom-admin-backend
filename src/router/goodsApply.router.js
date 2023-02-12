// 路由相关
const Router = require('koa-router');
const goodsApplyRouter = new Router({prefix: '/goodsApply'});
// 中间件及contorller
const {
  create,
  getGoodsApplyList,
  getAllGoodsApplyList,
  deleteGoodsApply,
  update
} = require('../controller/goodsApply.controller');
const { verifyAuth } = require('../middleware/auth.middleware');

// 报修申请
goodsApplyRouter.post('/', verifyAuth, create);
// 我的物资申请(根据当前登陆用户id查询)
goodsApplyRouter.get('/list', verifyAuth, getGoodsApplyList)
// 查询所有的物资申请
goodsApplyRouter.post('/list', verifyAuth, getAllGoodsApplyList)
// 删除未处理的申请单
goodsApplyRouter.delete('/:id', verifyAuth, deleteGoodsApply)
// 编辑维修单 （审批、确认完成）
goodsApplyRouter.patch('/:id',verifyAuth,update)
module.exports = goodsApplyRouter;
