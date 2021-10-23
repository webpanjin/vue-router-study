import History from "./base";
export default class HashHistory extends History{
  constructor(router){
    super(router)
    //确保首次访问地址为#/
    ensureSlash()
  }
  //获取当前路由地址
  getCurrentLocation(){
    return window.location.hash.slice(1)
  }
  //监听hashchange 监听路由地址的变化
  setUpListener(){
    window.addEventListener('hashchange',()=>{
      this.transitionTo(this.getCurrentLocation())
    })
  }
}
function ensureSlash(){
  //判断当前是否有hash
  if(window.location.hash){
    return 
  }
  //www.baidu.com/
  window.location.hash = '/' //初始值会设置为 localhost:port/#/
}