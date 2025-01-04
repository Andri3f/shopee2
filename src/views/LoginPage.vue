<template>
   <main-master-page>
      <section class="login-page">
         <div class="login-page__box">
            <h2 class="login-page__title title">{{ $t('login.title') }}</h2>
            <div class="login-page__tabs">
               <v-tabs v-model="tab">
                  <v-tab value="login">{{ $t('login.signIn') }}</v-tab>
                  <v-tab value="register">{{ $t('login.register') }}</v-tab>
               </v-tabs>
            </div>
            <div class="login-page__content">
               <keep-alive>
                  <v-window v-model="tab">
                     <form class="content-login">
                        <div class="content-login__inputs">
                           <div class="content-login__item">
                              <div class="content-login__input">
                                 <input
                                    placeholder="Email"
                                    v-model="userLogData.email"
                                    type="email"
                                    autocomplete="current-password"
                                    required
                                 />
                              </div>
                           </div>
                           <div class="content-login__item content-login__item--password">
                              <div class="content-login__input">
                                 <input
                                    v-model="userLogData.passOne"
                                    ref="passOne"
                                    placeholder="Password"
                                    type="password"
                                    autocomplete="current-password"
                                    required
                                 />
                              </div>
                              <button
                                 type="button"
                                 class="content-login__eye"
                                 :class="{ hiden: !isPassOne }"
                                 @click="showPassOne"
                              >
                                 <font-awesome-icon :icon="['far', 'eye']" />
                              </button>
                           </div>
                           <div v-if="tab == 'register'" class="content-login__item content-login__item--password">
                              <div class="content-login__input">
                                 <input
                                    v-model="userLogData.passTwo"
                                    ref="passTwo"
                                    placeholder="Same Password"
                                    type="password"
                                    autocomplete="second-password"
                                    required
                                 />
                              </div>
                              <button
                                 type="button"
                                 class="content-login__eye"
                                 :class="{ hiden: !isPassTwo }"
                                 @click="showPassTwo"
                              >
                                 <font-awesome-icon :icon="['far', 'eye']" />
                              </button>
                           </div>
                           <div v-if="errMessage" class="content-login__error proplem-message">{{ errMessage }}</div>
                        </div>

                        <button class="content-login__reset-pass" v-if="tab === 'login'" @click="onResetPass">
                           {{ $t('login.resetPass') }}
                        </button>
                        <button type="button" class="content-login__button button" @click="formAction">
                           {{ getButtonTitle }}
                        </button>
                     </form>
                  </v-window>
               </keep-alive>
            </div>
         </div>
      </section>
      <template #mesaage>
         <div class="message__box" :class="{ 'message-visable': messageToUser }">
            <div class="mesaage__container">
               {{ messageToUser }}
            </div>
         </div>
      </template>
   </main-master-page>
</template>

<script setup>
import router from '@/router'
import { computed, reactive, ref } from 'vue'
import MainMasterPage from '../masterPages/MainMasterPage.vue'
import { useLocales } from '../modulesHelpers/i18n'
import { useAuthStore } from '../stores/auth'
const authStore = useAuthStore()
const { signUpWithWithEmailAndPassword, signInWithWithEmailAndPassword, resetPass } = authStore
const { t } = useLocales()
const passPlaceHolders = ['Password', 'Same password']
const messageToUser = ref(null)
const tab = ref(null)
const passOne = ref(null)
const isPassOne = ref(false)
const passTwo = ref(null)
const isPassTwo = ref(false)
const userLogData = reactive({})
const errMessage = ref(null)

const getButtonTitle = computed(() => {
   return tab.value === 'login' ? t('login.signIn') : t('login.register')
})

function showPassOne() {
   isPassOne.value = !isPassOne.value
   passOne.value.type = isPassOne.value == true ? 'text' : 'password'
}
function showPassTwo() {
   isPassTwo.value = !isPassTwo.value
   passTwo.value.type = isPassTwo.value == true ? 'text' : 'password'
}
async function formAction() {
   if (!isEmailCorrect(userLogData.email)) {
      errMessage.value = 'Incorrect email'
      return
   }

   if (userLogData.passOne.length < 6) {
      errMessage.value = 'Incorrect pass'
      return
   }
   if (tab.value == 'login') {
      await signInWithWithEmailAndPassword(userLogData.email, userLogData.passOne)
         .then(() => {
            errMessage.value = null
            router.go(-1)
         })
         .catch(() => {
            errMessage.value = t('login.acountExistError')
         })
   } else {
      if (userLogData.passTwo == userLogData.passOne && userLogData.passOne.length > 6) {
         errMessage.value = null
         signUpWithWithEmailAndPassword(userLogData.email, userLogData.passOne)
         router.go(-1)
      } else {
         errMessage.value = t('login.difPasswords')
      }
   }
}
function isEmailCorrect(email) {
   const regex = /^[a-zA-Z0-9._%+-]+@gmail+\.[a-zA-Z]{2,}$/
   return regex.test(email)
}

function validatePassword(password) {
   const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/
   return regex.test(password)
}

function onResetPass() {
   if (isEmailCorrect(userLogData.email)) {
      resetPass(userLogData.email)
      messageToUser.value = `we have sent message on email : ${userLogData.email} `
      setTimeout(() => {
         messageToUser.value = null
      }, 3000)
   }
}
</script>

<style lang="scss" scoped>
:deep() {
   .v-window__container {
      max-width: 100%;
      margin: 0;
      padding: 0;
   }
   .v-slide-group__container {
      max-width: 100%;
      margin: 0;
      padding: 0;
      .v-slide-group__content {
         //justify-content: center;
         .v-btn {
            font-size: clamp(0.75rem, 0rem + 1.566vw, 1.25rem);
            text-transform: none;
            border-radius: 8px;
            position: relative;
            z-index: 2;
            width: 50%;
            padding: 12px 5px;

            height: auto;
            &.v-slide-group-item--active {
               position: relative;
               z-index: 10;
               background-color: #fff;
            }
         }
      }
      .v-btn__overlay {
         display: none;
      }
      .v-ripple__container {
         display: none;
      }
      .v-btn__content {
         position: relative;
         z-index: 2;
      }
      .v-tab__slider {
         display: none;
      }
      .v-btn__underlay {
         display: none;
      }
   }
}

.login-page {
   // .login-page__box
   &__box {
      max-width: 530px;
      margin: 0 auto;
      padding: 0 15px;
   }
   // .login-page__title
   &__title {
      text-align: center;
      margin-bottom: clamp(1.5rem, -2.252rem + 7.828vw, 4rem);
   }
   // .login-page__content
   &__content {
   }
   &__tabs {
      border-radius: 8px;
      padding: 5px;
      background-color: #efefef;
      &:not(:last-child) {
         margin-bottom: clamp(4.375rem, -0.878rem + 10.959vw, 7.875rem);
      }
   }
}
.content-login {
   &__inputs {
      &:not(:last-child) {
         margin-bottom: clamp(2.5rem, 0.624rem + 3.914vw, 3rem);
      }
   }
   // .content-login__item
   &__item {
      position: relative;
      padding-bottom: clamp(0.375rem, -0.094rem + 0.978vw, 0.688rem);
      &:not(:last-child) {
         margin-bottom: clamp(1.9rem, 0.061rem + 3.523vw, 2.875rem);
      }
      &::before {
         content: '';
         position: absolute;
         bottom: 0;
         left: 0;
         width: 100%;
         height: 1px;
         background-color: #d8d8d8;
      }
      &--password {
         display: flex;
         justify-content: space-between;
      }
   }
   // .content-login__input
   &__input {
      width: 100%;
      &.error {
         input {
            border: 1px solid #ca0606;
         }
      }
      input {
         width: 100%;
      }
   }

   // .content-login__eye
   &__eye {
      position: relative;
      z-index: 1;
      &::after {
         content: '';
         transition: height 0.3s ease 0s;
         align-self: auto;
         position: absolute;
         z-index: 10;
         top: 50%;
         left: 50%;
         height: 0;
         width: 1px;
         background-color: #000;
         transform: translate(-50%, -50%) rotate(45deg);
      }
      &.hiden {
         &::after {
            height: 100%;
         }
      }
   }
   &__reset-pass {
      transition: color 0.3s ease 0s;
      @media (any-hover: hover) {
         &:hover {
            color: #747171;
         }
      }
      &:not(:last-child) {
         margin-bottom: 20px;
      }
   }
   // .content-login__button
   &__button {
      background-color: #000;
      color: #fff;
      width: 100%;
      transition: all 0.3s ease 0s;
      border: 1px solid #000;
      @media (any-hover: hover) {
         &:hover {
            color: #000;
            background-color: #fff;
         }
      }
   }
   &__error {
      font-size: 14px;
      color: #c70909;
   }
}
.message__box {
   transition: all 0.3s ease 0s;
   opacity: 0;
   visibility: hidden;
   width: 100%;
   background-color: #efefef;
   padding: clamp(0.625rem, -0.316rem + 1.961vw, 1.25rem) 15px;
}
.message-visable {
   opacity: 1;
   visibility: visible;
}
.mesaage__container {
   span {
      font-weight: 500;
   }
}
</style>
