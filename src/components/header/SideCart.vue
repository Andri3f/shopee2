<template>
   <div class="side-cart">
      <div class="side-cart__body">
         <div class="side-cart__header">
            <button class="side-cart__close-cart" @click="$emit('closeCart')">
               <font-awesome-icon :icon="['fas', 'chevron-left']" />
            </button>
            <h3 class="side-cart__title">{{ $t('cart.title') }}</h3>
         </div>
         <div class="side-cart__items-count">{{ getProductsFromCatr.length }} items</div>
         <div class="side-cart__items">
            <div class="side-cart__item item-side-prod" v-for="product in getProductsFromCatr" :key="product.id">
               <div class="item-side-prod__image"><img :src="getImagePath(product.imgSrc)" alt="" /></div>
               <div class="item-side-prod__content">
                  <div class="item-side-prod__head">
                     <h3 class="item-side-prod__title">{{ product.title }}</h3>
                     <button class="item-side-prod__delete" @click="deleteProdFromCart(product.id)">+</button>
                  </div>
                  <div class="item-side-prod__price">{{ getPrice(product.price) }}</div>
                  <div class="item-side-prod__amount amount-prod">
                     <span class="amount-prod__title">QTY:</span>
                     <div class="amount-prod__box-amount">
                        <button class="amount-prod__btn" @click="cahangeProdCount(product.id, -1)">-</button>
                        <span class="amount-prod__count">{{ product.count }}</span>
                        <button @click="cahangeProdCount(product.id, 1)">+</button>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div class="side-cart__bottom bottom-side-cart">
            <div class="bottom-side-cart__header">
               <div class="bottom-side-cart__title">Subtotal ({{ getProductsFromCatr.length }} items)</div>
               <div class="bottom-side-cart__total-price" v-if="getTotalPrice">$ {{ getPrice(getTotalPrice) }}</div>
            </div>
            <router-link :to="{ name: 'cart' }" class="bottom-side-cart__button button" @click="$emit('closeCart')">{{
               $t('buttons.viewCart')
            }}</router-link>
         </div>
      </div>
   </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useCartStore } from '../../stores/cart'
import { useBallsStore } from '../../stores/balls'
import { onMounted, watch } from 'vue'
import { getPrice } from '../../localScript/functions/functions'
import { RouterLink } from 'vue-router'
defineEmits(['closeCart'])
const cartStore = useCartStore()
const { getProductsFromCatr, getTotalPrice } = storeToRefs(cartStore)
const { cahangeProdCount, deleteProdFromCart } = cartStore
const getImagePath = (imgPath) => new URL(`../../assets/img/products/${imgPath}`, import.meta.url).href
</script>

<style lang="scss" scoped>
.side-cart {
   height: 100%;
   &__body {
      height: 100%;
      display: flex;
      flex-direction: column;
   }
   // .side-cart__header
   &__header {
      display: flex;
      align-items: center;
      //justify-content: space-between;
      gap: 10px;
      &:not(:last-child) {
         margin-bottom: clamp(1.7rem, -0.034rem + 1.375vw, 1.063rem);
      }
   }
   // .side-cart__close-cart
   &__close-cart {
      justify-self: start;
      transition: all 0.3s ease 0s;
      @media (any-hover: hover) {
         &:hover {
            transform: translate(-2px, 0);
         }
      }
   }
   // .side-cart__title
   &__title {
      flex-grow: 1; /* Займе всю доступну ширину */
      text-align: center;
      line-height: 168.75%; /* 27/16 */
   }
   &__items-count {
      font-size: 12px;
      color: #707070;
      line-height: 166.666667%; /* 20/12 */
      &:not(:last-child) {
         margin-bottom: 3px;
      }
   }
   ::-webkit-scrollbar {
      display: none;
   }
   &__items {
      flex: 1 1 auto;
      &:not(:last-child) {
         margin-bottom: 20px;
      }
   }
}
.item-side-prod {
   &:not(:last-child) {
      margin-bottom: 20px;
   }
   display: grid;
   gap: 0.5rem;
   grid-template-columns: 1fr 1fr;

   // .item-side-prod__image
   &__image {
      overflow: hidden;
      border-radius: 4px;
      img {
         max-width: 100%;
      }
   }
   // .item-side-prod__content
   &__content {
      display: flex;
      flex-direction: column;
   }
   // .item-side-prod__head
   &__head {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      gap: 10px;
   }
   // .item-side-prod__title
   &__title {
      font-weight: 500;
      font-size: 14px;
      line-height: 128.571429%; /* 18/14 */
      &:not(:last-child) {
         margin-bottom: 2px;
      }
   }
   // .item-side-prod__close
   &__delete {
      font-weight: 500;
      flex: 10px;
      transform: rotate(45deg);
   }
   // .item-side-prod__price
   &__price {
      color: #a18a68;
      line-height: 128.571429%; /* 18/14 */
      flex: 1 1 auto;
      &:not(:last-child) {
         margin-bottom: 3px;
      }
   }
   // .item-side-prod__amount
   &__amount {
   }
   // .item-side-prod__box-amount
   &__box-amount {
   }
}
.amount-prod {
   display: flex;
   gap: 8px;
   align-items: center;
   // .amount-prod__title
   &__title {
      text-transform: uppercase;
   }
   // .amount-prod__box-amount
   &__box-amount {
      display: flex;
      align-items: center;
      gap: 7px;
   }
   // .amount-prod__btn
   &__btn {
   }
   // .amount-prod__count
   &__count {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 12px;
   }
}
.bottom-side-cart {
   padding-bottom: 30px;
   background-color: #fff;
   width: 100%;
   // .bottom-side-cart__header
   &__header {
      display: flex;
      align-items: center;
      gap: 8px;
      justify-content: space-between;
      &:not(:last-child) {
         margin-bottom: clamp(0.625rem, -0.407rem + 2.153vw, 1.313rem);
      }
   }
   // .bottom-side-cart__title
   &__title {
      line-height: 168.75%; /* 27/16 */
   }
   // .bottom-side-cart__total-price
   &__total-price {
      line-height: 168.75%; /* 27/16 */
   }
   // .bottom-side-cart__button
   &__button {
      display: inline-block;
      width: 100%;
      border-radius: 4px;
      border: 1px solid #000;
      text-transform: uppercase;
      text-align: center;
      transition: all 0.3s ease 0s;
      @media (any-hover: hover) {
         &:hover {
            color: #fff;
            background-color: #000;
         }
      }
   }
}
</style>
