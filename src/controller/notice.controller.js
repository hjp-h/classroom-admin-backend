const service = require('../service/notice.service')
class NoticeController {
  async getNoticeList(ctx, next) {
    // 获取参数
    const queryData = ctx.request.body
    // 查询公告列表
    const result = await service.getNoticeList(queryData)
    if (result !== -1) {
      ctx.body = {code:200,message:'success',data:{list:[...result],totalCount:result.length}}
    } else {
      ctx.body = {code:500,message:'服务器错误',data:{list:[],totalCount:0}}
    }
  }

  // 创建公告
  async create(ctx, next) {
    const notice = ctx.request.body;
    const result = await service.create(notice)
    if (result !== -1) {
      ctx.body = {code:200,message:'创建公告成功！',data:null}
    } else {
      ctx.body = {code:500,message:'服务器错误',data:null}
    }
  }

  // 编辑公告
  async update(ctx, next) {
    const id = ctx.params.id;
    const notice = ctx.request.body;
    const result = await service.update(id,notice)
    if (result !== -1) {
      ctx.body = {code:200,message:'更新公告成功！',data:null}
    } else {
      ctx.body = {code:500,message:'服务器错误',data:null}
    }
  }

  // 删除公告
  async deleteNotice(ctx, next) {
    const id = ctx.params.id;
    const result = await service.deleteNoticeById(id);
    if (result !== -1) {
      ctx.body = {code:200,message:'删除公告成功！',data:null}
    } else {
      ctx.body = {code:500,message:'服务器错误',data:null}
    }
  }

  // 获取公告信息
  async getNotice(ctx, next) {
    const id = ctx.params.id;
    const result = await service.getNoticeById(id);
    if (result !== -1) {
      ctx.body = { code: 200, message: 'success', data: {list:[...result],totalCount:result.length}}
    } else {
      ctx.body = {code:500,message:'服务器错误',data:null}
    }
  }
}
module.exports = new NoticeController()
