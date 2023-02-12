const connection = require('../app/database');

class DepartmentService {
  // 获取所有的用户
  async getDepartmentList(queryData) {
    const {offset = 0, size = 10, name, leader,createAt,updateAt} = queryData
    let statement = `SELECT d.id id,d.name name,d.leader leader,d.parent_id parentId,d.createAt createAt,d.updateAt updateAt,
    (SELECT d1.name FROM DEPARTMENT d1 WHERE d1.id = d.id) parentName
    FROM DEPARTMENT d
    WHERE 1=1`
    if (name) statement = statement + ` AND name like '%${name}%'`
    if (leader) statement = statement + ` AND leader like '%${leader}%'`
    if (createAt) statement = statement + ` AND createAt like '%${createAt}%'`
    if (updateAt) statement = statement + ` AND updateAt like '%${updateAt}%'`
    statement = statement + ` LIMIT ${offset},${size};`
    try {
      const [result] = await connection.execute(statement)
      return result
    } catch (e) {
      console.log(e)
    }
  }
  // 添加部门
  async create(department) {
    const { name, parentId, leader } = department
    const statement = `INSERT INTO DEPARTMENT(name,parent_id,leader) VALUES(?,?,?)`
    try {
      const result = await connection.execute(statement,[name, parentId, leader])
      return result
    } catch (e) {
      console.log(e)
      return -1
    }
  }

  // 修改部门
  async update(id, department) {
    let { name,leader,parentId } = department
    const statement = `UPDATE DEPARTMENT SET name=?,leader=?,parent_id=? WHERE id = ?`
    try {
      const result = await connection.execute(statement,[name,leader,parentId,id])
      return result
    } catch (e) {
      console.log(e)
      return -1
    }
  }

  // 删除部门
  async deleteDepartmentById(id) {
    const statement = `DELETE FROM DEPARTMENT WHERE id = ?`
    try {
      const result = await connection.execute(statement,[id])
      return result
    } catch (e) {
      console.log(e)
      return -1
    }
  }
}

module.exports = new DepartmentService();
