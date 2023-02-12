// 查找某一个菜单项的所有子菜单
function findItemChild(item,allMenu) {
  const childList = []
  allMenu.forEach(child => {
    if (child.parent_id === item.id) {
      childList.push(child)
    }
  })
  return childList
}
// 查询菜单列表（递归查询）
function getAllChild(item,allMenu) {
  const childList = findItemChild(item,allMenu)
  if (childList.length === 0) {
    return []
  }
  else {
    childList.forEach(item => {
      // item.children = []
      item.children = getAllChild(item,allMenu)
    })
    item.children = childList
  }
  return childList
}

module.exports = getAllChild

