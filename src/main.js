import './assets/styles/index.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
//swiper
import './modulesHelpers/swipper/swiper'

import App from './App.vue'
import router from './router'
// i18n ======
import i18n from './plugins/i18n'

//--- FontAwesome ---
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import icons */
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
//import { fal } from '@fortawesome/free-regular-svg-icons'
/* add icons to the library */
library.add(fab, fas, far)

// Vuetify =================================

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
   components,
   directives,
})

const app = createApp(App)

app.use(createPinia())
app.use(i18n)
app.use(router)
app.use(vuetify)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
