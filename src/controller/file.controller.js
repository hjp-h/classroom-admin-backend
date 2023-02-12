const fileService = require('../service/file.service');
const { AVATAR_PATH } = require('../constants/file-path');
const { APP_HOST, APP_PORT } = require('../app/config');

class FileController {
  // 保存头像信息
  async saveAvatarInfo(ctx, next) {
    // 1.获取图像相关的信息
    const userId = ctx.user.id;
    const { filename, mimetype, size } = ctx.req.file;
    console.log(filename)
    // 2.将图像信息数据保存到数据库中
    const result = await fileService.createAvatar(filename, mimetype, size, userId);
    // 3.将图像地址插入用户表
    const filePath = `${APP_HOST}:${APP_PORT}/users/avatar/${userId}`
    await fileService.updateAvatarByUserId(filePath, userId)
    // 4.返回结果
    ctx.body = { code: 200, data: { message: '上传头像成功~', ...result } };
  }

  
  // 保存上传的动态信息
  async savePictureInfo(ctx, next) {
    // 获取用户的id
    const userId = ctx.user.id;
    // 动态的id
    const momentId = ctx.params.momentId
    // 拿到用户上传的图像数组
    const files = ctx.req.files;
    try {
      for (let file of files) {
        console.log(file)
        const { filename, mimetype, size } = file;
        console.log(userId, momentId, filename, mimetype, size)
        await fileService.savePictureInfo(filename, mimetype, size, momentId, userId);
      }
      ctx.body = { code: 200, data: { message: '上传照片成功~' } };
    } catch (err) {
      console.log(err)
    }
  }

  // 保存上传的维修图片信息
  async saveMaintenanceImg(ctx, next) {
    // 获取用户的id
    const userId = ctx.user.id;
    // 申请单的id
    const applyId = ctx.params.id;
    // 拿到用户上传的图像
    const file = ctx.req.file;
    const { filename, mimetype, size } = file;
    // 调用服务层方法
    const result = await fileService.saveMaintenanceImg(filename, mimetype, size, applyId, userId);
    if (result !== -1) {
      ctx.body = { code: 200, data:null, message: '上传照片成功~' };
    } else {
      console.log(err)
      ctx.body = { code: 500, data:null, message: '上传照片失败' };
    }
  }

  // 保存上传的背景图片信息
  async saveBackgroundImgInfo(ctx,next) {
    console.log('saveBackgroundImgInfo')
    // 获取用户的id
    try{
      const userId = ctx.user.id;
      // 获取用户上传的背景图片的信息
      const {filename, mimetype, size} = ctx.req.file;
      // 将图片信息插入数据库
      const result = await fileService.creatBackgroundImg(filename, mimetype, size,userId);
      // 3.将图像地址插入用户表
      const filePath = `${APP_HOST}:${APP_PORT}/user/${userId}/backgroundImage`
      await fileService.updateBackgroundByUserId(filePath, userId)
      // 4.返回结果
      ctx.body = { code: 200, data:{message: '上传背景图片成功~', ...result} };
    }catch(err){
      console.log(err)
    }
  }
}

module.exports = new FileController();
