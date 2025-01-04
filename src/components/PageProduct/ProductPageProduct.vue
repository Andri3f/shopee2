<template>
   <div class="product-main">
      <div class="product-main__container">
         <!-- ============slider-left=================== -->
         <div class="slider-main-product">
            <div class="thumbs-slider swiper">
               <div class="thumbs-slider__wrapper swiper-wrapper">
                  <div class="thumbs-slider__slide swiper-slide" v-for="i in 4" :key="i">
                     <img :src="getImagePath" alt="" />
                  </div>
               </div>
            </div>
            <div class="slider-main-product__slider-container">
               <div class="slider-main-product__slider swiper">
                  <div class="slider-main-product__wrapper swiper-wrapper">
                     <div class="slider-main-product__slide swiper-slide" v-for="i in 4" :key="i">
                        <img :src="getImagePath" alt="" />
                     </div>
                  </div>
               </div>
               <div class="slider-main-product__scrollbar"></div>
            </div>
         </div>
         <!-- ===============content================ -->
         <div class="product-main__content content-prod-main">
            <h3 class="content-prod-main__title">{{ prodData.title }}</h3>
            <div class="content-prod-main__price small-title">$ {{ getPrice(prodData.price) }}</div>
            <div class="content-prod-main__description">
               <p>{{ prodData.descriptions }}</p>
            </div>
            <div class="content-prod-main__actions main-prod-actions">
               <div class="main-prod-actions__counter">
                  <counter v-model:count="prodCount" />
               </div>
               <button class="main-prod-actions__add-to-cart button" @click="addToCart(prodData.id, prodCount)">
                  {{ $t('buttons.addToCart') }}
               </button>
            </div>
         </div>
      </div>
   </div>
</template>

<script setup>
import Counter from '../buttons/Counter.vue'
import { initSliders } from '../../modulesHelpers/swipper/swiper'
import { getPrice } from '@/localScript/functions/functions'
import { computed, onMounted, ref, watch } from 'vue'
import { useCartStore } from '../../stores//cart'
const { addToCart } = useCartStore()
import { useColoursStore } from '../../stores/colours'
const props = defineProps({
   product: {
      type: Object,
   },
})
const prodCount = ref(1)
let isLoading = ref(null)
const coloursStore = useColoursStore()
const { getItemByIdentifier } = coloursStore
const prodData = computed(() => props.product.value)
const getImagePath = computed(() => {
   return new URL(`../../assets/img/products/${props.product.value.imgSrc}`, import.meta.url).href
})

onMounted(() => {
   initSliders()
})
</script>

<style lang="scss" scoped>
:deep() {
   .swiper-scrollbar-horizontal .swiper-scrollbar-drag {
      cursor: pointer;
      height: 2px;
      background-color: #707070;
   }
}

.product-main {
   margin-bottom: clamp(3.75rem, 1.538rem + 5.9vw, 6.25rem);
   // .product-main__container
   &__container {
      display: grid;
      grid-template-columns: 55.8% 1fr;
      gap: clamp(1.875rem, -1.137rem + 6.274vw, 3.875rem);
      @media (max-width: 767.98px) {
         grid-template-columns: 1fr;
      }
   }
   // .product-main__content
   &__content {
   }
}
.thumbs-slider {
   @media (max-width: 767.98px) {
      display: none;
   }
   //max-height: clamp(24rem, 15.92rem + 24.213vw, 28rem);
   //height: clamp(10rem, 15.92rem + 24.213vw, 28rem);
   height: clamp(21rem, 4.821rem + 29.02vw, 28rem);
   // .thumbs-slider__wrapper
   &__wrapper {
      display: grid;
   }
   // .thumbs-slider__slide
   &__slide {
      cursor: pointer;
      overflow: hidden;
      border-radius: 6px;
      transition: all 0.3s ease 0s;

      position: relative;
      img {
         //max-width: 100%;
         //position: absolute;
         top: 0;
         left: 0;
         width: 100%;
         height: 100%;
         object-fit: contain;
      }
      &.swiper-slide-thumb-active {
         opacity: 0.5;
      }
   }
}

.slider-main-product {
   display: grid;
   grid-template-columns: minmax(80px, 120px) 1fr;
   gap: clamp(1.25rem, -0.162rem + 2.941vw, 2.188rem);
   @media (max-width: 767.98px) {
      grid-template-columns: 1fr;
   }
   // .slider-main-product__slider
   &__slider-container {
      width: 100%;
      overflow: hidden;
      position: relative;
      padding-bottom: 23px;
   }

   &__slider {
      max-width: 100%;
      min-height: 100%;
   }
   // .slider-main-product__wrapper
   &__wrapper {
   }
   // .slider-main-product__slide
   &__slide {
      overflow: hidden;
      border-radius: 6px;
      text-align: center;
      img {
         max-width: 100%;
         width: 100%;
         object-fit: contain;
         transition: all 1.2s ease 0s;
         @media (min-width: 767.98px) {
            opacity: 0;
         }
         @media (max-width: 767.98px) {
            width: auto;
         }
      }
      @media (min-width: 767.98px) {
         &.swiper-slide-active img {
            opacity: 1;
         }
      }
   }

   &__scrollbar {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 2px;
      background-color: #d8d8d8;
      border-radius: 0;
   }

   //&__scrollbar.swiper-scrollbar-horizontal {
   //   .swiper-scrollbar-drag {
   //      height: 5px !important;
   //      background-color: #000 !important;
   //   }
   //}
}

.content-prod-main {
   // .content-prod-main__title
   &__title {
      font-size: clamp(1.25rem, 0.918rem + 0.885vw, 1.625rem);
      line-height: 134.615385%; /* 35/26 */
      &:not(:last-child) {
         margin-bottom: clamp(1rem, 0.613rem + 1.032vw, 1.438rem);
      }
   }
   // .content-prod-main__price
   &__price {
      font-size: clamp(1rem, 0.704rem + 0.68vw, 1.25rem);
      color: #a18a68;
      &:not(:last-child) {
         margin-bottom: clamp(1.75rem, -0.02rem + 4.72vw, 3.75rem);
      }
   }
   // .content-prod-main__description
   &__description {
      font-size: clamp(0.875rem, 0.764rem + 0.295vw, 1rem);
      line-height: 168.75%; /* 27/16 */
      &:not(:last-child) {
         margin-bottom: clamp(1.375rem, -0.063rem + 3.835vw, 3rem);
      }
   }
}
.main-prod-actions {
   // .main-prod-actions__counter
   display: flex;
   align-items: center;
   justify-content: center;
   gap: 1.4375rem;
   @media (max-width: 450px) {
      flex-direction: column;
   }
   &__counter {
      //color: #707070;
      //line-height: 168.75%; /* 27/16 */
      //padding: 14px 16px;
      //display: flex;
      //align-items: center;
      //gap: 1.5rem;
      //background-color: #efefef;
      //border-radius: 4px;
      @media (max-width: 450px) {
         width: 100%;
         justify-content: center;
      }
   }
   // .main-prod-actions__btn
   &__btn {
      padding-left: 5px;
      padding-right: 5px;
      @media (max-width: 767.98px) {
         font-size: 22px;
      }
   }
   // .main-prod-actions__count
   &__count {
      display: block;
      max-width: 5px;
   }
   &__add-to-cart {
      text-transform: uppercase;
      flex: 1 1 auto;
      border: 1px solid #000;
      @media (max-width: 450px) {
         width: 100%;
      }
   }
}
</style>
