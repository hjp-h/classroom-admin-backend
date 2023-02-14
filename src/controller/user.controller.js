const fs = require('fs');

const userService = require('../service/user.service');
const fileService = require('../service/file.service');
const { AVATAR_PATH,BACKGROUND_PATH } = require('../constants/file-path');


class UserController {
  // 查询用户列表
  async getUserList(ctx,next) {
    // 获取参数数据
    const queryData = ctx.request.body;
    const result = await userService.getUserList(queryData);
    // 返回数据
    if (result === -1) {
      ctx.body = { data:null, code: 500,message:'创建用户失败！'};
    } else {
      ctx.body = { data: { list: [...result], totalCount: result.length }, code: 200 }
    }
  }

  // 查询所有用户 下拉列表
  async geAllUserList(ctx,next) {
    const result = await userService.getAllUserList();
    // 返回数据
    if (result === -1) {
      ctx.body = { data:null, code: 500,message:'服务器错误！'};
    } else {
      ctx.body = { data: result, code: 200 }
    }
  }

  // 创建用户
  async create(ctx, next) {
    // 获取用户请求传递的参数
    const user = ctx.request.body;
    // 查询数据
    const result = await userService.create(user);
    // 返回数据
    if (result === -1) {
      ctx.body = { data:null, code: 500,message:'创建用户失败！'};
    } else {
      ctx.body = { data:null, code: 200,message:'创建用户成功！' };
    }
   
  }

  // 删除某个用户
  async deleteUser(ctx,next) {
    // 获取删除用户的id
    const id = ctx.params.id
    console.log(id)
    // 删除数据
    await userService.deleteUserById(id)
    // 返回数据
    ctx.body = { data: null,code:200,message:'删除用户成功！'}
  }

  // 修改用户
  async updateUser(ctx, next) {
    // 获取更改用户的id
    const id = ctx.params.id
    // 获取用户的更改信息
    const user = ctx.request.body
    // 更新数据
    const result = await userService.updateUserById(id, user);
    if (result === -1) {
      ctx.body = {data:null,code:500,message:'更新用户失败！'}
    } else {
      ctx.body = {data:null,code:200,message:'更新用户成功！'}
    }
   
  }

  // 通过name查询某个用户
  async findUserById(ctx, next) {
    // 获取用户请求传递的name
    const id = ctx.params.id;
    // 去数据库中查询
    const result = await userService.getUserById(id);
    if (result !== -1) {
      ctx.body = {data:{...result[0]},code:200}
    } else {
      ctx.body = {data:null,code:500,message:'服务器错误'}
    }
  }

  // 获取用户头像
  async avatarInfo(ctx, next) {
    // 获取用户id
    const userId = ctx.params.userId;
    
    // 去数据库中查询该用户id对应的用户头像信息
    const avatar = await userService.getAvatarByUserId(userId);
    if(avatar) {
      const { filename, mimetype } = avatar;
      // 获取文件的路径
      const filePath = AVATAR_PATH + filename;
      // 设置响应文件类型 没有设置的话就是直接下载
      ctx.response.set('content-type', mimetype);
      // 响应的是buffer
      ctx.body = fs.createReadStream(filePath);
    }else{
      ctx.body = {code:500,data:{message:'获取用户头像失败'}}
    }
   
  }

  //查看用户背景图片
  async backgroundImage(ctx,next){
    // 获取用户的id 
    const userId = ctx.params.userId;
    // 根据用户id获取背景图片信息
    const result = await userService.getBackgroundImageByUserId(userId);
    if(result) {
      const { filename, mimetype } = result;
      // 获取文件的路径
      const filePath = BACKGROUND_PATH + filename;
      // 设置响应文件类型 没有设置的话就是直接下载
      ctx.response.set('content-type', mimetype);
      // 响应的是buffer
      ctx.body = fs.createReadStream(filePath);
    }else{
      const filePath = BACKGROUND_PATH + 'defaultBanner.jpg';
      ctx.response.set('content-type', 'image/jpeg');
      ctx.body = fs.createReadStream(filePath);
    }
  }

  // 根据角色id获取用户列表
  async getUserByRoleId(ctx, next) {
    const roleId = ctx.params.roleId
    const result = await userService.getUserByRoleId(roleId);
    if (result !== -1) {
      ctx.body = {data:[...result],code:200,message:'操作成功'}
    } else {
      ctx.body = {data:null,code:500,message:'服务器错误'}
    }
  }
}

module.exports = new UserController();
