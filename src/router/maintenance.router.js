// 路由相关
const Router = require('koa-router');
const maintenanceRouter = new Router({prefix: '/maintenance'});
// 中间件及contorller
const {
  create,
  getMaintenanceList,
  getAllMaintenanceList,
  urgentOrder,
  deleteOrder,
  update,
  getImageInfo
} = require('../controller/maintenance.controller');
const { verifyAuth } = require('../middleware/auth.middleware');

// 报修申请
maintenanceRouter.post('/', verifyAuth, create);
// 我的维修申请(根据当前登陆用户id查询)
maintenanceRouter.get('/list', verifyAuth, getMaintenanceList)
// 查询所有的维修申请
maintenanceRouter.post('/list', verifyAuth, getAllMaintenanceList)
// 催促订单
maintenanceRouter.post('/urgentOrder/:orderId', verifyAuth, urgentOrder)
// 删除申请单
maintenanceRouter.delete('/:id', verifyAuth, deleteOrder)
// 编辑维修单 （审批、确认完成）
maintenanceRouter.patch('/:id', verifyAuth, update)
// 查看维修描述图片
maintenanceRouter.get("/img/:id",getImageInfo)
module.exports = maintenanceRouter;
