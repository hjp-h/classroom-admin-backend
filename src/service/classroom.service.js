const connection = require('../app/database');

class classroomService {
  // 获取所有教室列表
  async getClassroomList(classroom) {
    const {name,location,start,end} = classroom;
    const statement = `SELECT * FROM classroom`;
    try {
      const [result] = await connection.execute(statement)
      return result
    } catch (e) {
      console.log("e",e);
      return -1
    }
  }
  // 课室申请创建
  async create(classroom) {
    const { name, location } = classroom;
    const statement = 'INSERT INTO classroom_ (name, location) VALUES (?, ?);';
    try {
      const result = await connection.execute(statement, [name,location]);
      return result; 
    } catch (e) {
      console.log(e);
      return -1
    }
  }

  // 维修审批逻辑（修改）
  async update(id,classroom) {
    const { name,location } = classroom
    let statement = `UPDATE classroom set name = ${name} and location=${location} where id = ${id}`
    try {
      const [result] = await connection.execute(statement)
      return result
    } catch (e) {
      console.log("e", e);
      return -1
    }
  }

  // 删除
  async deleteclassroomById(id) {
    const statement = `DELETE FROM classroom WHERE id = ?`
    try {
      const [result] = await connection.execute(statement, [id])
      return result
    }  
    catch (e) {
      console.log("e", e);
      return -1
    }
  }
}
module.exports = new classroomService()
