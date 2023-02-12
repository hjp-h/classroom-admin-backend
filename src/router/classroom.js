// 路由相关
const Router = require('koa-router');
const goodsApplyRouter = new Router({prefix: '/classroom'});
// 中间件及contorller
const {
  create,
  getClassroomList,
  deleteClassroom,
  update
} = require('../controller/classroom.controller');
const { verifyAuth } = require('../middleware/auth.middleware');

// 课室申请
goodsApplyRouter.post('/', verifyAuth, create);
// 查询所有的课室申请
goodsApplyRouter.post('/list', verifyAuth, getClassroomList)
// 删除未处理的申请单
goodsApplyRouter.delete('/:id', verifyAuth, deleteClassroom)
// 编辑维修单 （审批、确认完成）
goodsApplyRouter.patch('/:id',verifyAuth,update)
module.exports = goodsApplyRouter;
