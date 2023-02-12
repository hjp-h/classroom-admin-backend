const connection = require('../app/database');

class CommentMService {
  // 创建
  async create(userId, comment) {
    const {content,applyId,star} = comment 
    const statement = `INSERT INTO comment_maintenance (content,apply_id, user_id,star) VALUES (?, ?, ?,?);`;
    try {
      const [result] = await connection.execute(statement, [content, applyId, userId,star]);
      return result;
    } catch (e) {
      console.log(e);
      return -1
    }
    
  }

  // 回复
  async reply(userId,commentId, comment) {
    const {applyId,star,reply} = comment 
    const statement = `INSERT INTO comment_maintenance (content, apply_id, user_id,comment_id,star) VALUES (?, ?, ?, ?,?);`;
    try {
      const [result] = await connection.execute(statement, [reply, applyId, userId, commentId, star]);
    return result;
    } catch (e) {
      console.log(e)
      return -1
    }
    
  }

  // 删除
  async remove(id) {
    const statement = `DELETE FROM comment_maintenance WHERE id = ?`;
    try {
      const [result] = await connection.execute(statement, [id]);
      return result;
    } catch (e) {
      console.log(e);
      return -1
    }
    
  }

  // 根据申请单id获取评论
  async getCommentsByAppyId(applyId) {
    const statement = `
      SELECT 
        cm.id, cm.content,cm.apply_id applyId,cm.comment_id commentId,cm.star,cm.createAt,cm.updateAt,
        u.name user,
        (SELECT IF(COUNT(cm1.id),JSON_ARRAYAGG(
          JSON_OBJECT('id', cm1.id, 'content', cm1.content, 'applyId', cm1.apply_id,'commentId',cm1.comment_id,'star',cm1.star,
                      'createAt', cm1.createAt,'updateAt',cm1.updateAt,
                      'user', cu.name)
        ),NULL) FROM comment_maintenance cm1 LEFT JOIN user cu ON cm1.user_id = cu.id WHERE cm1.comment_id = cm.id) replyList,
        (SELECT  CONCAT("${APP_HOST}/moment/images",avatar.filename) FROM avatar WHERE avatar.user_id = u.id) images
      FROM comment_maintenance cm
      LEFT JOIN user u ON u.id = cm.user_id
      WHERE apply_id = ?
    `;
    try {
      const [result] = await connection.execute(statement, [applyId]);
      return result;
    } catch (e) {
      console.log(e);
      return -1
    }  
  }

  // 获取所有的评论信息
  async getComments(comment) {
    console.log('comment',comment)
    const {offset=0,size=10,content,applyId,star,createAt} = comment
    let statement = `
      SELECT 
        cm.id, cm.content,cm.apply_id applyId,cm.comment_id commentId,cm.star,cm.createAt,cm.updateAt,
        u.name user
      FROM comment_maintenance cm
      LEFT JOIN user u ON u.id = cm.user_id
      WHERE 1=1
    `;
    if (content) {
      statement = statement + `AND content = '${content}'`
    }
    if (applyId) {
      statement = statement + `AND apply_id = '${applyId}'`
    }
    if (star) {
      statement = statement + `AND star = '${star}'`
    }
    if (createAt) {
      statement = statement + `AND createAt like '%${createAt}%'`
    }
    statement = statement + ` LIMIT ${offset},${size};`
    try {
      const [result] = await connection.execute(statement);
      return result;
    } catch (e) {
      console.log(e);
      return -1
    }  
  }
}

module.exports = new CommentMService();
