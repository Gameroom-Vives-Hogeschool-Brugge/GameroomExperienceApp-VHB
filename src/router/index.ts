import { createRouter, createWebHistory } from 'vue-router'
import HomeComponent from '../components/homeComponent/HomeComponent.vue'
import QRCodeReader from '../components/QRCodeReader.vue'
import PersonalPageComponent from '../components//personalPageComponent/PersonalPageComponent.vue'
import MyReservationComponent from '@/components/myReservationsComponent/MyReservationComponent.vue'
import RegistrationComponent from '@/components/registrationComponent/RegistrationComponent.vue'

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
    {
      path:"/PersonalPage",
      name:"PersonalPageComponent",
      component: PersonalPageComponent
    },
    {
      path:"/MyReservations",
      name:"MyReservationsComponent",
      component: MyReservationComponent
    },
    {
      path:"/Registration",
      name:"RegistrationComponent",
      component: RegistrationComponent
    }
  ]
})

export default router
