import DbOperations from './DbOperations'

import { ref, computed } from 'vue'

export default function getStoreTemplate(collectionTitle, generalApiOperation) {
   const collectionDB = new DbOperations(collectionTitle)

   const itemsList = ref(null)
   const currentItem = ref(null)

   async function loadItemsList() {
      itemsList.value = await generalApiOperation({
         operation: () => collectionDB.loadItemsList(),
      })
   }
   async function loadFilterList(filterData) {
      itemsList.value = await generalApiOperation({
         operation: () => collectionDB.loadFilteredList(filterData),
      })
   }

   async function loadItemById(itemId) {
      currentItem.value = await generalApiOperation({
         operation: () => collectionDB.getItemById(itemId),
      })
      return currentItem.value
   }

   async function loadDocumentsFromIdsList(idsList) {
      itemsList.value = await generalApiOperation({
         operation: () => collectionDB.loadDocumentsFromIdsList(idsList),
      })
      return itemsList.value
   }

   async function addItem(itemData) {
      currentItem.value = await generalApiOperation({
         operation: () => collectionDB.addItem(itemData),
      })
   }

   async function addItemToArray(id, arrayProperty, itemData) {
      currentItem.value = await generalApiOperation({
         operation: () => collectionDB.addItemToArray(id, arrayProperty, itemData),
      })
   }

   async function getItemByIdentifier(id) {
      if (!itemsList.value) await loadItemsList()

      return getItemsList.value.find((item) => item.id == id)
   }

   function getItemById(id) {
      return getItemsList.value.find((item) => item.id == id)
   }

   async function removeItemFromArray(id, arrayProperty, itemData) {
      currentItem.value = await generalApiOperation({
         operation: () => collectionDB.removeItemFromArray(id, arrayProperty, itemData),
      })
   }

   async function addItemWithCustomId({ id, data }) {
      const item = { orders: [data] }
      currentItem.value = await generalApiOperation({
         operation: () => collectionDB.addItemWithCustomId(id, item),
      })
   }

   async function updateItem(id, data) {
      currentItem.value = await generalApiOperation({
         operation: () => collectionDB.updateItem(id, data),
      })
   }

   async function deleteItem(itemId) {
      await generalApiOperation({
         operation: () => collectionDB.deleteItem(itemId),
      })
      itemsList.value = itemsList.value.filter((item) => item.id !== itemId)
   }

   const getItemsList = computed(() => {
      if (!itemsList.value) {
         loadItemsList()
      }
      return itemsList.value ?? []
   })
   const getCurrentItem = computed(() => currentItem.value)

   return {
      loadItemsList,
      addItem,
      addItemWithCustomId,
      addItemToArray,
      removeItemFromArray,
      updateItem,
      deleteItem,
      getItemsList,
      loadItemById,
      getCurrentItem,
      loadDocumentsFromIdsList,
      loadFilterList,
      getItemByIdentifier,
      getItemById,
   }
}
