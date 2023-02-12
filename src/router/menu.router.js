const Router = require('koa-router');
const {
  getUserMenu,
  create,
  update,
  deleteMenuById,
  getMenuById
} = require('../controller/menu.controller');
const { verifyAuth } = require('../middleware/auth.middleware');

const menuRouter = new Router({prefix: '/menu'});

// 查看菜单列表
menuRouter.post('/list', verifyAuth, getUserMenu)
// 查询某个菜单
menuRouter.get('/:id',verifyAuth,getMenuById)
// 创建菜单
menuRouter.post('/', verifyAuth, create)
// 修改菜单
menuRouter.patch('/:id', verifyAuth, update)
// 删除菜单
menuRouter.delete('/:id',verifyAuth,deleteMenuById)
module.exports = menuRouter;
