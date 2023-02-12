const connection = require('../app/database');
class NoticeService {
  // 获取所有的公告
  async getNoticeList(queryData) {
    const {offset = 0, size = 10, title,createAt,updateAt } = queryData
    let statement = `SELECT * FROM NOTICE WHERE 1=1`
    if (title) statement = statement + ` AND title like '%${title}%'`
    if (createAt) statement = statement + ` AND createAt like '%${createAt}%'`
    if (updateAt) statement = statement + ` AND updateAt like '%${updateAt}%'`
    statement = statement + ` LIMIT ${offset},${size};`
    try {
      const [result] = await connection.execute(statement)
      return result
    } catch (e) {
      console.log(e)
      return -1
    }
  }

  // 创建公告
  async create(notice) {
    const { title,content } = notice;
    const statement = `INSERT INTO NOTICE(title,content) values(?,?)`
    try {
      const result = await connection.execute(statement,[title,content])
      return result
    } catch (e) {
      console.log(e)
      return -1
    }
  }

  // 修改公告
  async update(id,notice) {
    const { title,content } = notice;
    const statement = `UPDATE NOTICE SET title=?,content=? where id = ?`
    try {
      const result = await connection.execute(statement,[ title,content,id ])
      return result
    } catch (e) {
      console.log(e)
      return -1
    }
  }

  // 删除公告
  async deleteNoticeById(id) {
    const statement = `DELETE FROM NOTICE WHERE id = ?`
    try {
      const result = await connection.execute(statement,[ id ])
      return result
    } catch (e) {
      console.log(e)
      return -1
    }
  }

  // 获取某个公告
  async getNoticeById(id) {
    const statement = `SELECT * FROM NOTICE WHERE id = ?`
    try {
      const [result] = await connection.execute(statement,[ id ])
      return result
    } catch (e) {
      console.log(e)
      return -1
    }
  }
}

module.exports = new NoticeService();
