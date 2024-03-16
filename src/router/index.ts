import { createRouter, createWebHistory } from 'vue-router'

//components
import HomeComponent from '../components/homeComponent/HomeComponent.vue'
import QRCodeReader from '../components/qRCodeReader/QRCodeReader.vue'
import PersonalPageComponent from '../components//personalPageComponent/PersonalPageComponent.vue'
import RegistrationComponent from '@/components/registrationComponent/RegistrationComponent.vue'
import NewReservationComponent from '@/components/newReservationComponent/NewReservationComponent.vue'
import RoomsComponent from '@/components/roomsComponent/RoomsComponent.vue'

//views
import ReservationsView from '@/views/reservationsView/ReservationsView.vue'
import MyReservationView from '@/views/myReservationsView/MyReservationsView.vue'

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
      component: HomeComponent,
      
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
      name:"MyReservationsView",
      component: MyReservationView
    },
    {
      path:"/Registration",
      name:"RegistrationComponent",
      component: RegistrationComponent
    },
    {
      path:"/NewReservation",
      name:"NewReservationComponent",
      component: NewReservationComponent
    },
    {
      path:"/Rooms",
      name:"RoomsComponent",
      component: RoomsComponent
    },
    {
      path:"/Reservations",
      name:"ReservationsView",
      component: ReservationsView
    }

  ]
})

export default router
