<template>
   <header class="header">
      <div class="header__container">
         <router-link class="header__logo" :to="{ name: 'home' }" @click="closeMenu">
            <img src="@/assets/img/main-logo.svg" alt="" />
         </router-link>
         <div class="header__right-side">
            <div class="header__menu menu">
               <nav class="menu__body">
                  <router-link class="menu__body-item" :to="{ name: 'shop' }" @click="closeMenu">{{
                     $t('header.shop')
                  }}</router-link>

                  <router-link class="menu__body-item" :to="{ name: 'storyPage' }" @click="closeMenu">{{
                     $t('header.story')
                  }}</router-link>
                  <router-link
                     :to="{ name: 'userPage' }"
                     class="header-actions__item header-actions__item--login-mb"
                     @click="closeMenu"
                  >
                     <font-awesome-icon :icon="['far', 'user']" />
                  </router-link>
               </nav>
            </div>
            <div class="header__rigth-side-decore"></div>
            <div class="header__actions header-actions">
               <div class="header-actions__locales locales-block">
                  <button :class="{ selected: locale == 'en' }" @click="setLocale('en')" class="locales-block__btn">
                     en
                  </button>
                  <div class="locales-block__decore"></div>
                  <button :class="{ selected: locale == 'ua' }" @click="setLocale('ua')" class="locales-block__btn">
                     ua
                  </button>
               </div>
               <button class="header-actions__item header-actions__item--cart" @click="openCart">
                  <div class="header-actions__cart-icon">
                     <font-awesome-icon :icon="['fas', 'cart-shopping']" />
                  </div>
                  <div class="header-actions__cart-count" v-if="getCartProdCount >= 1">{{ getCartProdCount }}</div>
               </button>
               <router-link :to="{ name: 'userPage' }" class="header-actions__item header-actions__item--login-pc">
                  <font-awesome-icon :icon="['far', 'user']" />
               </router-link>
            </div>
            <button type="button" class="icon-menu" @click="onBurger"><span></span></button>
         </div>
      </div>
      <div class="cart-side" :class="{ 'cart-open': isOpenCart }">
         <side-cart @close-cart="openCart"></side-cart>
      </div>
   </header>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import router from '@/router'
import { ref, defineEmits } from 'vue'
import { RouterLink } from 'vue-router'
import { useLocales } from '../../modulesHelpers/i18n'
import { useCartStore } from '../../stores/cart'
defineEmits(['onLock'])
const { getCartProdCount } = storeToRefs(useCartStore())
import SideCart from './SideCart.vue'
const { setLocale, locale } = useLocales()
function closeMenu() {
   if (document.body.classList.contains('menu-open')) {
      document.body.classList.remove('menu-open')
      document.documentElement.classList.remove('lock')
   }
}

const isOpenCart = ref(false)
function onBurger() {
   document.body.classList.toggle('menu-open')
   document.documentElement.classList.toggle('lock')
}
function openCart() {
   document.documentElement.classList.toggle('lock')
   isOpenCart.value = !isOpenCart.value
}

document.addEventListener('click', (e) => {
   const cartSide = document.querySelector('.cart-side')
   const deleteButton = e.target.closest('.item-side-prod__delete')
   if (
      isOpenCart.value &&
      !cartSide.contains(e.target) &&
      !e.target.closest('.header-actions__item--cart') &&
      !deleteButton
   ) {
      isOpenCart.value = false
      document.documentElement.classList.remove('lock')
   }
})
</script>

<style lang="scss" scoped>
.cart-side {
   position: fixed;
   top: 0;
   transition: all 0.9s ease;
   overflow: auto;
   border: 1px solid #d8d8d8;
   z-index: 100;
   right: -100%;
   height: 100%;
   background-color: #fff;
   padding: clamp(2rem, -2.081rem + 8.251vw, 4.5rem) clamp(1rem, -0.884rem + 3.929vw, 2.25rem) 0
      clamp(1rem, -0.884rem + 3.929vw, 2.25rem);
   width: 360px;
   @media (max-width: 600px) {
      width: 100%;
      transition: all 0.5s ease;
   }
   &.cart-open {
      right: 0;
      transition: all 0.5s ease;
   }
}
.selected {
   transition: opacity 0.3s ease 0s;
   opacity: 0.8;
}
.header {
   background-color: #fff;
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   z-index: 50;
   // .header__conatiner
   &__container {
      min-height: 2.625rem;
      padding: 0.4375rem 15px;
      display: grid;
      align-items: center;
      gap: 10px;
      grid-template-columns: 1fr auto;
   }
   // .header__logo
   &__logo {
      position: relative;
      z-index: 70;
      img {
         max-width: clamp(5rem, 0.809rem + 11.35vw, 9.875rem);
      }
   }
   // .header__right-side
   &__right-side {
      display: flex;
      align-items: center;
      gap: clamp(2.1rem, -1.377rem + 5.48vw, 3rem);
   }
   &__rigth-side-decore {
      height: 17px;
      background-color: #000;
      width: 0.0625rem;
      @media (max-width: 767.98px) {
         display: none;
      }
   }
}

.menu {
   // .menu__body
   &__body {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      column-gap: clamp(0.625rem, -0.502rem + 5.64vw, 4rem);
      row-gap: 5px;
      line-height: 168.75%; /* 27/16 */

      @media (max-width: 767.98px) {
         position: fixed;
         z-index: 3;
         flex-direction: column;
         transition: all 0.5s ease 0s;
         flex-wrap: nowrap;
         row-gap: 30px;
         width: 100%;
         height: 100%;
         top: 0;
         right: 100%;
         padding: 120px 20px 30px 20px;
         background-color: #dbdadaa6;
         font-size: 27px;
         overflow: auto;
      }
      &::before {
         content: '';
         position: fixed;
         transition: right 0.5s ease 0s;
         z-index: 11;
         top: 0;
         right: 100%;
         width: 100%;
         height: 2.625rem;
         background-color: #dbdada;
      }
      .menu-open & {
         right: 0;
         top: 0;
         &::before {
            right: 0;
         }
      }
   }
   &__body-item {
      position: relative;
      &::after {
         content: '';
         transition: width 0.3s ease 0s;
         position: absolute;
         left: 0;
         bottom: 0;
         background-color: #000;
         width: 0;
         height: 2px;
      }
      @media (any-hover: hover) {
         padding: 3px 0;
         &:hover::after {
            width: 100%;
         }
      }
      @media (max-width: 767.98px) {
         //font-size: 40px;
      }
   }
}
.header-actions {
   font-size: 19px;
   display: flex;
   align-items: center;
   gap: clamp(0.9rem, -2.096rem + 5.68vw, 2.438rem);
   &__item {
      transition: all 0.3s ease 0s;
      cursor: pointer;
      @media (any-hover: hover) {
         &:hover {
            color: #606060;
         }
      }
      &--search {
         overflow: hidden;
         display: flex;
         position: relative;
         align-items: center;
         input {
            padding: 0 5px 0 25px;
            outline: none;
            transition: all 0.5s ease 0s;
            border: 1px solid transparent;
            border-radius: 10px;
            width: 0;
         }
         div {
            position: absolute;
            left: 5px;
         }
         @media (max-width: 767.98px) {
            display: none;
         }
      }
      &--search.search {
         input {
            border: 1px solid #000;
            width: 170px;
         }
      }
      &--login-pc {
         @media (max-width: 767.98px) {
            display: none;
         }
      }
      &--login-mb {
         @media (min-width: 767.98px) {
            display: none;
         }
      }
      &--cart {
         position: relative;
         z-index: 1;
      }
   }
   &__cart-icon {
      position: relative;
      z-index: 1;
   }
   &__cart-count {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      z-index: 3;
      background-color: #fff;
      top: -40%;
      right: -40%;
      border: 1px solid #00000093;
      border-radius: 50%;
      font-size: 12px;
      width: 15px;
      height: 15px;
   }
}

.locales-block {
   display: flex;
   align-items: center;
   gap: 5px;
   &__decore {
      width: 1px;
      height: 16px;
      background-color: #000;
   }
}

// Burger========================

.icon-menu {
   display: none;
   @media (max-width: 767.98px) {
      display: block;
      position: relative;
      width: 20px;
      height: 18px;
      z-index: 70;
      @media (any-hover: none) {
         cursor: default;
      }
      span,
      &::before,
      &::after {
         content: '';
         transition: all 0.3s ease 0s;
         right: 0;
         position: absolute;
         width: 100%;
         height: 2px;
         background-color: #000;
      }
      &::before {
         top: 0;
      }
      &::after {
         width: 69%;
         bottom: 0;
      }
      span {
         top: 50%;
         transform: translate(0, -50%);
      }
   }
   .menu-open & {
      span {
         width: 0;
      }
      &::before,
      &::after {
      }
      &::before {
         top: 50%;
         transform: rotate(-45deg) translate(0, -50%);
      }
      &::after {
         bottom: 50%;
         width: 100%;
         transform: rotate(45deg) translate(0, 50%);
      }
   }
}
</style>
