import Vue from 'vue'
import Router from 'vue-router'
import VueMaterial from 'vue-material'
import HelloWorld from '@/components/HelloWorld'
import Blogs from '@/components/Blogs'
import CreateNewBlog from '@/components/CreateNewBlog'
import EditBlog from '@/components/EditBlog'

Vue.use(VueMaterial)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/blogs',
      name: 'Blogs',
      component: Blogs
    },
    {
      path: '/createnewblog',
      name: 'CreateNewBlog',
      component: CreateNewBlog
    },
    {
      path: '/editblog',
      name: 'EditBlog',
      component: EditBlog
    }
  ]
})
