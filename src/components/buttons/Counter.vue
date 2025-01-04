<template>
   <div class="counter">
      <button class="counter__btn" @click="changeCount(-1)">-</button>
      <span class="counter__count">{{ prodCount }}</span>
      <button class="counter__btn" @click="changeCount(1)">+</button>
   </div>
</template>
<script setup>
import { computed, defineProps, defineEmits } from 'vue'

const emit = defineEmits(['update:count', 'changeCount'])
const props = defineProps({
   count: {
      type: Number,
   },
})

const prodCount = computed({
   get() {
      return props.count
   },
   set(value) {
      emit('update:count', value)
   },
})
function changeCount(val) {
   if (prodCount.value + val >= 1) prodCount.value += val
   emit('changeCount', val)
}
</script>

<style lang="scss" scoped>
.counter {
   color: #707070;
   line-height: 168.75%; /* 27/16 */
   padding: 14px 11px;
   display: flex;
   align-items: center;
   justify-content: center;
   gap: 20px;
   background-color: #efefef;
   border-radius: 4px;
   @media (max-width: 450px) {
      width: 100%;
      justify-content: center;
   }

   // .main-prod-actions__btn
   &__btn {
      padding-left: 5px;
      padding-right: 5px;
      @media (max-width: 767.98px) {
         font-size: 19px;
      }
   }
   // .main-prod-actions__count
   &__count {
      display: block;
      max-width: 5px;
   }
}
</style>
