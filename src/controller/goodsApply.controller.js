const service = require('../service/goodsApply.service')
class GoodsApplyController {
  async create(ctx, next) {
    // 获取参数
    const goodsApply = ctx.request.body
    const {id} = ctx.user
    // 插入数据库中
    const result = await service.create(goodsApply, id);
    if (result !== -1) {
      ctx.body = {code:200,message:'物资申请提交成功'}
    } else {
      ctx.body = {code:500,message:'物资申请提交失败'}
    }
  }

  // 获取维修列表（根据申请人id查询）
  async getGoodsApplyList(ctx, next) {
    const { id } = ctx.user
    const goodsApply = ctx.request.body
    const result = await service.getGoodsApplyList(id,goodsApply)
    if (result !== -1) {
      ctx.body = { code: 200, data: { list: [...result], totalCount: result.length },message:'success'}
    }else {
        ctx.body = {code:500,message:'服务器错误',data:null}
    }
  }

  // 获取全部维修列表（根据申请人id查询）
  async getAllGoodsApplyList(ctx, next) {
    const goodsApply = ctx.request.body
    const { id } = ctx.user
    let result = ''
    if (id !== 1) {
      result = await service.getGoodsApplyList(id,goodsApply)
    } else {
      result = await service.getAllGoodsApplyList(goodsApply)
    }
    if (result !== -1) {
      ctx.body = { code: 200, data: { list: [...result], totalCount: result.length },message:'success'}
    }else {
        ctx.body = {code:500,message:'服务器错误',data:null}
    }
  }

  // 删除申请单
  async deleteGoodsApply(ctx, next) {
    const { id } = ctx.params;
    const result = await service.deleteGoodsApplyById(id);
    if (result!==-1) {
      ctx.body = {code:200,message:'删除申请单单成功',data:result}
    } else {
      ctx.body = {code:500,message:'删除申请单单失败！'}
    }
  }

  // 审批
  async update(ctx,next) {
    const { id } = ctx.params;
    const goodsApply = ctx.request.body;
    const result = await service.update(id,goodsApply)
    if (result !== -1) {
      ctx.body = { code: 200, data:null,message:'操作成功'}
    }else {
        ctx.body = {code:500,message:'服务器错误',data:null}
    }
  }
}
module.exports = new GoodsApplyController()
