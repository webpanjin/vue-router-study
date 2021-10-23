export default function createRoute(record,path){
  //根据path匹配到的所有record放到matched数组中
  //如果path是子路由的话，record会有parent属性
  //此时应该把parent -> record
  //matched --> [parentRecord,childRecord]
  const matched = []
  while(record){
    matched.unshift(record)
    record = record.parent
  }
  return {
    path,
    matched
  }
}