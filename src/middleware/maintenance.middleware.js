const path = require('path')
const nanoid = require('nanoid')
const Multer = require('koa-multer')
const { MAINTENANCE_PATH } = require('../constants/file-path')
// 文件上传配置
const storage = Multer.diskStorage({
  // 文件上传的存放地址
  destination: (req,file,cb) => {
    cb(null,MAINTENANCE_PATH)
  },
  // 文件名
  filename: (req, file, cb) => {
    cb(null,nanoid.nanoid() + "_" + (file.originalname.split('.')[0]) + path.extname(file.originalname))
  }
})
const pictureUpload = Multer({
  storage
})
// 目前只允许上传单张照片 字段名为file
const pictureHandler = pictureUpload.single('file');
module.exports = {
  pictureHandler
}
