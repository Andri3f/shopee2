<template>
   <div class="prod-page__tabs product-tabs">
      <v-tabs v-model="tab" class="product-tabs__menu">
         <v-tab value="one" class="product-tabs__btn">{{ $t('buttons.description') }}</v-tab>
         <v-tab value="two" class="product-tabs__btn">{{ $t('buttons.aditionalInformation') }}</v-tab>
      </v-tabs>
      <v-card-text class="product-tabs__content">
         <v-window v-model="tab" class="product-tabs__box">
            <v-window-item value="one" class="product-tabs__item">
               <div class="product-tab">
                  <div class="product-tab__text">
                     <p>{{ product.value.descriptionBottom }}</p>
                  </div>
               </div>
            </v-window-item>
            <v-window-item value="two" class="product-tabs__item">
               <div class="product-tab">
                  <div class="product-tab__info info-tab">
                     <div class="info-tab__item">
                        <div class="info-tab__title">Weight:</div>
                        <div class="info-tab__info">{{ product.value.weight }} kg</div>
                     </div>
                     <div class="info-tab__item">
                        <div class="info-tab__title">Demitrition:</div>
                        <div class="info-tab__info">{{ getDimentions }}</div>
                     </div>
                     <div class="info-tab__item">
                        <div class="info-tab__title">Colours:</div>
                        <div class="info-tab__info">
                           {{ colourToShow.title }}
                        </div>
                     </div>
                     <div class="info-tab__item">
                        <div class="info-tab__title">Material:</div>
                        <div class="info-tab__info">
                           {{ materialToShow.title }}
                        </div>
                     </div>
                  </div>
               </div>
            </v-window-item>
         </v-window>
      </v-card-text>
   </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useColoursStore } from '../../stores/colours'
import { useMaterialsStore } from '../../stores/materials'
const { loadItemById: getColorById } = useColoursStore()
const { getItemByIdentifier: getMaterialById } = useMaterialsStore()
const props = defineProps({
   product: {
      type: Object,
   },
})
const tab = ref(null)
const getDimentions = computed(() => {
   const dimentions = props.product.value.dimentions
   return `${dimentions[0]} x ${dimentions[1]} x ${dimentions[2]} cm`
})
let colourToShow = ref('')
let materialToShow = ref(null)
const loadData = async () => {
   materialToShow.value = await getMaterialById(props.product.value.material)
   colourToShow.value = await getColorById(props.product.value.color)
}
onMounted(() => {
   loadData()
})
</script>

<style lang="scss" scoped>
:deep() {
   .v-slide-group__content {
      height: auto;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      //padding: 20px 0;
      gap: clamp(2.5rem, -0.597rem + 8.26vw, 6rem);
      @media (max-width: 767.98px) {
         flex-direction: column;
         align-items: start;
         gap: 10px;
      }
   }
   .v-slide-group {
      height: auto;

      &__content {
         position: relative;
         flex: 1 1 auto;
         @media (min-width: 767.98px) {
            &::before {
               content: '';
               position: absolute;
               z-index: 1;
               bottom: 0;
               left: 0;
               width: 100%;
               height: 2px;
               background-color: #d8d8d8;
            }
         }
      }
   }
   .prod-page {
      // .prod-page__tabs
      &__tabs {
      }
   }
   .product-tabs {
      // .product-tabs__menu
      &__menu {
      }
      // .product-tabs__btn
      &__btn.v-btn {
         transition: color 0.3s ease 0s;

         color: #707070;
         position: relative;
         height: auto;
         padding: 0;
         min-width: 0;
         background-color: #fff;
         .v-btn__overlay {
            background-color: #fff;
         }
         .v-ripple__container {
            display: none;
         }
         .v-btn__content {
            font-size: clamp(1rem, 0.889rem + 0.295vw, 1.125rem);
            padding: 20px 0;
            @media (max-width: 767.98px) {
               padding: 5px 0;
            }
            white-space: normal;
            text-align: left;
         }
         .v-tab__slider {
            z-index: 3;
            @media (max-width: 767.98px) {
               display: none;
            }
         }
         border-bottom: 1px solid #000;
      }
      &__btn.v-btn.v-slide-group-item--active {
         color: #000;
      }

      // .product-tabs__content
      &__content {
      }
      // .product-tabs__box
      &__box {
      }
      // .product-tabs__item
      &__item {
      }
   }
   .v-card-text {
      padding: 0;
      padding-top: 30px;
   }
}

.info-tab {
   display: grid;
   gap: 10px;
   // .info-tab__item
   &__item {
      display: flex;
      gap: 8px;
   }
   // .info-tab__title
   &__title {
      color: #000;
   }
   // .info-tab__info
   &__info {
      color: #707070;
   }
}

.product-tab__text {
   color: #707070;
   line-height: 168.75%; /* 27/16 */
}
</style>
