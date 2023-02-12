const connection = require('../app/database');

class classroomApplyService {
  // 课室申请创建
  async create(classroomApply,userId) {
    const { name, applyReason,phone,degree,start,end,classroomId,isUrgent } = classroomApply;
    const statement = 'INSERT INTO classroom_apply (name, apply_reason, phone,degree,start,end,classroom_id,applicant_id,isUrgent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);';
    try {
      const result = await connection.execute(statement, [name, applyReason,phone,degree,start,end,classroomId,userId,isUrgent]);
      return result; 
    } catch (e) {
      console.log(e);
      return -1
    }
  }
  // 课室申请列表查询（根据申请人查询）
  async getClassroomApplyList(userId,classroomApply) {
    const {name, approve,offset=0,size=10} = classroomApply
    let statement = `SELECT ca.id id,ca.name,ca.approve,u.name applicant,ca.apply_reason applyReason,ca.createAt,ca.updateAt
          FROM classroom_apply ca
          LEFT JOIN user u ON ca.applicant_id = u.id
          where ca.applicant_id = ?
          `
    if (name) {
      statement = statement + `AND ca.name like '%${name}%'`
    }
    if (approve) {
      statement = statement + `AND approve = '${approve}'`
    }
    statement = statement + ` LIMIT ${offset},${size};`
    try {
      const [result] = await connection.execute(statement, [userId])
      return result
    } catch (e) {
      console.log("e",e);
    }
  }

  // 获取所有的申请单列表
  async getAllClassroomApplyList(classroomApply) {
    const {name, approve,degree,start,end,applicantId,classroomId,offset=0,size=10} = classroomApply
    let statement = `SELECT ca.id id,c.name,ca.phone,ca.approve,u.name applicant,ca.start,ca.end,ca.apply_reason applyReason,ca.degree,ca.isUrgent,ca.createAt,ca.updateAt
                     FROM classroom_apply ca
                     LEFT JOIN user u ON ca.applicant_id = u.id
                     LEFT JOIN classroom c on ca.classroom_id = c.id
                     where 1=1
          `
    if (name) {
      statement = statement + ` AND c.name like '%${name}%'`
    }
    if (applicantId) {
      statement = statement + ` AND applicant_id = '${applicantId}'`
    }
    if (approve) {
      statement = statement + ` AND approve = '${approve}'`
    }
    if (degree) {
      statement = statement + ` AND degree = '${degree}'`
    }
    if(start){
      statement = statement + ` AND start = '${start}'`
    }
    if(end){
      statement = statement + ` AND end = '${end}'`
    }
    if(classroomId){
      statement = statement + ` AND classroom_id = '${classroomId}'`
    }
    statement = statement + ` LIMIT ${offset},${size};`
    try {
      const [result] = await connection.execute(statement)
      return result
    } catch (e) {
      console.log("e", e);
      return -1
    }
  }

  // 维修审批逻辑（修改）
  async update(id,classroomApply) {
    const { approve } = classroomApply
    let statement = `UPDATE classroom_apply set approve = ${approve} where id = ${id}`
    try {
      const [result] = await connection.execute(statement)
      return result
    } catch (e) {
      console.log("e", e);
      return -1
    }
  }

  // 删除
  async deleteclassroomApplyById(id) {
    const statement = `DELETE FROM classroom_apply WHERE id = ?`
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
module.exports = new classroomApplyService()
