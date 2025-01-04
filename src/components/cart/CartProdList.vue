<template>
   <div class="cart-list">
      <div class="cart-list__item item-cart" v-for="product in getProductsFromCatr" :key="product.id">
         <div class="item-cart__image">
            <img :src="getImagePath(product.imgSrc)" alt="" />
         </div>
         <div class="item-cart__body">
            <div class="item-cart__content">
               <div class="item-cart__title">{{ product.title }}</div>
               <div class="item-cart__material-and-color">
                  {{ getMaterialAndColor(product.color, product.material) }}
               </div>
               <div class="item-cart__price">$ {{ getPrice(product.price) }}</div>
            </div>
            <div class="item-cart__counter">
               <counter :count="product.count" @changeCount="cahangeProdCount(product.id, $event)" />
            </div>
         </div>
         <button class="item-cart__delete" @click="deleteProdFromCart(product.id)">+</button>
      </div>
   </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cart'
import { useColoursStore } from '@/stores/colours'
import { getPrice } from '@/localScript/functions/functions'
import { computed, onBeforeMount, onMounted, reactive, ref } from 'vue'
import { useMaterialsStore } from '@/stores/materials'
import Counter from '@/components/buttons/Counter.vue'

//====
import { useUsersStore } from '../../stores/users'
const usersStore = useUsersStore()
const { updateUser } = usersStore
//====
const materialStore = useMaterialsStore()
const cartStore = useCartStore()
const coloursStore = useColoursStore()
const { getItemById: getMaterialById, loadItemsList: loadMaterials } = materialStore
const { getItemsList: materialsLiat } = storeToRefs(materialStore)
const { cahangeProdCount, deleteProdFromCart } = cartStore
const { getItemById: getColorById, loadItemsList: loadColors } = coloursStore
const { getItemsList: colorsList } = storeToRefs(coloursStore)

defineProps({
   getProductsFromCatr: {
      type: Array,
      default: () => [],
   },
})

function getMaterialAndColor(colorId, materialId) {
   const color = getColorById(colorId)?.title || null
   const material = getMaterialById(materialId)?.title || null
   return `${color} / ${material}`
}

function getImagePath(path) {
   return new URL(`../../assets/img/products/${path}`, import.meta.url).href
}
</script>

<style lang="scss" scoped>
.cart-list {
   // .cart-list__item
   &__item {
   }
}
.item-cart {
   @media (min-width: 767.98px) {
      padding-bottom: clamp(1.375rem, -0.131rem + 3.137vw, 2.375rem);
      border-bottom: 1px solid #d8d8d8;
   }
   color: #707070;
   //display: flex;
   //display: grid;
   //grid-template-columns: 1fr auto auto auto;
   display: flex;
   //justify-content: space-between;
   gap: 10px;
   align-items: start;
   gap: clamp(1.25rem, -0.632rem + 2.921vw, 2.5rem);

   &:not(:last-child) {
      margin-bottom: clamp(1.375rem, -0.131rem + 3.137vw, 2.375rem);
   }
   // .item-cart__image
   &__image {
      border-radius: 4px;
      img {
         width: 8.5rem;
         height: 8.5rem;
         //max-width: 100%;
      }
   }
   &__body {
      flex: 1 1 auto;
      display: grid;
      grid-template-columns: 1fr auto;
      gap: clamp(0.625rem, -0.316rem + 1.961vw, 1.25rem);
      @media (max-width: 982px) {
         grid-template-columns: auto;
      }
   }
   // .item-cart__content
   // .item-cart__title
   &__title {
      color: #000;
      font-size: clamp(0.75rem, 0.308rem + 1.18vw, 1.25rem);
      line-height: 130%; /* 26/20 */
      &:not(:last-child) {
         margin-bottom: clamp(0.28rem, -0.221rem + 1.372vw, 0.875rem);
      }
   }
   // .item-cart__material-and-color
   &__material-and-color {
      font-size: clamp(0.75rem, 0.529rem + 0.59vw, 1rem);
      line-height: 168.75%; /* 27/16 */
      &:not(:last-child) {
         margin-bottom: 2;
      }
   }
   // .item-cart__price
   &__price {
      font-size: clamp(0.75rem, 0.529rem + 0.59vw, 1rem);

      color: #a18a68;
      line-height: 168.75%; /* 27/16 */
   }
   &__counter {
      @media (max-width: 982px) {
         .counter {
            padding: 8px;
         }
      }
      @media (max-width: 767.98px) {
         .counter {
            max-width: 250px;
         }
      }
   }
   &__delete {
      transform: rotate(45deg);
      color: #000;
      font-size: 22px;
   }
}
.actions-cart {
   display: flex;
   align-items: start;
   gap: clamp(1.25rem, -1.762rem + 6.274vw, 3.25rem);
   // .actions-cart__counter
   &__counter {
      //max-width: 6.375rem;
   }
   // .actions-cart__delte
}
</style>
