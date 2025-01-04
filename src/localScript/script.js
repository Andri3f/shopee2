window.onload = function () {
   if (window.innerWidth > 767.98) {
      document.body.classList.add('mobile')
   } else {
      document.body.classList.remove('mobile')
   }
   function removeIconMenuClass() {
      if (window.innerWidth > 767.98) {
         if (
            document.querySelector('.aside-shop__body') &&
            document.querySelector('.aside-shop__body').classList.contains('filter-open')
         )
            document.querySelector('.aside-shop__body').classList.remove('filter-open')
         if (document.body.classList.contains('menu-open')) document.body.classList.remove('menu-open')
         if (document.documentElement.classList.contains('lock')) document.documentElement.classList.remove('lock')
         document.body.classList.remove('mobile')
         document.body.classList.add('pc')
      } else {
         document.body.classList.add('mobile')
         document.body.classList.remove('pc')
      }
   }
   window.addEventListener('resize', removeIconMenuClass)
   removeIconMenuClass()
}
