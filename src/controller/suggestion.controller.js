const service = require('../service/suggestion.service')
class SuggestionController {
  async getSuggestionList(ctx, next) {
    // 获取参数
    const queryData = ctx.request.body
    // 查询建议列表
    const result = await service.getSuggestionList(queryData)
    if (result !== -1) {
      ctx.body = {code:200,message:'success',data:{list:[...result],totalCount:result.length}}
    } else {
      ctx.body = {code:500,message:'服务器错误',data:{list:[],totalCount:0}}
    }
  }

  // 发表建议
  async create(ctx, next) {
    const suggestion = ctx.request.body;
    const {id } = ctx.user
    const result = await service.create(id,suggestion)
    if (result !== -1) {
      ctx.body = {code:200,message:'意见发布成功！',data:null}
    } else {
      ctx.body = {code:500,message:'服务器错误',data:null}
    }
  }

  // 回复意见
  async reply(ctx, next) {
    const reply = ctx.request.body;
    const suggestionId = ctx.params.id;
    const result = await service.reply(suggestionId,reply)
    if (result !== -1) {
      ctx.body = {code:200,message:'回复成功！',data:null}
    } else {
      ctx.body = {code:500,message:'服务器错误',data:null}
    } 
  }

  // 撤回回复
  async withDraw(ctx, next) {
    const id = ctx.params.id;
    const result = await service.withDraw(id);
    if (result !== -1) {
      ctx.body = {code:200,message:'撤回回复成功！',data:null}
    } else {
      ctx.body = {code:500,message:'服务器错误',data:null}
    }
  }

   // 删除意见
   async deleteSuggestion(ctx, next) {
    const id = ctx.params.id;
    const result = await service.deleteSuggestion(id);
    if (result !== -1) {
      ctx.body = {code:200,message:'删除意见成功！',data:null}
    } else {
      ctx.body = {code:500,message:'服务器错误',data:null}
    }
  }

  // 根据用户id获取信息列表
  async getSuggestionById(ctx, next) {
    const {id}= ctx.user
    const result = await service.getSuggestionById(id);
    if (result !== -1) {
      ctx.body = { code: 200, message: 'success', data: {list:[...result],totalCount:result.length}}
    } else {
      ctx.body = {code:500,message:'服务器错误',data:null}
    }
  }
}
module.exports = new SuggestionController()
