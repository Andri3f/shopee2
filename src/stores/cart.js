import { defineStore, storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useBallsStore } from './balls'
export const useCartStore = defineStore('cart', () => {
   const cartProdList = ref([])

   function deleteProdFromCart(id) {
      cartProdList.value = cartProdList.value.filter((item) => item.prodId != id)
      localStorage.setItem('userCartData', JSON.stringify(cartProdList.value))
   }

   const getProductsFromCatr = computed(() => {
      const ballsStore = useBallsStore()
      const { getItemById: getProdById, loadItemsList: loadBalls } = ballsStore
      const { getItemsList } = storeToRefs(ballsStore)
      if (getItemsList.length === 0) {
         loadBalls()
      }

      return cartProdList.value.map((item) => {
         let itemProd = { ...getItemsList.value.find((prodItem) => prodItem.id == item.prodId), count: item.count }
         return itemProd
      })
   })
   const getCartProdCount = computed(() => {
      return cartProdList.value.length
   })
   function cahangeProdCount(id, count) {
      let index = cartProdList.value.findIndex((item) => item.prodId == id)
      let newCount = cartProdList.value[index].count + count
      if (newCount >= 1) cartProdList.value[index].count = newCount
      localStorage.setItem('userCartData', JSON.stringify(cartProdList.value))
   }
   function setCartFromUserData(list) {
      cartProdList.value = list
   }
   function addToCart(id, count) {
      for (const prod of cartProdList.value) {
         if (prod.prodId == id) return
      }
      cartProdList.value.push({ prodId: id, count })
      let usercartData = JSON.parse(localStorage.getItem('userCartData'))
      if (!Array.isArray(usercartData)) {
         usercartData = [] // Якщо usercartData не є масивом, створюємо новий
      }
      usercartData.push({ prodId: id, count })
      localStorage.setItem('userCartData', JSON.stringify(usercartData))
   }

   const getTotalPrice = computed(() => {
      return getProductsFromCatr.value.reduce((prevSum, product) => prevSum + product.price * product.count, 0)
   })
   return {
      cartProdList,
      deleteProdFromCart,
      cahangeProdCount,
      addToCart,
      getProductsFromCatr,
      getCartProdCount,
      getTotalPrice,
      setCartFromUserData,
   }
})
