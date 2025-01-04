<template>
   <main-master-page>
      <section class="cart">
         <div class="cart__container">
            <h2 class="cart__title title">{{ $t('cart.titleTwo') }}</h2>
            <div class="cart__body" v-if="getProductsFromCatr.length > 0">
               <div class="cart__products">
                  <cart-prod-list :getProductsFromCatr="getProductsFromCatr" />
               </div>

               <div class="cart__totals totals-cart">
                  <h4 class="totals-cart__title">{{ $t('cart.cartTotals') }}</h4>
                  <div class="totals-cart__body">
                     <div class="totals-cart__item">
                        <div class="totals-cart__subtitle">subtotal</div>
                        <div class="totals-cart__content">$ {{ getPrice(getTotalPrice) }}</div>
                     </div>
                     <div class="totals-cart__item">
                        <div class="totals-cart__subtitle">Shipping</div>
                        <div class="totals-cart__content">
                           Shipping costs will be calculated once you have provided address.
                        </div>
                     </div>
                  </div>
                  <div class="totals-cart__total total-cart">
                     <div class="total-cart__title">Total</div>
                     <div class="total-cart__price">$ {{ getPrice(getTotalPrice) }}</div>
                  </div>
                  <router-link :to="{ name: 'checkout' }" class="totals-cart__checkout button">{{
                     $t('cart.checkout')
                  }}</router-link>
               </div>
            </div>
            <div class="cart__empty" v-else>{{ $t('cart.emptyCart') }}</div>
         </div>
      </section>
   </main-master-page>
</template>

<script setup>
import MainMasterPage from '../masterPages/MainMasterPage.vue'
import CartProdList from '../components/cart/CartProdList.vue'
import { useCartStore } from '../stores/cart'
import { storeToRefs } from 'pinia'
import { getPrice } from '../localScript/functions/functions'
import { RouterLink } from 'vue-router'

const { getProductsFromCatr, getTotalPrice } = storeToRefs(useCartStore())
</script>

<style lang="scss" scoped>
.cart {
   // .cart__container
   &__container {
   }
   // .cart__title
   &__title {
      @media (min-width: 767.98px) {
         text-align: center;
      }
      margin-bottom: clamp(1rem, -3.517rem + 9.411vw, 4rem);
   }
   // .cart__body
   &__body {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: clamp(1.875rem, -2.831rem + 9.804vw, 5rem);
      @media (max-width: 767.98px) {
         grid-template-columns: 1fr;
      }
   }
   // .cart__products
   &__products {
   }
   // .cart__totals
   &__totals {
   }
   &__empty {
      font-size: 20px;
   }
}
.totals-cart {
   @media (max-width: 767.98px) {
      background-color: #efefef;
   }
   padding: clamp(0.938rem, -1.321rem + 4.706vw, 2.438rem) clamp(1rem, -3.047rem + 8.431vw, 3.688rem);
   // .totals-cart__title
   &__title {
      font-size: clamp(1.125rem, 0.372rem + 1.569vw, 1.625rem);
      line-height: 112%; /* 28/25 */
      &:not(:last-child) {
         margin-bottom: clamp(1.25rem, -0.82rem + 4.314vw, 2.625rem);
      }
   }
   // .totals-cart__item
   &__item {
      display: grid;
      gap: 0.9375rem;
      grid-template-columns: auto 53.64%;
      &:not(:last-child) {
         margin-bottom: clamp(0.938rem, 0.185rem + 1.569vw, 1.438rem);
      }
   }
   // .totals-cart__subtitle
   &__subtitle {
      text-transform: uppercase;
   }
   // .totals-cart__content
   &__content {
      color: #707070;
      justify-self: start;
      line-height: 137.5%; /* 22/16 */
   }
   &__body {
      border-bottom: 1px solid #d8d8d8;
      padding-bottom: clamp(1.125rem, -0.001rem + 2.348vw, 1.875rem);
      &:not(:last-child) {
         margin-bottom: clamp(1.563rem, -0.032rem + 3.327vw, 2.625rem);
      }
   }
   &__checkout {
      display: inline-block;
      text-align: center;
      width: 100%;
      transition: all 0.3s ease 0s;
      text-transform: uppercase;
      background-color: #000;
      color: #fff;
      border: 1px solid transparent;
      @media (any-hover: hover) {
         &:hover {
            color: #000;
            background-color: #fff;
            border: 1px solid #000;
         }
      }
   }
}
.total-cart {
   display: flex;
   justify-content: space-between;
   align-items: center;
   gap: 20px;
   font-weight: 700;
   text-transform: uppercase;
   line-height: 131.25%; /* 21/16 */
   &:not(:last-child) {
      margin-bottom: clamp(1.25rem, -1.095rem + 4.892vw, 2.813rem);
   }
   // .total-cart__title
   &__title {
   }
   // .total-cart__price
   &__price {
   }
}
</style>
