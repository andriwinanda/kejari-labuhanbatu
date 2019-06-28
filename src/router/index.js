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
      path: '/berita',
      name: 'Berita',
      component: Berita
    }
  ],
  mode: 'history'
})
