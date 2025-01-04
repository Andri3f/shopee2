<template>
   <main-master-page>
      <section class="prod-page">
         <product-page-product v-if="item && item.value" :product="item" />
         <product-tabs v-if="item && item.value" :product="item"></product-tabs>
      </section>
   </main-master-page>
</template>

<script setup>
import { onBeforeMount, reactive, ref } from 'vue'
import MainMasterPage from '../masterPages/MainMasterPage.vue'
import { useBallsStore } from '../stores/balls'
import { useGeneralStore } from '../stores/general'
import ProductPageProduct from '../components/PageProduct/ProductPageProduct.vue'
import ProductTabs from '../components/PageProduct/ProductTabs.vue'
import router from '@/router'
const props = defineProps({
   id: {
      type: String,
   },
})
//===

const ballsStore = useBallsStore()
const { getItemByIdentifier } = ballsStore

const item = reactive({})
onBeforeMount(async () => {
   if (props.id) {
      const result = await getItemByIdentifier(props.id)
      if (Object.keys(result).length !== 0) {
         item.value = { ...result, id: props.id }
      } else {
         console.log('error')
         router.push({ name: 'notFound' })
      }
   }
})
</script>

<style lang="scss" scoped></style>
