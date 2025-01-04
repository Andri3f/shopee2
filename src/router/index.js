import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from './helpers'
import HomeView from '../views/HomeView.vue'
import { useUsersStore } from '../stores/users'
import { storeToRefs } from 'pinia'

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
      {
         path: '/',
         name: 'home',
         component: HomeView,
         meta: {
            requireAuth: false,
         },
      },
      {
         path: '/shop',
         name: 'shop',
         component: () => import('../views/ShopPage.vue'),
         meta: {
            requireAuth: false,
         },
      },
      {
         path: '/product/:id',
         name: 'product',
         component: () => import('../views/ProductPage.vue'),
         props: true,
         meta: {
            requireAuth: false,
         },
      },
      {
         path: '/cart',
         name: 'cart',
         component: () => import('../views/CartPage.vue'),
         meta: {
            requireAuth: true,
         },
      },
      {
         path: '/checkout',
         name: 'checkout',
         component: () => import('../views/CheckoutPage.vue'),
         meta: {
            requireAuth: true,
         },
      },
      {
         path: '/userPage',
         name: 'userPage',
         component: () => import('../views/UserPage.vue'),
         meta: {
            requireAuth: false,
         },
      },
      {
         path: '/storyPage',
         name: 'storyPage',
         component: () => import('../views/StoryPage.vue'),
         meta: {
            requireAuth: false,
         },
      },
      {
         path: '/login',
         name: 'login',
         component: () => import('../views/LoginPage.vue'),
         meta: {
            requireAuth: false,
         },
      },
      {
         path: '/:pathMatch(.*)*',
         name: 'notFound',
         component: () => import('../components/error/ErrorPage.vue'),
         meta: {
            requireAuth: false,
         },
      },
   ],
})

router.beforeEach(async (to) => {
   if (to.meta?.requireAuth) {
      let userId = localStorage.getItem('userId')
      const { currentUser } = storeToRefs(useUsersStore())
      if (userId && !currentUser.value) {
         const { loadUserById } = useUsersStore()
         await loadUserById(userId)
      }
      if (!isAuthenticated())
         return {
            name: 'login',
         }
   }
})

export default router
