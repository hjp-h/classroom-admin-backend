const Router = require('koa-router');
const {
  create,
  avatarInfo,
  backgroundImage,
  findUserById,
  getUserList,
  geAllUserList,
  deleteUser,
  updateUser,
  getUserByRoleId
} = require('../controller/user.controller');
const {
  verifyUser,
  handlePassword
} = require('../middleware/user.middleware');
const { verifyAuth } = require('../middleware/auth.middleware');

const userRouter = new Router({prefix: '/users'});


// 获取所有用户的列表
userRouter.post('/list',verifyAuth,getUserList)

userRouter.get("/list",verifyAuth,geAllUserList)

// 删除某个用户
userRouter.delete('/:id',verifyAuth,deleteUser)

// 用户注册
userRouter.post('/', verifyUser, handlePassword, create);

// 更新用户
userRouter.patch('/:id',verifyAuth,updateUser)

// 查看用户头像
userRouter.get('/avatar/:userId',avatarInfo)

// 通过id获取某个用户
userRouter.get('/:id',verifyAuth,findUserById)
// 查看用户背景图片
userRouter.get('/:userId/backgroundImage', backgroundImage)
// 根据角色id获取用户
userRouter.post('/role/:roleId',verifyAuth,getUserByRoleId)
module.exports = userRouter;
