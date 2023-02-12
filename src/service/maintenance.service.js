const connection = require('../app/database');
const { APP_HOST, APP_PORT } = require('../app/config');
class MaintenanceService {
  // 维修创建申请
  async create(maintenanceData,userId) {
    const { desc, expectedTime, location, phone, type, degree } = maintenanceData;
    const statement = 'INSERT INTO maintenance_apply (`desc`, expect_time, location, phone, type, degree,applicant_id) VALUES (?, ?, ?, ?, ?, ?, ?);';
    try {
      const [result] = await connection.execute(statement, [desc, expectedTime, location, phone, type, degree, userId]);
      return result; 
    } catch (e) {
      console.log(e);
      return -1;
    }
  }

  // 维修列表查询（根据申请人查询）
  async getMaintenanceList(userId) {
    const statement = `SELECT ma.id orderId,ma.status,ma.degree,ma.location,ma.type,ma.desc,approve,
          ma.expect_time expectedTime,ma.createAt createTime,au.name reporter,au.cellphone phoneRep,u.name processor,u.cellphone phonePro,
          (SELECT CONCAT("${APP_HOST}:${APP_PORT}/maintenance/img/",ma.id)) img
          FROM maintenance_apply ma
          LEFT JOIN user u ON ma.processor_id = u.id
          LEFT JOIN user au on ma.applicant_id = au.id
          where ma.applicant_id = ?`
    try {
      const [result] = await connection.execute(statement, [userId])
      return result
    } catch (e) {
      console.log("e",e);
    }
  }

  async getMaintenanceList1(userId) {
    const statement = `SELECT ma.id orderId,ma.status,ma.degree,ma.location,ma.type,ma.desc,approve,
          ma.expect_time expectedTime,ma.createAt createTime,au.name reporter,au.cellphone phoneRep,u.cellphone phonePro,
          IF(COUNT(u.id),JSON_ARRAYAGG(u.realname)),null) processor,
          (SELECT CONCAT("${APP_HOST}:${APP_PORT}/maintenance/img/",ma.id)) img
          FROM maintenance_apply ma
          LEFT JOIN user u ON ma.processor_id = u.id
          LEFT JOIN user au on ma.applicant_id = au.id
          LEFT JOIN maintenance_processor mp ON mp.apply_id = ma.id
          where ma.applicant_id = ?
          GROUP BY ma.id`
          
    try {
      const [result] = await connection.execute(statement, [userId])
      return result
    } catch (e) {
      console.log("e",e);
    }
  }

  // 获取所有的维修单列表
  async getAllMaintenanceList(maintenance,processorId) {
    const {id,type,phone,status,degree,location,expect_time,applicant,processor,isUrgent,offset=0,size=10} = maintenance
    let statement = `SELECT ma.id id,ma.status,ma.degree,ma.location,ma.type,ma.desc,approve,isUrgent,ma.phone,
          ma.expect_time expectedTime,ma.createAt createTime,au.name applicant,au.cellphone appPhone,u.name processor,
          (SELECT CONCAT("${APP_HOST}:${APP_PORT}/maintenance/img/",ma.id)) img
          FROM maintenance_apply ma
          LEFT JOIN user u ON ma.processor_id = u.id
          LEFT JOIN user au on ma.applicant_id = au.id
          where 1=1
          `
    if (id) {
      statement = statement + `AND ma.id = '${id}'`
    }
    if (type) {
      statement = statement + `AND type like '%${type}%'`
    }
    if (phone) {
      statement = statement + `AND phone like '%${phone}%'`
    }
    if (status) {
      statement = statement + `AND status = '${status}'`
    }
    if (degree) {
      statement = statement + `AND degree = '${degree}'`
    }
    if (location) {
      statement = statement + `AND location like '%${location}%'`
    }
    if (expect_time) {
      statement = statement + `AND expect_time like '%${expect_time}%'`
    }
    if (applicant) {
      statement = statement + `AND au.name = '${applicant}'`
    }
    if (processor) {
      statement = statement + `AND u.name = '${processor}'`
    }
    if (isUrgent) {
      statement = statement + `AND isUrgent = '${isUrgent}'`
    }
    if (processorId) {
      statement = statement + `AND processor_id = '${processorId}'`
    }
    statement = statement + ` LIMIT ${offset},${size};`
    try {
      console.log("statement",statement)
      const [result] = await connection.execute(statement)
      return result
    } catch (e) {
      console.log("e", e);
      return -1
    }
  }

  async getAllMaintenanceList1(maintenance,processorId) {
    const {id,type,phone,status,degree,location,expect_time,applicant,processor,isUrgent,offset=0,size=10} = maintenance
    let statement = `SELECT ma.id id,ma.status,ma.degree,ma.location,ma.type,ma.desc,approve,isUrgent,ma.phone,
          ma.expect_time expectedTime,ma.createAt createTime,au.name applicant,au.cellphone appPhone,
          IF(COUNT(u.id),JSON_ARRAYAGG(u.realname)),null) processor
          (SELECT CONCAT("${APP_HOST}:${APP_PORT}/maintenance/img/",ma.id)) img
          FROM maintenance_apply ma
          LEFT JOIN maintenance_processor mp ON mp.apply_id = ma.id
          LEFT JOIN user u ON mp.processor_id = u.id
          LEFT JOIN user au on ma.applicant_id = au.id
          where 1=1
          `
    if (id) {
      statement = statement + `AND ma.id = '${id}'`
    }
    if (type) {
      statement = statement + `AND type like '%${type}%'`
    }
    if (phone) {
      statement = statement + `AND phone like '%${phone}%'`
    }
    if (status) {
      statement = statement + `AND status = '${status}'`
    }
    if (degree) {
      statement = statement + `AND degree = '${degree}'`
    }
    if (location) {
      statement = statement + `AND location like '%${location}%'`
    }
    if (expect_time) {
      statement = statement + `AND expect_time like '%${expect_time}%'`
    }
    if (applicant) {
      statement = statement + `AND au.name = '${applicant}'`
    }
    if (processor) {
      statement = statement + `AND u.name = '${processor}'`
    }
    if (isUrgent) {
      statement = statement + `AND isUrgent = '${isUrgent}'`
    }
    if (processorId) {
      statement = statement + `AND processor_id = '${processorId}'`
    }
    statement = statement + ` GROUP BY ma.id`
    statement = statement + ` LIMIT ${offset},${size};`
    try {
      console.log("statement",statement)
      const [result] = await connection.execute(statement)
      return result
    } catch (e) {
      console.log("e", e);
      return -1
    }
  }

  // 维修审批逻辑（修改）
  async update(id,maintenance) {
    const { processor, status, approve } = maintenance
    let statement = `UPDATE maintenance_apply set status = ${status}`
    if (processor) {
      statement += `,processor_id = ${processor}`
    }
    if (approve) {
      statement +=  `,approve = ${approve}`
    }
    statement += ` where id = ${id}`
    try {
      console.log("statement",statement)
      const [result] = await connection.execute(statement)
      return result
    } catch (e) {
      console.log("e", e);
      return -1
    }
  }

  async update1(id,maintenance) {
    const { processor, status, approve } = maintenance
    let statement = `UPDATE maintenance_apply set status = ${status}`
    if (Array.isArray(processor)) {
      await this.createMP(id,processor)
    }
    if (approve) {
      statement +=  `,approve = ${approve}`
    }
    statement += ` where id = ${id}`
    try {
      console.log("statement",statement)
      const [result] = await connection.execute(statement)
      return result
    } catch (e) {
      console.log("e", e);
      return -1
    }
  }

  async createMP(apply_id,processor) {
    const statement = `INSERT INTO maintenance_processor(apply_id,processor_id) values (?,?)`
    try {
      processor.forEach(async(processor_id) => {
        await connection.execute(statement,apply_id,processor_id)
      });
    } catch (e) {
      console.log(e)
    }
  }

  // 将申请单改为催促状态
  async updateUrgentById(orderId) {
    const statement = `UPDATE maintenance_apply SET isUrgent = 1 WHERE id = ?`
    try {
      const [result] = await connection.execute(statement, [orderId])
      return result
    } catch (e) {
      console.log("e", e);
    }
  }

  // 查询订单状态
  async getMaintenanceStatus(id) {
    const statement = `SELECT status FROM maintenance_apply WHERE id = ?`
    try {
      const [result] = await connection.execute(statement, [id])
      console.log("status",result[0].status);
      if (result.length && result[0].status !== 1) {
        return true
      }
      return false
    } catch (e) {
      console.log("e", e);
    }
  }
  // 删除未处理的申请
  async deleteMaintenanceById(id) {
    const statement = `DELETE FROM maintenance_apply WHERE id = ?`
    try {
      const isDeleted = await this.getMaintenanceStatus(id)
      if (isDeleted) {
        const [result] = await connection.execute(statement, [id])
        return result
      }
      return false
    } catch (e) {
      console.log("e", e);
    }
  }

  // 获取图片信息
  async getImageInfo(id) {
    const statment = `SELECT * from maintenance_file WHERE apply_id = ?`
    try {
      const [result] = await connection.execute(statment, [id])
      return result
    } catch (e) {
      console.log(e)
      return -1
    }
  }
}
module.exports = new MaintenanceService()
