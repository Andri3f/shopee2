<template>
   <main-master-page>
      <section class="shop">
         <div class="shop__container">
            <h2 class="shop__title title">{{ $t('header.shop') }}</h2>
            <div class="shop__body">
               <sidebar-component />
               <shop-list />
            </div>
         </div>
      </section>
   </main-master-page>
</template>

<script setup>
import MainMasterPage from '../masterPages/MainMasterPage.vue'
import ShopList from '../components/shop/ShopList.vue'
import SidebarComponent from '../components/shop/SidebarComponent.vue'
</script>

<style lang="scss" scoped>
.shop {
   // .shop__container
   &__title {
      &:not(:last-child) {
         margin-bottom: clamp(1.9rem, -0.945rem + 3.92vw, 2.188rem);
      }
   }
   &__container {
   }
   &__body {
      position: relative;
      display: grid;
      gap: clamp(1.25rem, -0.162rem + 2.94vw, 2.188rem);
      grid-template-columns: 252px 1fr;
      @media (max-width: 800px) {
         grid-template-columns: 202px 1fr;
      }
      @media (max-width: 767.98px) {
         display: block;
      }
   }
}
</style>
