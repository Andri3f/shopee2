<template>
   <section class="home-list">
      <div class="home-list__container">
         <div class="home-list__header">
            <h2 class="home-list__title title">Shop The Latest</h2>
            <button class="home-list__view-more small-title small-title-smaller" @click="showMore">
               {{ $t('buttons.view-more') }}
            </button>
         </div>
         <ProductsList :start-prod-to-show="prodCountToShow" />
      </div>
   </section>
</template>

<script setup>
import { ref } from 'vue'
import ProductsList from '../ProductComponents/ProductsList.vue'
let prodCountToShow = ref(3)
function showMore() {
   prodCountToShow.value += 3
}
</script>

<style lang="scss" scoped>
.home-list {
   // .home-list__header
   &__header {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      align-items: center;
      justify-content: space-between;
      &:not(:last-child) {
         margin-bottom: clamp(0.813rem, -0.232rem + 3.34vw, 2.438rem);
      }
   }
   // .home-list__view-more
   &__view-more {
      color: #a18a68;
   }
}
</style>
