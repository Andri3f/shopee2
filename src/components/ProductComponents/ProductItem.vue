<template>
   <div class="products__item product">
      <div @click="goToProd">
         <div class="product__image">
            <img :src="getImagePath(product.imgSrc)" alt="" />
            <div class="product__actions actions-product">
               <button class="actions-product__add-to-cart">
                  <font-awesome-icon :icon="['fas', 'cart-shopping']" />
               </button>
            </div>
         </div>
      </div>
      <div class="product__title small-title">{{ product.title }}</div>
      <div v-if="product.aldPrice" class="product__price-block">
         <div class="product__price-old">$ {{ getPrice(product.aldPrice) }}</div>
         <div class="product__price small-title small-title--smaller">$ {{ getPrice(product.price) }}</div>
      </div>
      <div v-else class="product__price-block">
         <div class="product__price small-title small-title--smaller">$ {{ getPrice(product.price) }}</div>
      </div>
      <div v-if="product.discount" class="product__info">
         <span>-%{{ product.discount }}</span>
      </div>
   </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { getPrice } from '@/localScript/functions/functions'
import { useCartStore } from '../../stores/cart'
import { useRouter } from 'vue-router'
const router = useRouter()
const { addToCart } = useCartStore()
const props = defineProps({
   product: {
      type: Object,
      required: true,
   },
})
const getImagePath = (imgPath) => new URL(`../../assets/img/products/${imgPath}`, import.meta.url).href

function goToProd(e) {
   if (e.target.tagName === 'DIV') {
      router.push({ name: 'product', params: { id: props.product.id } })
   } else if (e.target.tagName === 'svg' || e.target.tagName === 'path') addToCart(props.product.id, 1)
}
</script>

<style lang="scss" scoped>
.products {
   // .products__item
   &__item {
   }
}
.product {
   cursor: pointer;
   position: relative;
   // .product__image
   &__image {
      overflow: hidden;
      border-radius: 8px;
      //display: flex;
      position: relative;
      padding-bottom: 100%;
      &::before {
         content: '';
         position: absolute;
         top: 0;
         left: 0;
         z-index: 1;
         width: 100%;
         height: 100%;
         background-color: #fff;
         opacity: 0;
         transition: all 0.5s ease 0s;
      }
      @media (any-hover: hover) {
         &:hover {
            img {
               transform: scale(1.03);
            }
         }
      }
      img {
         transition: transform 0.3s ease 0s;
         position: absolute;
         width: 100%;
         height: 100%;
         top: 0;
         left: 0;
         object-fit: cover;
      }
      .actions-product {
         transition: all 0.3s ease 0s;
         font-size: clamp(1.3rem, 0.536rem + 1.29vw, 1.563rem);
         position: absolute;
         z-index: 5;
         top: 50%;
         padding: 5px;
         left: 50%;
         transform: translate(-50%, -50%);
         display: flex;
         gap: 30px;
         align-items: center;
         visibility: hidden;
         opacity: 0;
         &__add-to-cart {
            transition: all 0.2s ease 0s;

            @media (any-hover: hover) {
               &:hover {
                  color: #564949;
                  transform: scale(1.05);
               }
            }
         }
      }
      &:not(:last-child) {
         margin-bottom: clamp(0.375rem, -0.348rem + 2.31vw, 1.2rem);
      }
      @media (any-hover: hover) {
         &:hover {
            &::before {
               opacity: 0.5;
            }
            .actions-product {
               opacity: 1;
               visibility: visible;
            }
         }
      }
   }
   // .product__title
   &__title {
      &:not(:last-child) {
         margin-bottom: clamp(0.25rem, -0.232rem + 1.54vw, 0.8rem);
      }
   }
   &__price-block {
      &:not(:last-child) {
         margin-bottom: 5px;
      }
      display: flex;
      align-items: center;
      gap: 10px;
   }
   &__price-old {
      color: red;
      text-decoration: line-through;
   }
   // .product__price
   &__price {
      color: #a18a68;
      font-weight: 500;
   }
   &__info {
      //font-size: ;
      //overflow: hidden;

      color: #fff;
      position: absolute;
      left: 5.5px;
      top: 5.5px;
      display: grid;
      gap: 5px;
      @media (max-width: 767.98px) {
         font-size: 14px;
      }
      span {
         border-radius: 4px;
         background-color: #a18a68;
         padding: 4px 8px;
         @media (max-width: 767.98px) {
            padding: 3px 6px;
         }
      }
   }
}
</style>
