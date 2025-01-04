<template>
   <footer class="footer">
      <div class="footer__container">
         <div class="footer__head">
            <div class="footer__links">
               <button class="footer__link">Contact</button>
            </div>
            <div class="footer__socials">
               <a target="blanc" href="https://www.instagram.com/"
                  ><font-awesome-icon :icon="['fab', 'instagram']"
               /></a>
               <a target="blanc" href="https://www.facebook.com/"
                  ><font-awesome-icon :icon="['fab', 'facebook-f']"
               /></a>
               <a target="blanc" href="https://www.linkedin.com/"><font-awesome-icon :icon="['fab', 'linkedin']" /></a>
               <a target="blanc" href="https://twitter.com/"><font-awesome-icon :icon="['fab', 'twitter']" /></a>
            </div>
         </div>
         <div class="footer__bottom"><span>© 2021 Shelly.</span> Terms of use <span>and</span> privacy policy.</div>
      </div>
   </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style lang="scss" scoped>
.footer {
   color: #707070;
   // .footer__container
   &__container {
      padding: clamp(1.875rem, 0.871rem + 3.21vw, 3.438rem) 15px 10px 15px;
      border-top: 1px solid #d8d8d8;
   }
   // .footer__head
   &__head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.9375rem;
      &:not(:last-child) {
         margin-bottom: 48px;
      }
      @media (max-width: 767.98px) {
         flex-direction: column;
         align-items: start;
         gap: 20px;
      }
   }
   // .footer__links
   &__links {
      display: flex;
      align-items: center;
      gap: 7px;
      flex-wrap: wrap;
      @media (max-width: 767.98px) {
         flex-direction: column;
         align-items: start;
      }
   }
   &__link {
      text-transform: uppercase;
      line-height: 156.25%; /* 25/16 */
   }
   // .footer__socials
   &__socials {
      font-size: 1.25rem;
      display: flex;
      align-items: center;
      gap: clamp(0.625rem, 0.263rem + 1.16vw, 1.188rem);
      a {
         width: 18px;
         height: 18px;
         transition: color 0.3s ease 0s;
         @media (any-hover: hover) {
            &:hover {
               color: #000;
            }
         }
      }
   }
   // .footer__bottom
   &__bottom {
      span {
         color: #000;
      }
   }
}
</style>
