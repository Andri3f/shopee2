<template>
   <main-master-page>
      <div class="error-block">
         <h1 class="error-block__title title">404 EROOR</h1>
         <div class="error-block__text small-title">This page not found; back to home and start again</div>
         <RouterLink class="error-block__btn button" :to="{ name: 'home' }">Home Page</RouterLink>
      </div>
   </main-master-page>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import MainMasterPage from '../../masterPages/MainMasterPage.vue'
</script>

<style lang="scss" scoped>
.error-block {
   text-align: center;
   padding: 100px 0;
   // .error-block__title
   &__title {
      margin-bottom: clamp(1rem, 0.679rem + 1.03vw, 1.5rem);
   }
   // .error-block__text
   &__text {
      color: #707070;
      margin-bottom: clamp(2.813rem, 2.049rem + 2.44vw, 4rem);
   }
   &__btn {
      transition: all 0.3s ease 0s;
      border: 1px solid #000;
      @media (any-hover: hover) {
         &:hover {
            color: #fff;
            background-color: #000;
         }
      }
   }
}
</style>
