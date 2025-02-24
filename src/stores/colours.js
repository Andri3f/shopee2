import { defineStore } from 'pinia'
import getStoreTemplate from './helpers/storeTemplate'
import { useGeneralStore } from './general'

export const useColoursStore = defineStore('colours', () => {
   const generalStore = useGeneralStore()
   const { generalApiOperation } = generalStore

   return getStoreTemplate('colours', generalApiOperation)
})
