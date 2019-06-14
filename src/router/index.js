import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import List from '@/components/List'
import Start from '@/components/Start'
import Regist from '@/components/Regist'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Hello',
    //   component: Hello
    // },
    {
      path: '/List',
      name: 'List',
      component: List
    },
    {
      path: '/',
      name: 'Start',
      component: Start
    },
    {
      path: '/Regist',
      name: 'Regist',
      component: Regist
    }
  ]
})
