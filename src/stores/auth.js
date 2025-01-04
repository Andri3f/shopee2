import { ref, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useGeneralStore } from './general'
import { useUsersStore } from './users'
import { useCartStore } from './cart'
import authOperations from './helpers/GoogleAuthOperations.js'

export const useAuthStore = defineStore('auth', () => {
   const generalStore = useGeneralStore()
   const usersStore = useUsersStore()
   const cartStore = useCartStore()
   const { cartProdList } = storeToRefs(cartStore)
   const { generalApiOperation } = generalStore

   const user = ref(null)

   const getUser = computed(() => user.value)

   async function signUpWithWithEmailAndPassword(email, password) {
      generalApiOperation({
         operation: () => authOperations.signUpWithWithEmailAndPassword({ email, password }),
      }).then(async (res) => {
         user.value = res
         if (res) {
            user.value = res
            await usersStore.addUserWithCustomId({
               id: user?.value?.uid,
               data: {
                  email,
                  permissions: {
                     create: false,
                     read: true,
                     update: false,
                     delete: false,
                  },
               },
            })
            setUserIdToLocalStorage(user.value.uid)
         } else {
            console.error('Sign-up failed. Response is undefined.')
         }
      })
   }

   function setUserIdToLocalStorage(id) {
      localStorage.setItem('userId', id)
   }

   async function signInWithWithEmailAndPassword(email, password) {
      return new Promise((resolve, reject) => {
         generalApiOperation({
            operation: () => authOperations.signInWithWithEmailAndPassword({ email, password }),
         })
            .then((res) => {
               user.value = res
               usersStore
                  .loadUserById(user.value.uid)
                  .then(() => {
                     setUserIdToLocalStorage(user.value.uid)
                     resolve(res)
                  })
                  .catch((error) => reject(error))
            })
            .catch((error) => {
               reject(error)
            })
      })
   }

   //=============================
   async function resetPass(email) {
      if (email) await authOperations.resetPassword(email)
   }
   //=============================
   function loginWithGoogleAccount() {
      return new Promise((resolve, reject) => {
         generalApiOperation({
            operation: () => authOperations.loginWithGoogleAccountPopup(),
         })
            .then((res) => {
               user.value = res

               usersStore
                  .addUserWithCustomId({
                     id: user?.value?.uid,
                     data: {
                        email: user?.value?.email,
                        permissions: {
                           create: false,
                           read: true,
                           update: false,
                           delete: true,
                        },
                     },
                  })
                  .then(() => {
                     usersStore.loadUserById(user.value.uid).then(() => {
                        resolve(res)
                     })
                  })
            })
            .catch((error) => reject(error))
      })
   }

   function logOut() {
      generalApiOperation({
         operation: () => authOperations.logout(),
      })
      usersStore.currentUser = null
   }

   async function getAuthData() {
      return user.value
   }

   return {
      signUpWithWithEmailAndPassword,
      signInWithWithEmailAndPassword,
      loginWithGoogleAccount,
      logOut,
      getUser,
      getAuthData,
      resetPass,
   }
})
