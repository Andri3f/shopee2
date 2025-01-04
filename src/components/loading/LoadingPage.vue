<template>
   <div class="loading">
      <div class="loading__item">
         <v-progress-circular color="#000" indeterminate :size="120" :width="6"></v-progress-circular>
      </div>
   </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.loading {
   position: fixed;
   left: 0;
   top: 0;
   z-index: 100;
   height: 100vh;
   width: 100vw;
   background: rgba(255, 255, 255, 0.8);

   &__item {
      position: absolute;
      z-index: 10;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
   }
}
</style>
