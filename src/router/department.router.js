const Router = require('koa-router');
const {
  getDepartmentList,
  create,
  deleteDepartment,
  update
} = require('../controller/department.controller');
const { verifyAuth } = require('../middleware/auth.middleware');

const departmentRouter = new Router({prefix: '/department'});

// 查看部门列表
departmentRouter.post('/list', verifyAuth, getDepartmentList)

// 添加部门
departmentRouter.post('/', verifyAuth, create)

// 修改部门
departmentRouter.patch('/:id',verifyAuth,update)

// 删除部门
departmentRouter.delete('/:id',verifyAuth,deleteDepartment)
module.exports = departmentRouter;
