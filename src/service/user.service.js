const connection = require('../app/database');
const { verifyLogin } = require('../middleware/auth.middleware');
// utils
const handlePassword = require('../utils/password-handle')
class UserService {
  // 获取所有的用户
  async getUserList(queryData) {
    const { offset = 0, size = 10, name, realname, cellphone, department, enable,createAt,updateAt }  = queryData
    let statement = `
    SELECT u.password password,u.id id,u.name name,u.realname realname,u.cellphone cellphone,u.enable enable,u.createAt createAt,u.updateAt updateAt,
    d.name department,d.id departmentId,
    r.name roleName,r.id roleId
    FROM user u
    LEFT JOIN department d ON u.department_id = d.id
    LEFT JOIN role r ON u.role_id = r.id
    WHERE 1=1`
    let depIds = `(`
    if (department) {
      const depIdsArr = await this.getDepIdByDepName(department)
      if (depIdsArr.length) {
        depIdsArr.forEach(id => {
          depIds += `'${id}',`
        })
        depIds = depIds.substring(0, depIds.length - 1)
        depIds += `)`
        statement = statement + ` AND department_id in ${depIds}`
      }
    }
    if (name) statement = statement + ` AND name like '%${name}%'`
    if (realname) statement = statement + ` AND realname like '%${realname}%'`
    if (cellphone) statement = statement + ` AND cellphone like '%${cellphone}%'`
    if (createAt) statement = statement + ` AND createAt like '%${createAt}%'`
    if (updateAt) statement = statement + ` AND updateAt like '%${updateAt}%'`
    if (enable) statement = statement + ` AND enable = ${enable}`
    statement = statement + ` LIMIT ${offset},${size};`
    try {
      const [result] = await connection.execute(statement)
      return result
    } catch (e) {
      console.log(e)
      return -1
    }
  }
1
  // 删除用户
  async deleteUserById(id) {
    const statement = `DELETE FROM USER WHERE id = ?`
    try {
      let result = await connection.execute(statement,[id])
      return result 
    } catch (e) {
      console.log(e)
    }
  }

  // 根据部门的名称模糊查询 获取id
  async getDepIdByDepName(name) {
    const statement = `SELECT id FROM department WHERE name LIKE '%${name}%'`
    try {
      let [result] = await connection.execute(statement)
      console.log("result",result)
      result = result.map(item =>  item.id)
      return result 
    } catch (e) {
      console.log(e)
    }
  }

  // 更新用户
  async updateUserById(id, user) {
    const { name, realname, password, cellphone, departmentId, roleId, enable } = user;
    console.log("enable",enable)
    const statment = `UPDATE USER SET name=?,realname=?,password=?,cellphone=?,department_id=?,role_id=?,enable=? where id = ?`
    try {
      const result = await connection.execute(statment, [name, realname, handlePassword(password), cellphone, departmentId, roleId,enable,id])
      return result
    } catch (e) {
      console.log(e)
      return -1
    }
  }

  async create(user) {
    let { name, password,realname,cellphone,departmentId,roleId,enable} = user;
    const statement = `INSERT INTO user (name, password,realname,cellphone,department_id,role_id,enable) VALUES (?, ?,?,?,?,?,?);`;
    if (!realname) {
      realname = ''
    }
    if (!cellphone) {
      cellphone =  ''
    }
    if (!departmentId) {
      departmentId = 5
    }
    if (!roleId) {
      roleId = 2
    }
    try {
      const result = await connection.execute(statement, [name, password,realname,cellphone,departmentId,roleId,enable]);
      return result[0];
    } catch (e) {
      console.log(e)
      return -1
    }
  }

  // 获取所有用户
  async getAllUserList(){
    const statement = `SELECT * FROM USER`
    try {
      let [result] = await connection.execute(statement)
      const res = result.map(item => ({
        value:item.id,
        label:item.name
      }))
      return res
    } catch (e) {
      console.log(e)
    }
  }

  // 根据用户名获取用户
  async getUserByName(name) {
    const statement = `SELECT * FROM USER WHERE name = ?`
    try {
      let result = await connection.execute(statement,[name])
      return result[0]
    } catch (e) {
      console.log(e)
    }
  }

  async getUserById(id) {
    const statement = `
    SELECT u.id id,u.name name,u.realname realname,u.cellphone cellphone,u.enable enable,u.createAt createAt,u.updateAt updateAt,
    u.avatar_url avatar,
    JSON_OBJECT('id',r.id,'name',r.name,'intro',r.intro,'createAt',r.createAt,'updateAt', r.updateAt) role,
    JSON_OBJECT('id',d.id,'name',d.name,'parentId',d.parent_id,'createAt',d.createAt,'updateAt', d.updateAt) department
    FROM user u
    LEFT JOIN role r ON u.role_id = r.id
    LEFT JOIN department d on u.department_id = d.id
    WHERE u.id = ?;
    `;
    try {
      const [result] = await connection.execute(statement, [id]);
      return result;

    } catch (e) {
      console.log(e);
      return -1
    }
  }

  async getAvatarByUserId(userId) {
    const statement = `SELECT * FROM avatar WHERE user_id = ?;`;
    const [result] = await connection.execute(statement, [userId])
    return result.pop();
  }

  async getBackgroundImageByUserId(userId) {
    const statement = `SELECT * FROM bg_photo WHERE user_id = ?;`;
    const [result] = await connection.execute(statement, [userId])
    return result[0];
  }

  async getUserByRoleId(roleId) {
    const statement = `SELECT * FROM USER WHERE role_id = ?`
    try {
      let [result] = await connection.execute(statement,[roleId])
      return result
    } catch (e) {
      console.log(e)
      return -1
    }
  }
}

module.exports = new UserService();
