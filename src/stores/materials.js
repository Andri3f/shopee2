import { defineStore } from 'pinia'
import getStoreTemplate from './helpers/storeTemplate'
import { useGeneralStore } from './general'

export const useMaterialsStore = defineStore('materials', () => {
   const generalStore = useGeneralStore()
   const { generalApiOperation } = generalStore

   return getStoreTemplate('materials', generalApiOperation)
})
