import Link from './components/link'
import View from './components/view'
export let _Vue = null
export default function install(Vue){
  _Vue = Vue 
  _Vue.mixin({
    beforeCreate(){
      //规定_开头的属性为私有属性
      if(this.$options.router){//vue实例
        this._routerRoot = this //将vue实例挂载到_routerRoot上
        this._router = this.$options.router
        this._router.init(this)
        //定义响应式数据
          //1.Vue.observable
            //但此处我们要在vue根实例上挂载_route属性，Vue.observable做不到
            //Vue.util文档中查不到，源码中有提示：确保不会发生问题才使用
            //将this._router.history.current挂载到_route属性上
        Vue.util.defineReactive(this,'_route',this._router.history.current)
      }else{//vue组件进这里
        //组件的this.$parent即为app.vue根组件
        this._routerRoot = this.$parent&&this.$parent._routerRoot
      }
    }
  })
  _Vue.component('RouterView',View)
  _Vue.component('RouterLink',Link)
  Object.defineProperty(Vue.prototype,'$router',{
    get(){return this._routerRoot._router}
  })
  Object.defineProperty(Vue.prototype,'$route',{
    get(){return this._routerRoot._route}
  })
}