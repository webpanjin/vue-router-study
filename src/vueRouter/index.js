let _Vue = null
export default class VueRouter{
    static install(Vue){
        if(VueRouter.install.installed){
            return 
        }
        VueRouter.install.installed = true
        //把Vue构造函数记录到全局变量
        _Vue = Vue
        _Vue.mixin({
            beforeCreate(){
                //如果不判断，组件初始化时也会执行下面代码，只有在创建vue实例时才执行
                if(this.$options.router){
                    //把创建Vue实例时传入的router对象注入到Vue实例上
                    _Vue.prototype.$router = this.$options.router
                    this.$options.router.init()
                }
            }
        })
    }
    constructor(options){
        this.options = options 
        this.routeMap = {}
        this.data = _Vue.observable({//创建响应式对象
            //注意observable是vue2.6新增的api
            current:'/',
        })
    }
    init(){
        this.createRouteMap()
        this.initComponents(_Vue)
        this.initEvent()
    }
    createRouteMap(){
        this.options.routes.forEach(route=>{
            this.routeMap[route.path] = route.component
        })
    }
    initComponents(Vue){
        
        //完整版：包含运行时和编译器，体积比运行时版大10K左右，程序运行时把模板换成render函数
        // Vue.component('router-link',{
        //     props:{to:String},
        //     template:'<a :href="to"><slot></slot></a>'
        // })
        //运行时版：不支持template模板，需要打包的时候提前编译,需要我们自己写render函数
        Vue.component('router-link',{
            props:{to:String},
            render(h){
                return h('a',{
                    attrs:{
                        href:this.to 
                    },
                    on:{
                        click:this.clickHandler
                    }
                },[this.$slots.default])
            },
            methods:{
                //我们需要点击不同路由切换到不同组件，但是不要a标签的跳转行为
                clickHandler(e){
                    //History 对象包含用户（在浏览器窗口中）访问过的 URL。
                    //History 对象是 window 对象的一部分，可通过 window.history 属性对其进行访问。
                    // history.pushState()接收按个参数
                    //param1 state	存储JSON字符串
                    //param2 网页标题
                    //param3 url
                    history.pushState({},'',this.to)//调用之后我们就可以改变浏览器地址栏了
                    // 把当前路径记录到current中来改变组件
                    this.$router.data.current = this.to//因为this.$router.data是响应式对象，current被改变之后
                    //会改变组件并渲染到视图上
                    e.preventDefault()//取消事件的默认行为，
                }
            }
        })
        const self = this
        Vue.component('router-view',{
            render(h){
               let component = self.routeMap[self.data.current]
                return h(component)
            }
        })
    }

    initEvent(){
        //当活动历史记录条目更改时，将触发popstate事件
        window.addEventListener('popstate',()=>{
            //前进后退时让组件也切换
            this.data.current = window.location.pathname 
        })
    }
}