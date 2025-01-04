<template>
   <aside class="shop__aside aside-shop">
      <div class="aside-shop__search search-aside search-aside--mobile">
         <input :placeholder="searchTitle" v-model="filterData.prodTitle" class="search-aside__input" type="text" />
         <div class="search-aside__icon">
            <button @click="onSearchByTitle">
               <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
            </button>
         </div>
      </div>
      <button class="aside-shop__ico-btn" @click="shoFilters">
         <font-awesome-icon :icon="['fas', 'sliders']" />
         <span>{{ $t('buttons.filters') }}</span>
      </button>
      <div class="aside-shop__body">
         <div class="aside-shop__search search-aside search-aside--pc">
            <input :placeholder="searchTitle" v-model="filterData.prodTitle" class="search-aside__input" type="text" />
            <div class="search-aside__icon">
               <button @click="onSearchByTitle">
                  <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
               </button>
            </div>
         </div>
         <div class="aside-shop__selects selects-shop">
            <div class="selects-shop__select-block">
               <v-select
                  class="selects-shop__select"
                  clearable
                  v-model="filterData.materialId"
                  :label="materialTitle"
                  :items="materialList"
                  item-text="title"
                  item-value="id"
                  variant="outlined"
                  clear-icon="fa-solid fa-ban"
               >
               </v-select>
            </div>
            <div class="selects-shop__select-block">
               <v-select
                  class="selects-shop__select"
                  clearable
                  v-model="filterData.colorId"
                  :label="colorTitle"
                  :items="coloursList"
                  item-text="title"
                  item-value="id"
                  variant="outlined"
               ></v-select>
            </div>
         </div>
         <div class="aside-shop__price price-shop">
            <div class="price-shop__range">
               <v-range-slider v-model="filterData.priceArr" step="1" max="300" thumb-label="always"></v-range-slider>
            </div>
            <div class="price-shop__content">
               <span> Price: ${{ filterData.priceArr[0] }} - ${{ filterData.priceArr[1] }} </span>
               <button @click="filterByPrice">Filter</button>
            </div>
         </div>
         <div class="aside-shop__switches switches-shop">
            <div class="switches-shop__switch">
               <v-switch :label="switchSaleTitle" v-model="filterData.isOnSale"></v-switch>
            </div>
         </div>
         <button class="aside-shop__back button" @click="onBack">{{ $t('buttons.back') }}</button>
      </div>
   </aside>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useLocales } from '../../modulesHelpers/i18n'
import { useBallsStore } from '@/stores/balls'
import { useMaterialsStore } from '@/stores/materials'
import { useColoursStore } from '@/stores/colours'
import { and } from 'firebase/firestore/lite'
//materials=======
const materialsStore = useMaterialsStore()
const { getItemsList: materialList } = storeToRefs(materialsStore)
const { loadItemsList: loadMaterilas } = materialsStore
//colours=======
const coloursStore = useColoursStore()
const { getItemsList: coloursList } = storeToRefs(coloursStore)
const { loadItemsList: loadColours } = coloursStore
// balls===========
const { searchItemsByTitle, loadFilterList } = useBallsStore()
// constants===========
const switchValue = ref(false)
const filterData = reactive({
   prodTitle: null,
   priceArr: ref([0, 300]),
   materialId: null,
   colorId: null,
   isOnSale: false,
})
//==================
const { t } = useLocales()
const colorTitle = computed(() => {
   return t('filter.color')
})
const materialTitle = computed(() => {
   return t('filter.material')
})
const switchSaleTitle = computed(() => {
   return t('buttons.onSale')
})
const searchTitle = computed(() => {
   return t('placeholders.search')
})

watch(
   () => filterData.colorId,
   (newDataFilter) => {
      loadFilterList(filterData)
   },
)
watch(
   () => filterData.isOnSale,
   (newDataFilter) => {
      loadFilterList(filterData)
   },
)
watch(
   () => filterData.materialId,
   (newDataFilter) => {
      loadFilterList(filterData)
   },
)
watch(
   () => filterData.prodTitle,
   (newDataFilter) => {
      if (filterData.prodTitle == '') loadFilterList(filterData)
   },
)
function filterByPrice() {
   loadFilterList(filterData)
}
function onSearchByTitle() {
   loadFilterList(filterData)
}
function shoFilters() {
   let filterBody = document.querySelector('.aside-shop__body')
   if (filterBody) filterBody.classList.toggle('filter-open')
   document.body.classList.add('lock')
}
function onBack() {
   let filterBody = document.querySelector('.aside-shop__body')
   if (filterBody) filterBody.classList.remove('filter-open')
   document.body.classList.remove('lock')
}
onMounted(() => {
   loadMaterilas()
   loadColours()
})
</script>

<style lang="scss" scoped>
:deep() {
   .v-field__input {
      padding: clamp(0.625rem, 0.424rem + 0.64vw, 0.938rem) clamp(0.375rem, 0.134rem + 0.77vw, 0.75rem);
   }
   .v-field__clearable {
      overflow: hidden;
   }
   .v-field__clearable i {
      display: flex;
      align-items: center;
      justify-content: center;
      //position: relative;
      &::before {
         content: '+';
         flex: 0 0 30px;
         font-size: 30px;
         width: 305px;
         height: 30px;
         font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
         position: absolute;
         top: 50%;
         left: 50%;
         transform: translate(-50%, -50%) rotate(45deg);
      }
   }
   .price-shop {
      .v-input__control {
         min-height: 10px;
      }
      &__range {
         .v-slider-thumb__label {
            display: none;
         }
         .v-slider-thumb__surface {
            border-radius: 0;
            width: 2px;
            height: 10px;
         }
      }
      .v-slider-thumb__ripple {
         width: 18px;
         height: 18px;
         top: 50%;
         left: 50%;
         transform: translate(-50%, -50%);
      }
      .v-slider.v-input--horizontal .v-slider-thumb {
         inset-inline-start: calc(var(--v-slider-thumb-position) - var(--v-slider-thumb-size) / 30);
      }
   }
   .v-selection-control {
      flex-direction: row-reverse;
      align-items: center;
      justify-content: space-between;
   }
   .v-switch__track {
      background-color: #707070;
   }
   .v-selection-control--dirty .v-switch__track {
      background-color: #0c3e1a;
   }

   .v-input__details {
      min-height: 0;
   }
}
//=============================================================
.aside-shop {
   //position: relative;
   &__body {
      display: flex;
      flex-direction: column;
      gap: clamp(1.25rem, 0.487rem + 2.44vw, 2.438rem);
      @media (max-width: 767.98px) {
         border-radius: 10px;
         margin-bottom: 15px;
         transition: all 0.6s ease 0s;
         visibility: hidden;
         opacity: 0;
         position: fixed;
         z-index: 90;
         top: 0;
         left: -100%;
         right: -100%;
         overflow: auto;
         width: 95%;
         height: 100%;
         background-color: #fbfbfb;
         margin: 0 0px 0 0px;
         padding: 60px 15px 30px 15px;
         &.filter-open {
            visibility: visible;
            opacity: 1;
            left: 0;
         }
      }
   }
   // .aside-shop__search
   &__search {
   }
   // .aside-shop__selects
   &__selects {
   }
   // .aside-shop__price
   &__price {
   }
   // .aside-shop__switches
   &__switches {
   }
   // .aside-shop__ico-btn
   &__ico-btn {
      display: none;

      span {
         line-height: 166.666667%;
      }
      svg {
         font-size: 18px;
      }
      @media (max-width: 767.98px) {
         margin-bottom: 1.5rem;
         display: flex;
         align-items: center;
         gap: 0.5rem;

         color: #a18a68;
      }
   }
   &__back {
      border: 1px solid #000;
      display: none;
      @media (max-width: 767.98px) {
         display: block;
      }
   }
}
.search-aside {
   display: flex;
   align-items: center;
   justify-content: space-between;
   gap: 5px;
   padding-bottom: 0.625rem;
   border-bottom: 1px solid #d8d8d8;
   // .search-aside__input
   &__input {
      width: 1000px;
   }
   // .search-aside__icon
   &__icon {
      font-size: 19px;
      button {
         transition: all 0.3s ease 0s;
         @media (any-hover: hover) {
            &:hover {
               transform: rotate(10deg);
            }
         }
         @media (max-width: 767.98px) {
            font-size: 21px;
         }
      }
   }
   &--mobile {
      display: none;
      @media (max-width: 767.98px) {
         display: flex;
         margin-bottom: 20px;
      }
   }
   &--pc {
      @media (max-width: 767.98px) {
         display: none;
      }
   }
}
.selects-shop {
   // .selects-shop__select-block
   &__select-block {
      &:not(:last-child) {
         margin-bottom: 15px;
      }
   }
   // .selects-shop__select
   &__select {
      .v-select {
         max-width: 100%;
      }
   }
}
.price-shop {
   // .price-shop__range
   &__range {
      &:not(:last-child) {
         margin-bottom: 0.625rem;
      }
   }
   // .price-shop__content
   &__content {
      display: flex;
      align-items: center;
      gap: 0.625rem;
      justify-content: space-between;
      font-size: 14px;
      line-height: 157.142857%;
      span {
         color: #707070;
      }
      button {
         color: #a18a68;
      }
   }
}
.switches-shop {
   // .switches-shop__switch
   &__switch {
      color: #000;
   }
}
</style>
