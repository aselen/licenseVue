import Vue from 'vue'
import VueRouter from 'vue-router'
import Authenticate from '../views/Authenticate.vue'
import Dashboard from '../views/Dashboard.vue'
import Weather from '../views/Weather.vue'
import Profile from '../views/Profile.vue'

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
    redirect: '/Weather',
    children: [
      {
        path: 'Weather',
        name: 'Weather',
        component: Weather
      },
      {
        path: 'profile',
        name: 'Profile',
        component: Profile
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
    //kullanici login olup, local storage temizlerse ve sayfa yenilemesi yaparsa login kalmis oluyor..
    return next('/auth')
  }

  next()
})

export default router
