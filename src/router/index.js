import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'

import "@/css/main.css"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})
