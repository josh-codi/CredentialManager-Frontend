import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginViewVue from '@/views/auth/LoginView.vue'
import RegisterViewVue from '@/views/auth/RegisterView.vue'
import DetailViewVue from '@/views/DetailView.vue'
import { useAuthStore } from '@/store/auth'
import { useUserStore } from '@/store/user'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: DetailViewVue,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginViewVue
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterViewVue
  }
]



const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !useAuthStore().isLogin) {
    next('/login');
  } else if (to.meta.requiresAuth && !useUserStore().user){
    next('/login');
  }
  else {
    // User is authenticated or the route doesn't require authentication, proceed
    next();
  }
});


export default router
