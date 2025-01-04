<template>
   <main-master-page>
      <section class="story">
         <div class="story__container">
            <div class="story__header">
               <h2 class="story__title title">Fast Fashion, And Faster Fashion</h2>
               <div class="story__subtitle">by <span>ANNY JOHNSON </span> - October 8,2020</div>
            </div>
            <div class="story__main-image"><img src="../assets/img/story/01.jpeg" alt="" /></div>
            <div class="story__second-container">
               <div class="story__body">
                  <div class="story__text">
                     <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat
                        hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero. Sed quis mauris eget
                        arcu facilisis consequat sed eu felis. Nunc sed porta augue.
                     </p>
                     <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat
                        hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero. Sed quis mauris eget
                        arcu facilisis consequat sed eu felis.
                     </p>
                  </div>
                  <div class="story__bottom-image"><img src="../assets/img/story/02.jpeg" alt="" /></div>
               </div>
               <div class="story__trends trends">
                  <h4 class="trends__title label">Top trends</h4>
                  <div class="trends__descr"></div>
                  <ul class="trends__list">
                     <li v-for="trend in trendsList" :key="trend.id">{{ trend.text }} lorem</li>
                  </ul>
               </div>
            </div>
         </div>
      </section>
   </main-master-page>
</template>

<script setup>
import MainMasterPage from '../masterPages/MainMasterPage.vue'
import { trendsList } from '../data//trends/settings'
</script>

<style lang="scss" scoped>
.story {
   // .story__container
   &__container {
   }
   &__header {
      text-align: center;
      &:not(:last-child) {
         margin-bottom: clamp(1.25rem, 0.357rem + 2.381vw, 2.5rem);
      }
   }
   // .story__title
   &__title {
      &:not(:last-child) {
         margin-bottom: clamp(0.563rem, 0.25rem + 0.833vw, 1rem);
      }
   }
   // .story__subtitle
   &__subtitle {
      color: #707070;
      font-size: clamp(0.75rem, 0.571rem + 0.476vw, 1rem);
      line-height: 168.75%; /* 27/16 */
      span {
         color: #000;
         text-transform: uppercase;
      }
   }
   // .story__main-image
   &__main-image {
      border-radius: 8px;
      img {
         max-width: 100%;
      }
      &:not(:last-child) {
         margin-bottom: clamp(1.875rem, 0.357rem + 4.048vw, 4rem);
      }
   }
   // .story__second-container
   &__second-container {
      max-width: 670px;
      margin: 0 auto;
   }
   // .story__body
   &__body {
      &:not(:last-child) {
         margin-bottom: clamp(1.5rem, -0.19rem + 3.993vw, 3rem);
      }
   }
   // .story__text
   &__text {
      &:not(:last-child) {
         margin-bottom: clamp(1.75rem, -0.362rem + 4.992vw, 3.625rem);
      }
      font-size: clamp(0.75rem, 0.468rem + 0.666vw, 1rem);
      line-height: 168.75%; /* 27/16 */
      p {
         &:not(:last-child) {
            margin-bottom: 10px;
         }
      }
   }
   // .story__bottom-image
   &__bottom-image {
      border-radius: 8px;
      img {
         max-width: 100%;
      }
   }
   // .story__trends
   &__trends {
   }
}
.trends {
   // .trends__title
   &__title {
      &:not(:last-child) {
         margin-bottom: clamp(0.75rem, -0.095rem + 1.997vw, 1.5rem);
      }
   }
   // .trends__descr
   &__descr {
      font-size: clamp(0.875rem, 0.734rem + 0.333vw, 1rem);
      line-height: 168.75%; /* 27/16 */
      &:not(:last-child) {
         margin-bottom: clamp(0.563rem, 0.07rem + 1.165vw, 1rem);
      }
   }
   // .trends__list
   &__list {
      font-size: clamp(0.75rem, 0.468rem + 0.666vw, 1rem);
      line-height: 155%; /* 26/16 */
      margin-left: 12px;
      li {
         display: flex;
         align-items: center;
         gap: 10px;
         &::before {
            content: '';
            flex: 0 0 10px;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: #000;
         }
         &:not(:last-child) {
            margin-bottom: 8px;
         }
      }
   }
}
</style>
