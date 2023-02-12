const connection = require('../app/database');
// utils
const getAllChild = require('../utils/menu-handle')
class MaintenanceService {
  // 菜单列表查询
  async getUserMenu(offset=0,size=10) {
    const statement = `SELECT * from menu`
    try {
      const [result] = await connection.execute(statement)
      const temp_parent = { id: null, children: [] };//新建id为null的对象做为森林的根
      const menuResult = getAllChild(temp_parent, result)
      return menuResult
    } catch (e) {
      console.log("e", e);
      return -1
    }
  }
  // 查询某一个菜单
  async getMenuById(id) {
    const statement = `SELECT * FROM MENU WHERE id = ?`
    try {
      const [result] = await connection.execute(statement, [id])
      return result;
    } catch (e) {
      console.log(e)
      return -1
    }
  }

  // 处理相同的逻辑代码
  async hanldeCommon(menu,statement,id) {
    let { name, parentId, icon, type, url, permission } = menu
    if (!parentId) {
      parentId = null
    }
    if (!icon) {
      icon = ''
    }
    if (!type) {
      type = 1
    }
    if (!url) {
      url = ''
    }
    if (!permission) {
      permission = ''
    }
    try {
      const params = [name, parentId, icon, type, url, permission]
      id && params.push(id);
      const result = connection.execute(statement, params)
      return result
    } catch (e) {
      console.log(e)
      return -1
    }
  }

  // 创建菜单
  async create(menu) {
    const statement = `INSERT INTO MENU(name,parent_id,icon,type,url,permission) values(?,?,?,?,?,?)`
    return this.hanldeCommon(menu,statement)
  }

  // 修改菜单
  async update(id, menu) {
    const statement = `UPDATE MENU SET name=?,parent_id=?,icon=?,type=?,url=?,permission=? where id = ?`
    return this.hanldeCommon(menu,statement,id)
  }

  // 修改菜单
  async deleteMenuById(id) {
    const statement = `DELETE FROM MENU WHERE id  = ?`
    try {
      const result = connection.execute(statement, [id])
      return result
    } catch (e) {
      console.log(e)
      return -1
    }
  }
}
module.exports = new MaintenanceService()
