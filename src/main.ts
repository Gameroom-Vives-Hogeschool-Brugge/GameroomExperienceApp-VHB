import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import NavBarComponentVue from './components/navbarComponent/NavBarComponent.vue'

// Router
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

// App
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.component("NavBarCompnent", NavBarComponentVue)

app.mount('#app')
