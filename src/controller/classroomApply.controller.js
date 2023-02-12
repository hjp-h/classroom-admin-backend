const service = require('../service/classroomApply.service')
class GoodsApplyController {
  async create(ctx, next) {
    // 获取参数
    const classroomApply = ctx.request.body
    const {id} = ctx.user
    // 插入数据库中
    const result = await service.create(classroomApply, id);
    if (result !== -1) {
      ctx.body = {code:200,message:'课室申请提交成功'}
    } else {
      ctx.body = {code:500,message:'课室申请提交失败'}
    }
  }

  // 获取维修列表（根据申请人id查询）
  async getClassroomApplyList(ctx, next) {
    const { id } = ctx.user
    const classroomApply = ctx.request.body
    const result = await service.getClassroomApplyList(id,classroomApply)
    if (result !== -1) {
      ctx.body = { code: 200, data: { list: [...result], totalCount: result.length },message:'success'}
    }else {
        ctx.body = {code:500,message:'服务器错误',data:null}
    }
  }

  // 获取全部维修列表（根据申请人id查询）
  async getAllClassroomApplyList(ctx, next) {
    const classroomApply = ctx.request.body
    const { id } = ctx.user
    let result = ''
    if (id !== 1) {
      result = await service.getClassroomApplyList(id,classroomApply)
    } else {
      result = await service.getAllClassroomApplyList(classroomApply)
    }
    if (result !== -1) {
      ctx.body = { code: 200, data: { list: [...result], totalCount: result.length },message:'success'}
    }else {
        ctx.body = {code:500,message:'服务器错误',data:null}
    }
  }

  // 删除申请单
  async deleteClassroomApply(ctx, next) {
    const { id } = ctx.params;
    const result = await service.deleteClassroomApplyById(id);
    if (result!==-1) {
      ctx.body = {code:200,message:'删除申请单单成功',data:result}
    } else {
      ctx.body = {code:500,message:'删除申请单单失败！'}
    }
  }

  // 审批
  async update(ctx,next) {
    const { id } = ctx.params;
    const classroomApply = ctx.request.body;
    const result = await service.update(id,classroomApply)
    if (result !== -1) {
      ctx.body = { code: 200, data:null,message:'操作成功'}
    }else {
        ctx.body = {code:500,message:'服务器错误',data:null}
    }
  }
}
module.exports = new GoodsApplyController()
