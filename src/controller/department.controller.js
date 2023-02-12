const service = require('../service/department.service')
class DepartmentController {
  // 获取部门列表
  async getDepartmentList(ctx, next) {
    // 获取参数
    const queryData = ctx.request.body
    // 查询菜单列表
    const result = await service.getDepartmentList(queryData)
    ctx.body = {code:200,message:'success',data:{list:[...result],totalCount:result.length}}
  }

  // 添加部门
  async create(ctx,next) {
    // 获取部门参数
    const department = ctx.request.body
    // 添加部门
    const result = await service.create(department)
    if (result !== -1) {
      ctx.body = { code: 200, message: '创建部门成功！', data: null }
    } else {
      ctx.body = {code:500,message:'服务器出错',data:null}
    }
  }

  // 修改部门
  async update(ctx,next) {
    // 获取id
    const id = ctx.params.id
    // 获取更新信息
    const department = ctx.request.body
    // 修改部门
    const result = await service.update(id,department);
    if (result !== -1) {
      ctx.body = { code: 200, message: '更新部门成功！', data: null }
    } else {
      ctx.body = {code:500,message:'服务器出错',data:null}
    }
  }

  // 删除部门
  async deleteDepartment(ctx, next) {
    // 获取删除的部门id
    const id = ctx.params.id
    // 删除部门
    const result = await service.deleteDepartmentById(id);
    if (result !== -1) {
      ctx.body = { code: 200, message: '删除部门成功！', data: null }
    } else {
      ctx.body = {code:500,message:'服务器出错',data:null}
    }
  }
}
module.exports = new DepartmentController()
