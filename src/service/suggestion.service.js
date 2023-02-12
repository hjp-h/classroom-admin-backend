const connection = require('../app/database');

class SuggestionService {
  // 发表建议
  async create(userId,{content}) {
    const statement = `INSERT INTO suggestion_feedback (content,user_id) VALUES (?, ?);`;
    try {
      const [result] = await connection.execute(statement, [content, userId]);
      return result;
    } catch (e) {
      console.log(e);
      return -1;
    }
  }

  // 回复建议
  async reply(id,{reply}) {
    const statement = `UPDATE suggestion_feedback SET reply = ? where id = ?;`;
    try {
      const [result] = await connection.execute(statement, [reply,id]);
      return result;
    } catch (e) {
      console.log(e);
      return -1;
    }
  }

  // 删除意见
  async deleteSuggestion(id) {
    const statement = `DELETE FROM suggestion_feedback WHERE id = ?`;
    try {
      const [result] = await connection.execute(statement, [id]);
      return result;
    } catch (e) {
      console.log(e)
      return -1
    }
  }

  // 撤回回复
  async withDraw(id) {
    const statement = `UPDATE suggestion_feedback SET reply = '' WHERE id = ?`;
    try {
      const [result] = await connection.execute(statement, [id]);
      return result;
    } catch (e) {
      console.log(e)
      return -1
    }
  }

  // 获取意见反馈列表
  async getSuggestionList(queryData) {
    const {offset = 0, size = 10, content,reply,createAt,updateAt,user } = queryData
    let statement = `SELECT sf.id id,content,reply,sf.createAt createAt,sf.updateAt updateAt,u.name user FROM suggestion_feedback sf 
                    LEFT JOIN user u ON sf.user_id = u.id WHERE 1=1`;
    if(user) statement = statement + ` AND u.name = '${user}'`
    if (content) statement = statement + ` AND content like '%${content}%'`
    if (reply) statement = statement + ` AND reply like '%${reply}%'`
    if (createAt) statement = statement + ` AND createAt like '%${createAt}%'`
    if (updateAt) statement = statement + ` AND updateAt like '%${updateAt}%'`
    statement = statement + ` LIMIT ${offset},${size};`
    try {
      const [result] = await connection.execute(statement);
      return result;
    } catch (e) {
      console.log(e);
      return -1
    }
  }

  // 根据userName获取

  // 根据userId获取反馈信息
  async getSuggestionById(userId) {
    const statement = `SELECT * FROM suggestion_feedback where user_id = ?`;
    try {
      const [result] = await connection.execute(statement, [userId]);
      return result;
    } catch (e) {
      console.log(e)
      return -1
    }
  }
}

module.exports = new SuggestionService();
