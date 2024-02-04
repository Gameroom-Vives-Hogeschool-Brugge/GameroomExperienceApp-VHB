import { createRouter, createWebHistory } from 'vue-router'
import HomeComponent from '../components/HomeComponent.vue'
import QRCodeReader from '../components/QRCodeReader.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: HomeComponent
    },
    {
      path: '/',
      name: 'home',
      component: HomeComponent
    },
    {
      path:"/QrcodeReader",
      name:"QrcodeReader",
      component: QRCodeReader
    },
  ]
})

export default router
