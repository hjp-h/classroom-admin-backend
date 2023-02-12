const Router = require('koa-router');
const {
  getSuggestionList,
  getSuggestionById,
  withDraw,
  deleteSuggestion,
  create,
  reply
} = require('../controller/suggestion.controller');
const { verifyAuth } = require('../middleware/auth.middleware');

const suggestionRouter = new Router({prefix: '/suggestion'});

// 查看意见列表
suggestionRouter.post('/list',verifyAuth,getSuggestionList)
// 发布意见
suggestionRouter.post("/", verifyAuth, create)
// 意见回复
suggestionRouter.patch("/:id",verifyAuth, reply)
// 删除意见s
suggestionRouter.delete('/:id', verifyAuth, deleteSuggestion)
// 撤回回复
suggestionRouter.post('/:id', verifyAuth, withDraw)
// 获取某个用户发表的意见
suggestionRouter.get('/',verifyAuth,getSuggestionById)
module.exports = suggestionRouter;
