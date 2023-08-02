import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    theme: {
        defaultTheme: "lightTheme",
        themes: {
          lightTheme: {
            dark: false,
            colors: {
                primary: '#1867C0',
            },
          },

        },
      },
  components,
  directives,
})


createApp(App).use(store).use(vuetify).use(router).mount('#app')