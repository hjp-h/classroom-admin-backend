const Router = require('koa-router');
const {
  getRoleList,
  create,
  deleteRole,
  update,
  getMenuByRoleId,
  getRole
} = require('../controller/role.controller');
const { verifyAuth } = require('../middleware/auth.middleware');

const roleRouter = new Router({prefix: '/role'});

// 查看角色列表
roleRouter.post('/list',verifyAuth,getRoleList)
// 创建角色
roleRouter.post("/", verifyAuth, create)
// 删除角色
roleRouter.delete('/:id', verifyAuth, deleteRole)
// 修改角色
roleRouter.patch('/:id', verifyAuth, update)
// 获取某个角色
roleRouter.get('/:id',verifyAuth,getRole)
// 根据角色获取菜单
roleRouter.get('/:id/menu',verifyAuth,getMenuByRoleId)
module.exports = roleRouter;
