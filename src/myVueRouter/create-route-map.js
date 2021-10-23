export default function createRouteMap(routes,oldPathList,oldPathMap){
  const pathList = oldPathList || [] 
  const pathMap = oldPathMap || {}

  //[{path: component: children:{path:component...}}]
  //遍历所有路由规则，解析到路由表中
  routes.forEach(route=>{
    addRouteRecord(route,pathList,pathMap)
  })
  return {
    pathList,
    pathMap
  }
}
//解析route,把解析好的规则放入pathList pathMap中
function addRouteRecord(route,pathList,pathMap,parentRecord){
  const path =parentRecord?`${parentRecord.path}/${route.path}`:route.path
  const record = {
    path,
    component:route.component,
    parent:parentRecord//如果是子路由的话，记录子路由对应的父record
  }
  //如果已经有了path,相同的path直接跳过
  if(!pathMap[path]){
    pathList.push(path)
    pathMap[path] = record
  }
  //判断route中是否有子路由
  if(route.children){
    route.children.forEach(childroute=>{
      addRouteRecord(childroute,pathList,pathMap,record)
    })
  }
}