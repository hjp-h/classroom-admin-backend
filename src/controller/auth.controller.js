const jwt = require('jsonwebtoken');
const { PRIVATE_KEY } = require('../app/config');

class AuthController {
  async login(ctx, next) {
    const { id, name } = ctx.user;
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: 'RS256'
    });
    ctx.body = { data: { id, name,token },code:200}
  }

  async success(ctx, next) {
    ctx.body = { data: { message:"授权成功~"},code:200};
  }
}

module.exports = new AuthController();
