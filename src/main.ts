import './assets/main.css'
import { createApp } from 'vue'

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

//pinia
import { createPinia } from 'pinia'
const pinia = createPinia()


//pinia-plugin-persistedState
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
pinia.use(piniaPluginPersistedstate)

// App
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(pinia)
app.component("NavBarCompnent", NavBarComponentVue)

app.mount('#app')

//Scripts
import { useActiveUserStore } from './stores/activeUserStore'
const activeUserStore = useActiveUserStore();

// Verify Userauthentication before routing to other pages
router.beforeEach((to) => {
  if (to.name === 'home') {
    activeUserStore.logOut()
  }

  if (to.name === 'RegistrationComponent' && ( activeUserStore.getTemporaryCardNumber() === "" || activeUserStore.getActiveUserSelected())){
    return { name: 'home' }
  }

  if (to.name !== 'QrcodeReader' && to.name !== 'home' && to.name !== 'RegistrationComponent') {
    if (!activeUserStore.getActiveUserSelected()) {
      console.log("No Active User")
      return { name: 'home' }
    }
  }
})
