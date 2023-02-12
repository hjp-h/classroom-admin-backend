const service = require('../service/commentM.service.js');

class CommentMController {
  async create(ctx, next) {
    const comment = ctx.request.body;
    const { id } = ctx.user;
    const result = await service.create(id, comment);
    if (result !== -1) {
      ctx.body = {data:{...result},code:200,message:'发表评论成功'};
    } else {
      ctx.body = {code:500,data:null,message:'服务器错误'}
    }
  }

  async reply(ctx, next) {
    const comment = ctx.request.body;
    const { commentId } = ctx.params;
    const { id } = ctx.user;
    const result = await service.reply(id, commentId, comment);
    if (result !== -1) {
      ctx.body = {data:{...result},code:200,message:'回复成功'};
    } else {
      ctx.body = {code:500,data:null,message:'服务器错误'}
    }
  }


  async remove(ctx, next) {
    const { id } = ctx.params;
    const result = await service.remove(id);
    if (result !== -1) {
      ctx.body = {data:{...result},code:200,message:'删除评论成功'};
    } else {
      ctx.body = {code:500,data:null,message:'服务器错误'}
    }
  }

  async getCommentsByApplyId(ctx, next) {
    const { applyId } = ctx.params;
    const result = await service.getCommentsByAppyId(applyId);
    if (result !== -1) {
      ctx.body = {data:{list:[...result],totalCount:result.length},code:200,message:'success'};
    } else {
      ctx.body = {code:500,data:null,message:'服务器错误'}
    }
  }

  async getCommentsList(ctx, next) {
    const comment = ctx.request.body;
    const result = await service.getComments(comment);
    if (result !== -1) {
      ctx.body = {data:{list:[...result],totalCount:result.length},code:200,message:'success'};
    } else {
      ctx.body = {code:500,data:null,message:'服务器错误'}
    }
  }
}

module.exports = new CommentMController();
