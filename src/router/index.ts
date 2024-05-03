import { createRouter, createWebHistory } from 'vue-router'

//components
import RegistrationComponent from '@/components/registrationComponent/RegistrationComponent.vue'
import NewReservationComponent from '@/components/newReservationComponent/NewReservationComponent.vue'
import RoomsComponent from '@/components/roomsComponent/RoomsComponent.vue'

//views
import ReservationsView from '@/views/reservationsView/ReservationsView.vue'
import MyReservationView from '@/views/myReservationsView/MyReservationsView.vue'
import AdminsView from '@/views/adminsView/AdminsView.vue'
import HomeView from '@/views/homeView/HomeView.vue'
import PersonalPageView from '@/views/personalPageView/PersonalPageView.vue'
import QRCodeReaderView from '@/views/qRCodeReaderView/QRCodeReaderView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: HomeView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      
    },
    {
      path:"/QrcodeReader",
      name:"QRCodeReaderView",
      component: QRCodeReaderView
    },
    {
      path:"/PersonalPage",
      name:"PersonalPageView",
      component: PersonalPageView
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
    },
    {
      path:"/Admins",
      name:"AdminsView",
      component: AdminsView
    }

  ]
})

export default router
