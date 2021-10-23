import Vue from 'vue'
import Router from '../myVueRouter/index'
import Home from '../views/Home.vue'
import Blog from '../views/Blog.vue'
import blogChild from '../views/branch/blogChild.vue'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path:'/',
      name:'Home',
      component:Home,
    },
    {
      path:'/blog',
      name:'Blog',
      component:Blog,
      children:[
        {
          path:'blogChild',
          component:blogChild,
        }
      ]
    },
    {
      path:'/photo',
      name:'Photo',
      component:()=>import('../views/Photo.vue')
    }
  ]
})
