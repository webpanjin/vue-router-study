import createRoute from '../util/route'
export default class History{
  constructor(router){
    this.router = router
    // {path:'/',matched:[]}
    this.current = createRoute(null,'/')
    //这个回调函数在hashhistory中赋值，作用是更改vue实例上的_route
    this.cb = null 
  }
  listen(cb){
    this.cb = cb
  }
  //跳转到其他位置,最终会渲染路由对应组件
  transitionTo(path,onComplete){
    //重新改变current
    this.current = this.router.matcher.match(path)
    //调用cb
    this.cb&&this.cb(this.current)
    // console.log(this.current)
    onComplete&&onComplete()
  }
}