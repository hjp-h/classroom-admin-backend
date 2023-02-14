const service = require('../service/classroom.service')
class GoodsApplyController {
  async create(ctx, next) {
    // 获取参数
    const classroom = ctx.request.body
    // 插入数据库中
    const result = await service.create(classroom);
    if (result !== -1) {
      ctx.body = {code:200,message:'创建课室成功'}
    } else {
      ctx.body = {code:500,message:'创建课室失败'}
    }
  }

  // 获取课室列表
  async getClassroomList(ctx, next) {
    const classroom = ctx.request.body
    const result = await service.getClassroomList(classroom)
    if (result !== -1) {
      ctx.body = { code: 200, data: { list: [...result], totalCount: result.length },message:'success'}
    }else {
        ctx.body = {code:500,message:'服务器错误',data:null}
    }
  }

  // 删除课室
  async deleteClassroom(ctx, next) {
    const { id } = ctx.params;
    const result = await service.deleteClassroomById(id);
    if (result!==-1) {
      ctx.body = {code:200,message:'删除课室成功',data:result}
    } else {
      ctx.body = {code:500,message:'删除课室失败！'}
    }
  }

  // 修改课室
  async update(ctx,next) {
    const { id } = ctx.params;
    const classroom = ctx.request.body;
    const result = await service.update(id,classroom)
    if (result !== -1) {
      ctx.body = { code: 200, data:null,message:'操作成功'}
    }else {
      ctx.body = {code:500,message:'服务器错误',data:null}
    }
  }
}
module.exports = new GoodsApplyController()
