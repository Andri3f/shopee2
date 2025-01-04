<template>
   <main-master-page>
      <MainBLock :slider-items="slidersList" />

      <HomeList />
   </main-master-page>
</template>

<script setup>
import MainMasterPage from '../masterPages/MainMasterPage.vue'
import MainBLock from '../components/home/MainBLock.vue'
import HomeList from '../components/home/HomeList.vue'
import { slidersList } from '../data/home-main/settings'
</script>

<style lang="scss" scoped></style>
