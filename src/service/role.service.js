const connection = require('../app/database');
// utils
const getAllChild = require('../utils/menu-handle')
class RoleService {
  // 获取所有的用户
  async getRoleList(queryData) {
    const {offset = 0, size = 10, name, intro,createAt,updateAt } = queryData
    let statement = `SELECT * FROM ROLE WHERE 1=1`
    if (name) statement = statement + ` AND name like '%${name}%'`
    if (intro) statement = statement + ` AND intro like '%${intro}%'`
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

  // 创建角色
  async create(role) {
    const { name, intro, menuList } = role;
    const statement = `INSERT INTO ROLE(name,intro,menuList) values(?,?,?)`
    try {
      const result = await connection.execute(statement,[ name, intro, menuList ])
      return result
    } catch (e) {
      console.log(e)
      return -1
    }
  }

  // 修改角色
  async update(id,role) {
    const { name, intro, menuList } = role;
    const statement = `UPDATE ROLE SET name=?,intro=?,menuList=? where id = ?`
    try {
      const result = await connection.execute(statement,[ name, intro, menuList,id ])
      return result
    } catch (e) {
      console.log(e)
      return -1
    }
  }

  // 删除角色
  async deleteRoleById(id) {
    const statement = `DELETE FROM ROLE WHERE id = ?`
    try {
      const result = await connection.execute(statement,[ id ])
      return result
    } catch (e) {
      console.log(e)
      return -1
    }
  }

  // 获取某个角色
  async getRoleById(id) {
    const statement = `SELECT * FROM ROLE WHERE id = ?`
    try {
      const [result] = await connection.execute(statement,[ id ])
      return result
    } catch (e) {
      console.log(e)
      return -1
    }
  }

  // 根据角色获取对应的菜单
  async getMenuByRoleId(id) {
    const statement = `SELECT menuList FROM ROLE WHERE id = ?`
    try {
      const [result] = await connection.execute(statement, [id])
      console.log("menuList", result[0].menuList)
      const menuList = result[0].menuList
      if (menuList) {
        const allMenu = await this.getMenuByMenuList(menuList)
        const temp_parent = { id: null, children: [] };//新建id为null的对象做为森林的根
        const result = getAllChild(temp_parent, allMenu)
        return result
      } else {
        return []
      }
    } catch (e) {
      console.log(e)
      return -1
    }
    
  }

  // 根据menuList查询出所有的菜单
  async getMenuByMenuList(menuList) {
    console.log("11122",menuList)
    const list = JSON.parse(menuList)
    let statement = `SELECT * FROM MENU WHERE id in `
    try {
      if (list.length) {
        let queryString = `(`
        list.forEach(id => queryString += `${id},`)
        queryString = queryString.slice(0, queryString.length - 1)
        queryString += ')'
        statement += queryString
        const [result] = await connection.execute(statement)
        console.log("result",result)
        return result
      } else {
        return []
      }
    } catch (e) {
      console.log(e)
      return -1
    }
    
  }
}

module.exports = new RoleService();
