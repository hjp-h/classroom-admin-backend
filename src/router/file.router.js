const Router = require('koa-router');

const {
  verifyAuth,
  verifyPermission
} = require('../middleware/auth.middleware');
const {
  pictureHandler,
  pictureResize,
  delPreBackground
} = require('../middleware/file.middleware');
const { avatarHandler, delPreAvatar } = require('../middleware/user.middleware')
const { backgroundImgHandler } = require('../middleware/individual.middleware')
const {pictureHandler:mPicHandler} = require("../middleware/maintenance.middleware")

const {
  saveAvatarInfo,
  savePictureInfo,
  saveBackgroundImgInfo,
  saveMaintenanceImg
} = require('../controller/file.controller');


const fileRouter = new Router({ prefix: '/upload' });
// 用户头像上传
fileRouter.post('/avatar', verifyAuth, avatarHandler, delPreAvatar, saveAvatarInfo);
// 上传动态图片
fileRouter.post('/pictures/:momentId', verifyAuth, verifyPermission, pictureHandler, pictureResize, savePictureInfo)
// 用户背景图片上传
fileRouter.post('/individual/background', verifyAuth, backgroundImgHandler, delPreBackground, saveBackgroundImgInfo)
// 申请单描述图片上传
fileRouter.post('/maintenance/:id',verifyAuth,mPicHandler,saveMaintenanceImg)
module.exports = fileRouter;
