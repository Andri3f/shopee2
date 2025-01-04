import { defineStore } from 'pinia'
import getStoreTemplate from './helpers/storeTemplate'
import { useGeneralStore } from './general'

export const useBallsStore = defineStore('ballsList', () => {
   const generalStore = useGeneralStore()
   const { generalApiOperation } = generalStore

   return getStoreTemplate('ballsList', generalApiOperation)
})
