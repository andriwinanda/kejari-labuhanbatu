import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Berita from '@/pages/Berita'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/berita/:id',
      name: 'Berita',
      component: Berita
    },
    { path: "*", redirect: '/' }
  ],
  scrollBehavior () {
    return { x: 0, y: 0 };
  },
  mode: 'history'
})
