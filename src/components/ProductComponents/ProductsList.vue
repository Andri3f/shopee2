<template>
   <div class="products">
      <product-item v-for="item in productList" :product="item" :key="item.id" />
   </div>
</template>

<script setup>
import { computed, onBeforeMount } from 'vue'
import { useBallsStore } from '@/stores/balls.js'
import { storeToRefs } from 'pinia'
import ProductItem from './ProductItem.vue'
const ballsStore = useBallsStore()
const { getItemsList } = storeToRefs(ballsStore)
const { loadItemsList } = ballsStore
const props = defineProps({
   startProdToShow: {
      type: Number,
      dafault: 0,
   },
})
//let prodCountToShow = null

const productList = computed(() => {
   let startProdToShow = props.startProdToShow
   if (startProdToShow && startProdToShow >= getItemsList.value.length) startProdToShow = getItemsList.value.length
   return getItemsList.value.slice(0, startProdToShow)
})

onBeforeMount(() => {
   loadItemsList()
})
</script>

<style lang="scss" scoped>
.products {
   display: grid;
   gap: clamp(1rem, 0.679rem + 1.03vw, 1.5rem);
   grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
   @media (max-width: 1000px) {
      grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
   }
   @media (max-width: 550px) {
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
   }
   @media (max-width: 450px) {
      grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
   }
   //@media (max-width: 1208px) {
   //   grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
   //}
   //@media (max-width: 970px) {
   //   grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
   //}
   //@media (max-width: 790px) {
   //   grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
   //}
   //@media (max-width: 650px) {
   //   grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
   //}
}
</style>
