// 路由相关
const Router = require('koa-router');
const goodsApplyRouter = new Router({prefix: '/classroomApply'});
// 中间件及contorller
const {
  create,
  getClassroomApplyList,
  getAllClassroomApplyList,
  deleteClassroomApply,
  update
} = require('../controller/classroomApply.controller');
const { verifyAuth } = require('../middleware/auth.middleware');

// 课室申请
goodsApplyRouter.post('/', verifyAuth, create);
// 我的课室申请(根据当前登陆用户id查询)
goodsApplyRouter.get('/list', verifyAuth, getClassroomApplyList)
// 查询所有的课室申请
goodsApplyRouter.post('/list', verifyAuth, getAllClassroomApplyList)
// 删除未处理的申请单
goodsApplyRouter.delete('/:id', verifyAuth, deleteClassroomApply)
// 编辑维修单 （审批、确认完成）
goodsApplyRouter.patch('/:id',verifyAuth,update)
module.exports = goodsApplyRouter;
