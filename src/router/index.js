import Vue from 'vue'
import VueRouter from 'vue-router'
import Authenticate from '../views/Authenticate.vue'
import Dashboard from '../views/Dashboard.vue'
import Test from '../views/Test.vue'
import Test2 from '../views/Test2.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/auth',
    name: 'Authenticate',
    component: Authenticate
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    redirect: '/test',
    children: [
      {
        path: 'test',
        name: 'Test',
        component: Test
      },
      {
        path: 'test2',
        name: 'Test2',
        component: Test2
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  //redirect to login page if user is not logged in and trying to access a restricted page
  const publicPages = ['/auth']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')

  if (authRequired && !loggedIn) {
    return next('/auth')
  }

  next()
})

export default router
