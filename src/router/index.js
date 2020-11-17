import Vue from 'vue'
import VueRouter from 'vue-router'
import Mv from '../components/Mv.vue'

Vue.use(VueRouter)

const routes = [
    {
      path:'/mv',
      component:Mv
    }
]

const router = new VueRouter({
  routes
})

export default router
