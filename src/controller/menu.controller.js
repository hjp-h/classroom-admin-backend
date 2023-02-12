const service = require('../service/menu.service')
class MenuController {
  async getUserMenu(ctx, next) {
    // 获取参数
    const { offset,size } = ctx.query
    // 查询菜单列表
    const result = await service.getUserMenu(offset, size)
    if (result !== -1){
      ctx.body = {code:200,message:'success',data:{list:[...result]}}
    }else {
      ctx.body = {code:500,message:'服务器出错',data:null}
    }
  }
  // 查询某个菜单
  async getMenuById(ctx,next) {
    const id = ctx.params.id
    const result = await service.getMenuById(id)
    if (result !== -1) {
      ctx.body = { code: 200, message: 'success', data: {...result}}
    } else {
      ctx.body = {code:500,message:'服务器出错',data:null}
    }
  }
  // 创建菜单
  async create(ctx, next) {
    const menu = ctx.request.body;
    const result = await service.create(menu)
    if (result !== -1) {
      ctx.body = {code:200,message:'创建菜单成功',data:null}
    } else {
      ctx.body = {code:500,message:'服务器出错',data:null}
    }
  }
  // 更新菜单
  async update(ctx, next) {
    const id = ctx.params.id
    const menu = ctx.request.body;
    const result = await service.update(id,menu)
    if (result !== -1) {
      ctx.body = {code:200,message:'更新菜单成功',data:null}
    } else {
      ctx.body = {code:500,message:'服务器出错',data:null}
    }
  }

  // 删除菜单
  async deleteMenuById(ctx,next) {
    const id = ctx.params.id
    if (Number(id) <= 22) {
      ctx.body = { code: 400, message: 'id小于22无法删除', data: null }
      return;
    }
    const result = await service.deleteMenuById(id)
    if (result !== -1) {
      ctx.body = {code:200,message:'删除菜单成功',data:null}
    } else {
      ctx.body = {code:500,message:'服务器出错',data:null}
    }
  }
}
module.exports = new MenuController()
