const connection = require('../app/database');

class goodsApplyService {
  // 物资申请创建
  async create(goodsApply,userId) {
    const { name, applyReason, maintenanceId } = goodsApply;
    const statement = 'INSERT INTO goods_apply (name, user_id, maintenance_id,apply_reason) VALUES (?, ?, ?, ?);';
    try {
      const result = await connection.execute(statement, [name, userId, maintenanceId, applyReason]);
      console.log(111)
      return result; 
    } catch (e) {
      console.log(e);
      return -1
    }
  }
  // 物资申请列表查询（根据申请人查询）
  async getGoodsApplyList(userId,goodsApply) {
    const {name, approve,applyReason, mainteanceId,offset=0,size=10} = goodsApply
    let statement = `SELECT ga.id id,ga.name,ga.maintenance_id maintenanceId,ga.approve,u.name applicant,ga.apply_reason applyReason,ga.createAt,ga.updateAt
          FROM goods_apply ga
          LEFT JOIN user u ON ga.user_id = u.id
          where ga.user_id = ?
          `
    if (name) {
      statement = statement + `AND ga.name like '%${name}%'`
    }
    if (applyReason) {
      statement = statement + `AND apply_reason like '%${applyReason}%'`
    }
    if (mainteanceId) {
      statement = statement + `AND mainteance_id = '${mainteanceId}'`
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

  // 获取所有的维修单列表
  async getAllGoodsApplyList(goodsApply) {
    const {name, approve,applyReason, mainteanceId,offset=0,size=10} = goodsApply
    let statement = `SELECT ga.id id,ga.name,ga.maintenance_id maintenanceId,ga.approve,u.name applicant,ga.apply_reason applyReason,ga.createAt,ga.updateAt
                     FROM goods_apply ga
                     LEFT JOIN user u ON ga.user_id = u.id
                     where 1=1
          `
    if (name) {
      statement = statement + ` AND ga.name like '%${name}%'`
    }
    if (applyReason) {
      statement = statement + ` AND apply_reason like '%${applyReason}%'`
    }
    if (mainteanceId) {
      statement = statement + ` AND mainteance_id = '${mainteanceId}'`
    }
    if (approve) {
      statement = statement + ` AND approve = '${approve}'`
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
  async update(id,goodsApply) {
    const { approve } = goodsApply
    let statement = `UPDATE goods_apply set approve = ${approve} where id = ${id}`
    try {
      const [result] = await connection.execute(statement)
      return result
    } catch (e) {
      console.log("e", e);
      return -1
    }
  }

  // 删除
  async deleteGoodsApplyById(id) {
    const statement = `DELETE FROM goods_apply WHERE id = ?`
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
module.exports = new goodsApplyService()
