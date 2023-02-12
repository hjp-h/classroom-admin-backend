const service = require('../service/maintenance.service')
const { MAINTENANCE_PATH } = require('../constants/file-path')
const fs = require('fs')
class MaintenanceController {
  async create(ctx, next) {
    // 获取参数
    const maintenanceData = ctx.request.body
    const {id} = ctx.user
    // 插入数据库中
    const result = await service.create(maintenanceData, id);
    if (result !== -1) {
      console.log(result)
      ctx.body = { code: 200, message: 'success', data: {id:result.insertId}}
    } else {
      ctx.body = {code:500,message:"error",data:null}
    }
  }
  // 获取维修列表（根据申请人id查询）
  async getMaintenanceList(ctx, next) {
    const { id } = ctx.user
    const result = await service.getMaintenanceList(id)
    if (result !== -1) {
      ctx.body = { code: 200, data: { list: [...result], totalCount: result.length },message:'success'}
    }else {
        ctx.body = {code:500,message:'服务器错误',data:null}
    }
  }

  // 获取全部维修列表
  async getAllMaintenanceList(ctx, next) {
    const maintenance = ctx.request.body
    let result = ''
    const { id } = ctx.user
    if (id !== 1) {
      result = await service.getAllMaintenanceList(maintenance,id)
    } else {
      result = await service.getAllMaintenanceList(maintenance)
    }
    if (result !== -1) {
      ctx.body = { code: 200, data: { list: [...result], totalCount: result.length },message:'success'}
    }else {
        ctx.body = {code:500,message:'服务器错误',data:null}
    }
  }
  // 催促订单
  async urgentOrder(ctx,next) {
    const { orderId } = ctx.params;
    const result = await service.updateUrgentById(orderId);
    ctx.body = {code:200,message:'催促订单成功',data:result}
  }

  // 删除未审批的申请单
  async deleteOrder(ctx, next) {
    const { id } = ctx.params;
    const result = await service.deleteMaintenanceById(id);
    if (result) {
      ctx.body = {code:200,message:'删除订单成功',data:result}
    } else {
      ctx.body = {code:202,message:'删除订单失败,该申请单已在处理流程中！'}
    }
  }

  // 审批、确认完成
  async update(ctx,next) {
    const { id } = ctx.params;
    const maintenance = ctx.request.body;
    const result = await service.update(id,maintenance)
    if (result !== -1) {
      ctx.body = { code: 200, data:null,message:'操作成功'}
    }else {
        ctx.body = {code:500,message:'服务器错误',data:null}
    }
  }

  // 获取描述图片
  async getImageInfo(ctx, next) {
    // 获取申请单id
    const applyId = ctx.params.id;
    // 获取图片信息
    const img = await service.getImageInfo(applyId);
    if (img !== -1) {
      if (img.length) {
        const { filename, mimetype } = img[0];
        // 文件路径
        const filePath = MAINTENANCE_PATH + filename;
        // 设置相应文件类型 没设置就是直接下载
        ctx.response.set('content-type', mimetype);
        // 返回buffer
        ctx.body = fs.createReadStream(filePath);
      } else {
        ctx.response.set('content-type', 'image/jpeg');
        ctx.body = fs.createReadStream(`${MAINTENANCE_PATH}/noResult.jpg`);
      }
    } else {
      ctx.body = {code:500,message:'服务器错误',data:null}
    }
  }
}
module.exports = new MaintenanceController()
