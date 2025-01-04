<template>
   <main-master-page>
      <section class="checkout">
         <div class="checkout__container">
            <h2 class="checkout__title title">{{ $t('checkout.title') }}</h2>
            <form @submit.prevent="handleSubmit" action="" class="checkout__form">
               <div class="checkout__body">
                  <div class="checkout__form">
                     <div class="checkout__subtitle label">{{ $t('checkout.billingDetails') }}</div>
                     <div action="" class="checkout__form checkout-inputs">
                        <div
                           v-for="(formItem, indx) in formData"
                           class="checkout-inputs__item"
                           :class="{ 'checkout-inputs__item--small': formItem.half }"
                           :key="indx"
                        >
                           <input
                              :type="formItem.type"
                              v-model="billingData[formItem.title]"
                              required
                              :placeholder="$t(`checkout.${formItem.placeHolder}`)"
                           />
                        </div>
                     </div>
                  </div>
                  <order-list :products="getProductsFromCatr">
                     <!--@click="placeOrder"-->
                     <button class="order__button button" type="submit">
                        {{ $t('checkout.palceOrder') }}
                     </button>
                  </order-list>
               </div>
            </form>
         </div>
      </section>
   </main-master-page>
</template>

<script setup>
import MainMasterPage from '../masterPages/MainMasterPage.vue'
import OrderList from '../components/commonComponents/OrderList.vue'
import { useCartStore } from '../stores/cart'
import { formData } from '../data/billing/settings'
import { onMounted, reactive } from 'vue'
import { getPrice } from '../localScript/functions/functions'
import { storeToRefs } from 'pinia'
import { useUsersStore } from '../stores/users'
import { useOrdersStore } from '../stores/orders'
const usersStore = useUsersStore()
//const { updateUser } = usersStore
const { addItemWithCustomId, loadItemById, updateItem } = useOrdersStore()
const { getCurrentUser } = storeToRefs(usersStore)
const cartStore = useCartStore()
const { getProductsFromCatr, getTotalPrice, cartProdList } = storeToRefs(cartStore)
let billingData = reactive({})

function isBillingEntered() {
   const numOfBillingdata = Object.keys(billingData).length
   return numOfBillingdata === 7
}

async function handleSubmit(event) {
   event.preventDefault()
   await placeOrder()
}

async function placeOrder() {
   const userId = localStorage.getItem('userId')
   const userCartData = JSON.parse(localStorage.getItem('userCartData'))
   const userData = await loadItemById(userId)
   if (isBillingEntered()) {
      const uniqueId = Math.random().toString(36).substr(2, 9)
      const today = new Date()
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      const formattedDate = today.toLocaleDateString('en-US', options)
      if (Object.keys(userData).length === 0) {
         addItemWithCustomId({
            id: userId,
            data: { ...billingData, id: uniqueId, userCartData, dateOfOrder: formattedDate },
         })
      } else {
         const newOrder = { ...billingData, userCartData, id: uniqueId, dateOfOrder: formattedDate }
         const updatedOrders = userData.orders ? [...userData.orders, newOrder] : [newOrder]
         await updateItem(userId, { orders: updatedOrders })
      }
      billingData = {}
      cartProdList.value = []
   }
}
onMounted(() => {
   const email = getCurrentUser.value.email
   if (email) billingData.email = email
})
</script>

<style lang="scss" scoped>
.checkout {
   // .checkout__container
   &__container {
   }
   // .checkout__title
   &__title {
      text-align: center;
      margin-bottom: clamp(2.5rem, -0.165rem + 4.902vw, 3.75rem);
      @media (max-width: 767.98px) {
         text-align-last: left;
      }
   }
   // .checkout__body
   &__body {
      display: grid;
      gap: clamp(2.75rem, -1.391rem + 8.627vw, 5.5rem);
      grid-template-columns: 1fr 1fr;
      @media (max-width: 767.98px) {
         grid-template-columns: 1fr;
      }
   }
   // .checkout__form
   &__form {
   }
   &__subtitle {
      &:not(:last-child) {
         margin-bottom: clamp(0.938rem, -0.192rem + 2.353vw, 1.688rem);
      }
   }
   // .checkout__order
   &__order {
   }
}
.checkout-inputs {
   // .form-checkout__item
   display: flex;
   flex-wrap: wrap;
   column-gap: clamp(1.25rem, -0.632rem + 3.921vw, 2.5rem);
   row-gap: clamp(1.25rem, -0.397rem + 3.431vw, 2.344rem);
   &__item {
      //flex: 1 1 100%;
      width: 100%;
      border-bottom: 1px solid #d8d8d8;
      padding-bottom: clamp(0.438rem, 0.014rem + 0.882vw, 0.719rem);
      input {
         font-size: clamp(0.75rem, 0.374rem + 0.784vw, 1rem);

         width: 100%;
         line-height: 156.25%; /* 25/16 */
         &::placeholder {
            //font-size: clamp(0.75rem, 0.374rem + 0.784vw, 1rem);
            color: #707070;
         }
      }
      &--small {
         flex: 1 1 45%;
         width: 50%;
         @media (max-width: 767.98px) {
            width: 100%;
            flex: 1 1 100%;
         }
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
   // .ord1er__body
   &__box {
      color: #707070;
      border-radius: 4px;
      background-color: #efefef;
      padding: clamp(1.25rem, -0.538rem + 3.725vw, 2.438rem) clamp(1rem, -3.047rem + 8.431vw, 3.688rem);
   }
   &__body {
      &:not(:last-child) {
         margin-bottom: clamp(2.188rem, -0.165rem + 4.902vw, 3.75rem);
      }
   }
   // .order__block
   &__block {
      &:not(:last-child) {
         border-bottom: 1px solid #d8d8d8;
         padding-bottom: clamp(0.5rem, -0.394rem + 1.863vw, 1.094rem);
         margin-bottom: clamp(0.813rem, -0.082rem + 1.863vw, 1.406rem);
      }
   }
   // .order__item
   &__item {
      font-size: clamp(0.75rem, 0.374rem + 0.784vw, 1rem);
      line-height: 156.25%; /* 25/16 */
      display: flex;
      justify-content: space-between;
      gap: 10px;
      &:not(:last-child) {
         margin-bottom: clamp(0.938rem, -0.098rem + 2.157vw, 1.625rem);
      }
   }
   // .order__subtitle
   &__subtitle {
      display: flex;
      align-items: center;
      gap: clamp(0.938rem, 0.467rem + 0.98vw, 1.25rem);
      span {
         color: #000;
         font-size: clamp(0.625rem, 0.249rem + 0.784vw, 0.782rem);
      }
   }
   &__button {
      transition: all 0.3s ease 0s;
      width: 100%;
      color: #fff;
      background-color: #000;
      outline: 1px solid #000;
      @media (any-hover: hover) {
         &:hover {
            background-color: transparent;
            color: #000;
         }
      }
   }
}
</style>
