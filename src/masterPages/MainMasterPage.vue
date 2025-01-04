<template>
   <div class="wrapper">
      <header-block ref="header" v-if="!isLoading" />
      <main class="main">
         <loading-page v-if="isLoading" />
         <error-page v-else-if="hasError" />
         <template v-if="!hasError">
            <slot></slot>
         </template>
         <div class="message" :style="{ top: headerHeight + 'px' }">
            <slot name="mesaage"></slot>
         </div>
      </main>
      <footer-block />
   </div>
</template>

<script setup>
import HeaderBlock from '../components/header/HeaderBlock.vue'
import FooterBlock from '../components/footer/FooterBlock.vue'
import LoadingPage from '../components/loading/LoadingPage.vue'
import ErrorPage from '../components/error/ErrorPage.vue'
import { useGeneralStore } from '../stores/general'
import { storeToRefs } from 'pinia'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useUsersStore } from '../stores/users'
import { useCartStore } from '../stores/cart'
const { setCartFromUserData } = useCartStore()
const { loadUserById } = useUsersStore()
const generalStore = useGeneralStore()
const { isLoading, hasError } = storeToRefs(generalStore)
const header = ref(null)
const headerHeight = ref(0)
onMounted(() => {
   let prodList = JSON.parse(localStorage.getItem('userCartData'))
   if (Array.isArray(prodList)) {
      setCartFromUserData([...prodList])
   }
   let userId = localStorage.getItem('userId')
   if (userId) {
      loadUserById(userId)
   }
   updateHeaderHeight()
   window.addEventListener('resize', updateHeaderHeight)
})
const updateHeaderHeight = () => {
   headerHeight.value = header.value ? header.value.$el.clientHeight : 0
}

watch(header, () => {
   updateHeaderHeight()
})

onUnmounted(() => {
   window.removeEventListener('resize', updateHeaderHeight)
})
</script>

<style lang="scss" scoped>
.message {
   width: 100%;
   min-height: 50px;
   position: fixed;
   text-align: center;
   display: flex;
   align-items: center;
   font-size: clamp(0.875rem, 0.687rem + 0.392vw, 1rem);
}
</style>
