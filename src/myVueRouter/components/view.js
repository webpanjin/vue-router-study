export default {
  render(h){
    //当前匹配到的路由对象
    const route = this.$route
    let depth = 0
    //记录当前组件为RouterView
    this.routerView = true 
    let parent = this.$parent
    while(parent){
      if(parent.routerView){
        depth++
      }
      parent = parent.$parent
    }
    const record = route.matched[depth]//默认加载第一个
    if(!record){
      return h()
    }
    // console.log(record)
    const component = record.component
    return h(component)
  }
}