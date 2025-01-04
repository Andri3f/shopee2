<template>
   <div class="order">
      <slot name="title">
         <h3 class="order__title label">{{ $t('checkout.order') }}</h3>
      </slot>
      <div class="order__box">
         <div class="order__body">
            <div class="order__block">
               <div class="order__item">
                  <div class="order__subtitle uppercase">{{ $t('checkout.product') }}</div>
                  <div class="order__info uppercase">{{ $t('checkout.total') }}</div>
               </div>
            </div>
            <div class="order__block" v-if="products.length">
               <div v-for="product in products" class="order__item" :key="product.id">
                  <div class="order__subtitle">
                     {{ product.title }} <span>{{ product.count }}x</span>
                  </div>
                  <div class="order__inf">${{ getPrice(product.price * product.count) }}</div>
               </div>
            </div>
            <div class="order__block">
               <div class="order__item">
                  <div class="order__subtitle uppercase">{{ $t('checkout.subtotal') }}</div>
                  <div class="order__info">${{ getPrice(getSum) || 0 }}</div>
               </div>
            </div>
            <div class="order__block">
               <div class="order__item">
                  <div class="order__subtitle uppercase">{{ $t('checkout.shipping') }}</div>
                  <div class="order__info">{{ $t('checkout.freeShipping') }}</div>
               </div>
            </div>
            <div class="order__block">
               <div class="order__item">
                  <div class="order__subtitle uppercase uppercase--bold">{{ $t('checkout.total') }}</div>
                  <div class="order__info uppercase uppercase--bold">${{ getSum }}</div>
               </div>
            </div>
         </div>
         <slot></slot>
      </div>
   </div>
</template>

<script setup>
import { getPrice } from '@/localScript/functions/functions'
import { computed, onMounted } from 'vue'
const props = defineProps({
   products: {
      type: Array,
      required: true,
   },
})

//const getSum = computed(() => {
//   return props.products.reduce((prevSum, product) => prevSum + product.price * product.count, 0)
//})
const getSum = computed(() => {
   if (Array.isArray(props.products)) {
      return props.products.reduce((prevSum, product) => prevSum + product.price * product.count, 0)
   }
   return 0
})
</script>

<style lang="scss" scoped>
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
