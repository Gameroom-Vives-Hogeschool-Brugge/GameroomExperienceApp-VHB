<template>
  <NavBarComponent />
  <div class="mainContainer">
    <div class="buttonContainer">
      <v-btn
        id="routeToPersonalPage"
        class="btn tertiary-color-btn backButton"
        @click="navigateTo('PersonalPage')"
        >Terug</v-btn
      >
      <v-btn class="btn primary-color-btn" @click="navigateTo('Reservations')" :disabled="loading"
        >Maak Nieuwe Reservatie</v-btn
      >
    </div>
    <div class="headingContainer">
      <h1>MIJN RESERVATIES</h1>
    </div>
    <div class="reservationsContainer todayReservationsContainer">
        <ReservationsListComponent
        @reservation-Deleted="reservationDeleted"
        :reservations="reservationsToday"
        :rooms="rooms"
        title="Vandaag"
        :loading="loading"
        />
        <!-- If no reservation, display this with a warning-->
        <div v-if="reservationsToday.length == 0">
            <v-alert class="tertiary-color-btn" outlined>
                <p>Je hebt geen reservaties voor vandaag.</p>
            </v-alert>
        </div>
    </div>
    <div class="reservationsContainer otherReservationsContainer">
      <ReservationsListComponent
        @reservation-Deleted="reservationDeleted"
        :reservations="reservationsOther"
        :rooms="rooms"
        title="Toekomstig"
        :loading="loading"
      />
      <div v-if="reservationsOther.length == 0">
            <v-alert class="tertiary-color-btn" outlined>
                <p>Je hebt geen reservaties voor vandaag.</p>
            </v-alert>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
//components
import NavBarComponent from '../../components/navbarComponent/NavBarComponent.vue'
import ReservationsListComponent from '../../components/reservationsListComponent/ReservationsListComponent.vue'

//services
import ReservationsService from '@/services/reservationsService'
import RoomsService from '@/services/roomsService'

//types
import type { Reservation } from '@/models/Reservations'
import type { Room } from '@/models/Rooms'

//stores
import { useActiveUserStore } from '@/stores/activeUserStore'

//other
import { useRouter } from 'vue-router'

export default {
  name: 'MyReservationsView',
  components: {
    NavBarComponent,
    ReservationsListComponent
  },
  setup() {
    const router = useRouter()
    const reservationsService = new ReservationsService()
    const roomsService = new RoomsService()
    const activeUserStore = useActiveUserStore()

    const navigateTo = (route: string) => {
      if (route == 'PersonalPage') {
        router.push('/PersonalPage')
      } else if (route == 'Reservations') {
        router.push('/Reservations')
      }
    }
    return {
      navigateTo,
      reservationsService,
      roomsService,
      activeUserStore
    }
  },
  data() {
    return {
      reservations: [] as Reservation[],
      rooms: [] as Room[],
      loading: true,
      showLoadIcon: true
    }
  },
  async mounted() {
    // Fetch reservations
    const activeUserId = this.activeUserStore.getActiveUser()._id
    await this.reservationsService.getReservationsByUserId(activeUserId).then((response) => {
      this.reservations = response as Reservation[]
    })

    await this.roomsService.getAllRooms()

    // Fetch rooms
    this.rooms = this.roomsService.getRooms() as Room[]

    this.loading = false
    this.showLoadIcon = false
  },
  computed: {
    reservationsToday(): Reservation[] {
      return this.reservations.filter((reservation: Reservation) => {
        return new Date(reservation.date).toDateString() == new Date().toDateString()
      })
    },
    reservationsOther(): Reservation[] {
      //return all reservations that are not today and sort them by date
      return this.reservations
        .filter((reservation: Reservation) => {
          return new Date(reservation.date).toDateString() != new Date().toDateString()
        })
        .sort((a: Reservation, b: Reservation) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        })
    }
  },
  methods: {
    async reservationDeleted(): Promise<void> {
      await this.reservationsService
        .getReservationsByUserId(this.activeUserStore.getActiveUser()._id)
        .then((response) => {
          this.reservations = response as Reservation[]
        })
    }
  }
}
</script>

<style scoped>
navbarComponent {
  height: 10vh;
}

.mainContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10vh !important;
}

.buttonContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 8vh;
  width: 100%;
}

.headingContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 8vh;
  width: 100%;
}

.reservationsContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90%;
    padding-top: 1vh;
    padding-bottom: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
}

.otherReservationsContainer {
  margin-top: 5vh;
  margin-bottom: 5vh;
}
</style>
