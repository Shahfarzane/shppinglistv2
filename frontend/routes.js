import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import About from './components/About.vue'
import Comments from './components/Comments.vue'
import Rate from './components/Rate.vue'






Vue.use(Router)

export default new Router({
  routes: [
    { path: '*', 
      redirect: '/home' 
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: { auth: true, title: 'HomePage' }
    },   
    {
        path: '/about',
        name: 'about',
        component: About,
        meta: { auth: true, title: 'About' }
    },   
    {
        path: '/comments',
        name: 'comments',
        component: Comments,
        meta: { auth: true, title: 'Comments' }
    },   
    {
        path: '/rate',
        name: 'rate',
        component: Rate,
        meta: { auth: true, title: 'Rate the app' }
    }
  ]
})
