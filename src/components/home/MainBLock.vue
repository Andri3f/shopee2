<template>
   <section class="mian-block">
      <div class="mian-block__container">
         <div class="mian-block__body">
            <div class="mian-block__slider swiper">
               <div class="mian-block__wrapper swiper-wrapper">
                  <div class="mian-block__slide swiper-slide" v-for="slide in sliderItems" :key="slide.id">
                     <div class="mian-block__swiper-imge">
                        <img :src="getImagePath(slide.imgSrc)" alt="" />
                     </div>
                     <div class="mian-block__content">
                        <h2 class="mian-block__title title">{{ slide.title }}</h2>
                        <div class="mian-block__price">$ {{ getPrice(slide.price) }}</div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </section>
</template>

<script setup>
import { getPrice } from '@/localScript/functions/functions'
defineProps({
   sliderItems: {
      type: Array,
   },
})
const getImagePath = (imgPath) => {
   return new URL(`../../assets/img/home/${imgPath}`, import.meta.url).href
}
</script>

<style lang="scss" scoped>
.mian-block {
   &:not(:last-child) {
      margin-bottom: clamp(2.5rem, 0.241rem + 4.71vw, 4rem);
   }
   // .mian-block__container
   &__container {
   }
   // .mian-block__body
   &__body {
      position: relative;
   }
   &__slider {
   }
   // .mian-block__wrapper
   &__wrapper {
   }
   // .mian-block__slide
   &__slide {
      overflow: hidden;
      position: relative;
      display: flex;
      border-radius: 6px;
   }
   // .mian-block__swiper-imge
   &__swiper-imge {
      padding-bottom: 49%;
      img {
         position: absolute;
         width: 100%;
         height: 100%;
         top: 0;
         left: 0;
         object-fit: cover;
      }
   }
   // .mian-block__content
   &__content {
      align-self: center;
      color: #fff;
      position: relative;
      z-index: 2;
      padding: clamp(0.625rem, -2.199rem + 5.88vw, 2.5rem) clamp(0.938rem, -0.474rem + 2.94vw, 1.875rem);
      @media (max-width: 767.98px) {
         align-self: end;
      }
   }
   // .mian-block__title
   &__title {
      &:not(:last-child) {
         margin-bottom: clamp(0.425rem, 0.06rem + 1.18vw, 1rem);
      }
   }
   // .mian-block__price
   &__price {
      font-size: clamp(1rem, 0.059rem + 1.96vw, 1.625rem);
      &:not(:last-child) {
         margin-bottom: clamp(1.25rem, -1.385rem + 5.49vw, 3rem);
      }
   }
}
</style>
