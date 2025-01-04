<template>
   <main-master-page>
      <div class="user-page">
         <div class="user-page__container">
            <div class="user-page__actions">
               <button class="user-page__login" @click="onLoginAction">
                  <span v-if="getCurrentUser">Log Out</span>
                  <span v-else>Log In / Register</span>
               </button>
            </div>
            <div class="user-page__content user-order">
               <div class="user-order__no-order" v-if="!currentUserData">No orders yet</div>
               <div v-else class="user-order__body body-orders">
                  <div class="body-orders__order order-item" v-for="userOrder in currentUserData" :key="userOrder.id">
                     <div class="order-item__details details-order">
                        <h3 class="details-order__title label">{{ $t('order.titles.orderDetails') }}</h3>
                        <div class="details-order__body">
                           <div class="details-order__item">
                              <h6 class="details-order__sub-title">{{ $t('order.subtitles.orderNumber') }}</h6>
                              <div class="details-order__info">{{ userOrder.id }}</div>
                           </div>
                           <div class="details-order__item">
                              <h6 class="details-order__sub-title">{{ $t('order.subtitles.orderEmail') }}</h6>
                              <div class="details-order__info">{{ userOrder.email }}</div>
                           </div>
                           <div class="details-order__item">
                              <h6 class="details-order__sub-title">{{ $t('order.subtitles.orderDate') }}</h6>
                              <div class="details-order__info">{{ userOrder.dateOfOrder }}</div>
                           </div>
                           <div class="details-order__item">
                              <h6 class="details-order__sub-title">{{ $t('order.subtitles.orderAdress') }}</h6>
                              <div class="details-order__info">{{ userOrder.country }}</div>
                              <div class="details-order__info">{{ userOrder.city }}</div>
                              <div class="details-order__info">{{ userOrder.street }}</div>
                           </div>
                           <div class="details-order__item">
                              <h6 class="details-order__sub-title">{{ $t('order.subtitles.orderContactNumber') }}</h6>
                              <div class="details-order__info">{{ userOrder.phone }}</div>
                           </div>
                        </div>
                     </div>
                     <div class="order-item__summary">
                        <order-list :products="userOrder.userCartData">
                           <template #title>
                              <h3 class="order__title label">{{ $t('order.titles.orderSummary') }}</h3>
                           </template>
                        </order-list>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </main-master-page>
</template>

<script setup>
import MainMasterPage from '../masterPages/MainMasterPage.vue'
import OrderList from '../components/commonComponents/OrderList.vue'
import { useAuthStore } from '../stores/auth'
import { useUsersStore } from '../stores/users'
import { useBallsStore } from '../stores/balls'
import router from '@/router'
import { storeToRefs } from 'pinia'
import { useOrdersStore } from '../stores/orders'
import { onMounted, ref } from 'vue'
const ordersStore = useOrdersStore()
//const { getItemsList } = ordersStore
const { loadItemById } = ordersStore
const { loadItemById: loadBallById } = useBallsStore()
const { getCurrentUser } = storeToRefs(useUsersStore())
const { logOut } = useAuthStore()
const currentUserData = ref(null)

function onLoginAction() {
   if (getCurrentUser.value) {
      logOut()
      currentUserData.value = null
   } else {
      router.push({
         name: 'login',
      })
   }
}

onMounted(async () => {
   const userId = localStorage.getItem('userId')
   if (userId) {
      const userData = await loadItemById(userId)
      loadUserOrders(userData)
   }
})

async function loadUserOrders(userData) {
   if (userData && userData.orders) {
      const ordersWithProducts = await Promise.all(
         userData.orders.map(async (order) => {
            const products = await getProducts(order.userCartData)
            return { ...order, userCartData: products }
         }),
      )
      currentUserData.value = ordersWithProducts
   } else {
      currentUserData.value = []
   }
}

async function getProducts(products) {
   const productsList = await Promise.all(
      products.map(async (product) => {
         const prodData = await loadBallById(product.prodId)
         return { ...prodData, count: product.count }
      }),
   )
   return productsList
}
</script>

<style lang="scss" scoped>
.user-page {
   &__actions {
      text-align: center;
      &:not(:last-child) {
         margin-bottom: clamp(2.5rem, -1.264rem + 7.843vw, 5rem);
      }
   }
   // .user-page__container
   &__container {
   }
   // .user-page__login
   &__login {
      border: 2px solid #000;
      border-radius: 4px;
      text-align: center;
      padding: clamp(0.625rem, 0.154rem + 0.98vw, 0.63rem) clamp(0.625rem, -0.316rem + 1.961vw, 1.25rem);
      transition: all 0.3s ease 0s;
      font-size: clamp(1.25rem, 0.309rem + 1.961vw, 1.875rem);
      @media (any-hover: hover) {
         &:hover {
            color: #fff;
            background-color: #000;
         }
      }
      div {
      }
   }
   // .user-page__content
   &__content {
   }
}

.user-order {
   // .user-order__no-order
   &__no-order {
   }
   // .user-order__body
   &__body {
   }
}
.body-orders {
   // .body-orders__order
   &__order {
   }
}
.order-item {
   &:not(:last-child) {
      border-bottom: 1px solid #d8d8d8;
      padding-bottom: clamp(1.563rem, 0.151rem + 2.941vw, 2.5rem);
      margin-bottom: clamp(1.563rem, 0.151rem + 2.941vw, 2.5rem);
   }
   display: grid;
   gap: clamp(0.938rem, -0.004rem + 1.961vw, 1.563rem);
   grid-template-columns: 1fr 1fr;
   justify-content: space-between;
   @media (max-width: 767.98px) {
      grid-template-columns: 1fr;
   }
   // .order-item__details
   &__details {
   }
   // .order-item__summary
   &__summary {
   }
}
.details-order {
   // .details-order__title
   &__title {
      &:not(:last-child) {
         margin-bottom: clamp(0.938rem, -0.192rem + 2.353vw, 1.688rem);
      }
   }

   // .details-order__item
   &__body {
      display: grid;
      grid-template-columns: auto auto;
      //align-items: start;
      grid-auto-rows: min-content;
      gap: clamp(1.063rem, -1.008rem + 4.314vw, 2.438rem);
      @media (max-width: 500px) {
         grid-template-columns: 1fr;
      }
   }
   &__item {
      //display: flex;
      //flex-direction: column;
   }
   // .details-order__sub-title
   &__sub-title {
      font-size: clamp(0.875rem, 0.687rem + 0.392vw, 1rem);
      text-transform: uppercase;
      line-height: 168.75%; /* 27/16 */
      &:not(:last-child) {
         margin-bottom: 0.375rem;
      }
   }
   // .details-order__info
   &__info {
      color: #707070;
      font-size: clamp(0.875rem, 0.687rem + 0.392vw, 1rem);
      line-height: 168.75%; /* 27/16 */
      &:not(:last-child) {
         //margin-bottom:;
      }
   }
}
.order {
   // .order__title
   &__title {
      &:not(:last-child) {
         margin-bottom: clamp(0.938rem, -0.192rem + 2.353vw, 1.688rem);
      }
   }
}
.label {
}
</style>
