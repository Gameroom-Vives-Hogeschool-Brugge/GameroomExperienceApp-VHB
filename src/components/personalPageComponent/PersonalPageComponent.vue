<template>
  <NavBarComponent />

  <div class="header">
    <h1>SELECTEER EEN OPTIE</h1>
  </div>

  <div class="container">
    <div class="container1">
      <v-tooltip
        text="U heeft geen reservatie binnen de 30 min van nu..."
        location="top"
        offset="-70"
        :open-on-hover=noValidReservation
        :open-on-click=noValidReservation
      >
        <template v-slot:activator="{ props }">
          <div 
            v-bind="props" 
            class="buttonContainer">
            <v-btn
              id="routeToCheckInComponent"
              @click="openDoor()"
              class="btn primary-color-btn"
              :disabled="!validReservation"
            >
              Deur Openen
              <v-icon
              icon="mdi-door-closed-lock"
              size="x-large"
              end
            ></v-icon>
            </v-btn>
          </div>
        </template>
      </v-tooltip>
    </div>
    <div class="container2">
      <v-btn
        id="routeToMyReservationsComponent"
        @click="navigateTo('MyReservationComponent')"
        class="btn secondary-color-btn"
        >Mijn Reservaties</v-btn
      >
      <v-btn
        id="routeToRoomComponent"
        @click="navigateTo('ReservationsView')"
        class="btn secondary-color-btn"
        >Tijdsschema Lokaal</v-btn
      >
    </div>
    <div class="container3">
      <div class="buttonContainer">
        <v-btn
        id="routeToHomeComponent"
        @click="navigateTo('HomeComponent')"
        class="btn tertiary-color-btn"
        >Uitloggen</v-btn
      >
      </div>
    </div>
  </div>

  <v-dialog v-model="checkedIn" v-if="checkedIn">
    <v-card>
        <v-progress-circular v-if="loading" indeterminate color="#E00020" bg-color="#DDD"></v-progress-circular>
      <v-card-title>
        <h3>Veel plezier</h3>
      </v-card-title>
      <v-card-text>
        <p>Druk op de knop om de deur te openen.</p>
        <p>Vergeet u niet af te melden na gebruik van het lokaal.</p>
        <p>U wordt automatisch uitgelogd na het openen van de deur.</p>
      </v-card-text>
      <v-card-actions>
        <v-btn id="close-btn" color="btn secondary-color-btn"
          >Begrepen</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'

//components
import NavBarComponent from '../navbarComponent/NavBarComponent.vue'

//stores
import { useActiveUserStore } from '@/stores/activeUserStore'

//services
import OpeningDoorService from '@/services/openingDoorService'
import RoomsService from '@/services/roomsService'
import ReservationsService from '@/services/reservationsService'

//models
import type { Reservation } from '@/models/Reservations'

export default {
  name: 'PersonalPageComponent',
  components: {
    NavBarComponent,
  },
  setup() {
    const router = useRouter()
    const activeUserStore = useActiveUserStore()
    const openingDoorService = new OpeningDoorService()
    const reservationsService = new ReservationsService()
    const roomsService = new RoomsService()

    const navigateTo = (route: string) => {
      if (route == 'HomeComponent') {
        activeUserStore.logOut()
        router.push('/home')
      } else if (route == 'MyReservationComponent') {
        router.push('/MyReservations')
      } else if (route == 'ReservationsView') {
        router.push('/Reservations')
      }
    }

    return {
      navigateTo,
      activeUserStore,
      reservationsService,
      roomsService,
      openingDoorService
    }
  },
  async mounted() {
    await this.roomsService.getAllRooms()
  },
  data() {
    return {
      checkedIn: false,
      loading: false,
    }
  },
  computed: {
    noValidReservation() {
      return !this.validReservation
    }
  },
  methods: {
    async openDoor(): Promise<void> {
      this.checkedIn = true
      this.loading = true
      const responseCode = await this.openingDoorService.openDoor()
      this.loading = false
      if (responseCode == 200) {
        console.log('Door opened')
      } else {
        console.log('Door not opened')
      }
      // Automatically log out after opening the door after 5 seconds
      setTimeout(() => {
        this.activeUserStore.logOut()
        this.$router.push('/home')
      }, 5000)
    },
    async validReservation() {
      const reservations = await this.reservationsService.getReservationsByUserId(this.activeUserStore.activeUser._id)

      // Check if there is a reservation within 30 minutes
      const now = new Date()
      const nowPlus30 = new Date(now.getTime() + 30 * 60000)
      const validReservation = reservations.find((reservation: Reservation) => {
        const reservationDate = new Date(reservation.date)
        return reservationDate >= now && reservationDate <= nowPlus30
      })

      if (validReservation) {
        return true
      } else {
        return false
      }
    },
  }
}
</script>

<style scoped>
NavBarComponent {
  height: 10vh;
}

.header {
  display: flex;
  justify-content: center;

  padding-top: 15vh;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 80vh;
  padding-top: 5vh;
  padding-bottom: 10vh;
  background-color: white;
}

.container1,
.container2,
.container3 {
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.container1, container3 {
  height: 35%;
  justify-content: space-around;
}

.container2 {
  height: 65%;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin-bottom: 5vh;
}

.buttonContainer {
  display: flex;
  justify-content: center;
  width: 100% !important;
  height: 100% !important;
  align-items: center;
}

.v-btn--size-default {
  width: 30% !important;
  height: 100px !important;
  min-width: 250px;
}

@media (max-width: 1200px) {
  .container {
    margin-top: 0vh;
  }

  .v-btn--size-default {
    height: 80px !important;
  }
}

@media (max-width: 800px) {
  .container1,
  .container2,
  .container3 {
    flex-direction: column;
  }
}

@media (max-width: 600px) {
}

.v-card-title,
.v-card-text,
.v-card-actions {
  width: 100%;
  text-align: center;
  align-self: center;
}

.v-card-actions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#close-btn {
  height: 50px !important;
  width: 80%;
  min-width: 250px;
}
</style>
