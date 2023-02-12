const service = require('../service/role.service')
class RoleController {
  async getRoleList(ctx, next) {
    // 获取参数
    const queryData = ctx.request.body
    // 查询菜单列表
    const result = await service.getRoleList(queryData)
    if (result !== -1) {
      ctx.body = {code:200,message:'success',data:{list:[...result],totalCount:result.length}}
    } else {
      ctx.body = {code:500,message:'服务器错误',data:{list:[],totalCount:0}}
    }
  }

  // 创建角色
  async create(ctx, next) {
    // 获取参数
    const role = ctx.request.body;
    // 调用服务层方法
    const result = await service.create(role)
    if (result !== -1) {
      ctx.body = {code:200,message:'创建角色成功！',data:null}
    } else {
      ctx.body = {code:500,message:'服务器错误',data:null}
    }
  }

  // 编辑角色
  async update(ctx, next) {
    const id = ctx.params.id;
    const role = ctx.request.body;
    const result = await service.update(id,role)
    if (result !== -1) {
      ctx.body = {code:200,message:'更新角色成功！',data:null}
    } else {
      ctx.body = {code:500,message:'服务器错误',data:null}
    }
  }

  // 删除角色
  async deleteRole(ctx, next) {
    const id = ctx.params.id;
    const result = await service.deleteRoleById(id);
    if (result !== -1) {
      ctx.body = {code:200,message:'删除角色成功！',data:null}
    } else {
      ctx.body = {code:500,message:'服务器错误',data:null}
    }
  }

  // 获取角色
  async getRole(ctx, next) {
    const id = ctx.params.id;
    const result = await service.getRoleById(id);
    if (result !== -1) {
      ctx.body = { code: 200, message: 'success', data: {list:[...result],totalCount:result.length}}
    } else {
      ctx.body = {code:500,message:'服务器错误',data:null}
    }
  }

  // 根据角色id获取菜单
  async getMenuByRoleId(ctx, next) {
    const id = ctx.params.id;
    const result = await service.getMenuByRoleId(id)
    if (result!== -1) {
      ctx.body = {code:200,message:'success',data:[...result]}
    } else {
      ctx.body = {code:500,message:'服务器错误',data:null}
    }
  }
}
module.exports = new RoleController()
