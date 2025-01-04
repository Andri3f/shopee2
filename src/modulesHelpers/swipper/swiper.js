import Swiper from 'swiper'
import { Navigation, Autoplay, Thumbs, Controller, EffectFade, Scrollbar } from 'swiper/modules'
// import Swiper and modules styles
import 'swiper/css'
import { nextTick, onMounted } from 'vue'
// init Swiper:
function updateScrollbarStyles() {
   const drag = document.querySelector('.slider-main-product__scrollbar .swiper-scrollbar-drag')
   if (drag) {
      drag.style.height = '5px'
      drag.style.backgroundColor = '#000'
   }
}
export function initSliders() {
   // Список слайдерів
   // Перевіряємо, чи є слайдер на сторінці
   if (document.querySelector('.mian-block__slider')) {
      // Вказуємо склас потрібного слайдера
      // Створюємо слайдер
      new Swiper('.mian-block__slider', {
         // Вказуємо склас потрібного слайдера
         // Підключаємо модулі слайдера
         // для конкретного випадку
         modules: [Navigation, Autoplay],
         observer: true,
         observeParents: true,
         slidesPerView: 1,
         spaceBetween: 100,
         autoHeight: true,
         allowTouchMove: false,
         speed: 1600,

         //touchRatio: 0,
         //simulateTouch: false,
         loop: true,
         //preloadImages: false,
         //lazy: true,

         // Ефекти
         //effect: 'fade',
         //fadeEffect: {
         //   crossFade: false,
         //},

         autoplay: {
            delay: 10000,
         },

         // Пагінація
         /*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

         // Скроллбар
         /*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

         // Кнопки "вліво/вправо"
         //navigation: {
         //   prevEl: '.swiper-button-prev',
         //   nextEl: '.swiper-button-next',
         //},
         /*
			// Брейкпоінти
			breakpoints: {
				640: {
					slidesPerView: 1,
					spaceBetween: 0,
					autoHeight: true,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
			*/
         // Події
         on: {},
      })
   }

   if (document.querySelector('.slider-main-product__slider')) {
      // Створюємо основний слайдер
      let thumbsSwiper = new Swiper('.thumbs-slider', {
         // Підключаємо модулі слайдера
         // для конкретного випадку
         modules: [Navigation, Thumbs, Controller],
         observer: true,
         observeParents: true,
         slidesPerView: 3.5,
         spaceBetween: 40,
         // autoHeight: true,
         speed: 500,
         //loop: true,
         direction: 'vertical',
         slideToClickedSlide: true,

         //touchRatio: 0,
         //simulateTouch: false,
         //loop: true,
         //preloadImages: false,
         //lazy: true,
         /*
         autoplay: {
            delay: 3000,
            disableOnInteraction: false,
         },
         */
         // Пагінація
         /*
         pagination: {
            el: '.swiper-pagination',
            clickable: true,
         },
         */
         // Скроллбар
         /*
         scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
         },
         */
         // Кнопки "вліво/вправо"
         /*
         navigation: {
            prevEl: '.testimonials__arrow_left',
            nextEl: '.testimonials__arrow_right',
         },
         */
         // Брейкпоінти
         breakpoints: {
            320: {
               //slidesPerView: 3,
               //spaceBetween: 15,
               //direction: "horizontal",
            },
            600: {
               //slidesPerView: 4.5,
               spaceBetween: 20,
               //direction: "vertical",
            },
            800: {
               //spaceBetween: 20,
            },
         },
         // Події
         on: {},
      })

      new Swiper('.slider-main-product__slider', {
         // Підключаємо модулі слайдера
         // для конкретного випадку
         modules: [Navigation, Thumbs, Controller, Scrollbar],
         observer: true,
         observeParents: true,
         slidesPerView: 1,
         spaceBetween: 20,
         // autoHeight: true,
         speed: 1000,
         thumbs: {
            swiper: thumbsSwiper,
         },
         //effect: 'fade',
         //fadeEffect: {
         //   crossFade: true,
         //},
         //loop: true,

         //touchRatio: 0,
         //simulateTouch: false,
         //loop: true,
         //preloadImages: false,
         //lazy: true,
         /*
         autoplay: {
            delay: 3000,
            disableOnInteraction: false,
         },
         */

         // Пагінація

         //pagination: {
         //   el: '.slider-main-product__bullets',
         //   clickable: true,
         //},

         // Скроллбар

         //scrollbar: {
         //   el: '.slider-main-product__swiper-scrollbar swiper-scrollbar',
         //   //draggable: true,
         //},
         scrollbar: {
            el: '.slider-main-product__scrollbar',
            draggable: true, // дозволяємо перетягування скролбара
            dragSize: 'auto', // задаємо розмір скролбара
            //draggable: true,
            //snapOnRelease: true,
            //dragSize: 'auto',
         },

         // Кнопки "вліво/вправо"
         /*
         navigation: {
            prevEl: '.testimonials__arrow_left',
            nextEl: '.testimonials__arrow_right',
         },
         */
         /*
         // Брейкпоінти
         breakpoints: {
            640: {
               slidesPerView: 1,
               spaceBetween: 0,
               autoHeight: true,
            },
            768: {
               slidesPerView: 2,
               spaceBetween: 20,
            },
            992: {
               slidesPerView: 3,
               spaceBetween: 20,
            },
            1268: {
               slidesPerView: 4,
               spaceBetween: 30,
            },
         },
         */
         // Події

         on: {},
      })
   }
   //============
}
// Скролл на базі слайдера (за класом swiper scroll для оболонки слайдера)
function initSlidersScroll() {
   let sliderScrollItems = document.querySelectorAll('.swiper_scroll')
   if (sliderScrollItems.length > 0) {
      for (let index = 0; index < sliderScrollItems.length; index++) {
         const sliderScrollItem = sliderScrollItems[index]
         const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar')
         const sliderScroll = new Swiper(sliderScrollItem, {
            observer: true,
            observeParents: true,
            direction: 'vertical',
            slidesPerView: 'auto',
            freeMode: {
               enabled: true,
            },
            scrollbar: {
               el: sliderScrollBar,
               draggable: true,
               snapOnRelease: false,
            },
            mousewheel: {
               releaseOnEdges: true,
            },
         })
         sliderScroll.scrollbar.updateSize()
      }
   }
}
window.addEventListener('DOMContentLoaded', function (e) {
   initSliders()
})
