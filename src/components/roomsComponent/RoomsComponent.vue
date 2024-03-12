<template>
  <v-window v-model="window" show-arrows v-if="!loading">
    <v-window-item v-for="room in rooms" :key="room._id.toString()">
      <v-card class="d-flex justify-center align-center flex-column">
        <v-card-title>
          <h3>{{ room.description }}</h3>
        </v-card-title>
        <v-table width="100vw">
          <thead>
            <tr>
              <th>TIJDSTIP/DAG</th>
              <th v-for="day in datelist" :key="dateToLocaleString(day)" class="text-center">
                {{ dateToLocaleString(day).toUpperCase() }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(hour,index ) in hourList" :key="hour">
              <th>{{ hour }} - {{ hoursPlusOneList[index] }}</th>
              <td v-for="day in datelist" :key="dateToLocaleString(day)">
                <v-btn 
                  block
                  variant="tonal"
                  v-if="checkReservationForThatTime(room, day, hour) === 0"
                  color="error"
                  >Volzet</v-btn
                >

                <v-btn block
                  variant="tonal"
                  v-if="checkReservationForThatTime(room, day, hour) === 2"
                  color="success"
                  @click="createReservation(room, day, hour)"
                  >2 plaatsen vrij</v-btn
                >
                <v-btn block
                  variant="tonal"
                  v-if="checkReservationForThatTime(room, day, hour) === 1"
                  color="warning"
                  @click="dialog = true"
                  >1 plaats vrij</v-btn
                >
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
    </v-window-item>
  </v-window>
  <div v-if="loading" class="overlayContainer">
    <v-overlay
          v-model="loading"
          class="align-center justify-center"
          contained
        >
        <v-progress-circular
        color="error"
        size="128"
        indeterminate
      ></v-progress-circular>
     </v-overlay>
  </div>
  <div v-if="dialog" class="dialogContainer">
    <v-dialog v-model="dialog" max-width="500">
      <NewReservationComponent @submit-Reservation="submitReservation" :rooms="rooms" :selectedTimeSlot="selectedTimeSlot" :dialog="dialog"/>
    </v-dialog>
  </div>
  
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { useActiveUserStore } from '../../stores/activeUserStore'
import ReservationsService from '@/services/reservationsService'
import type { Room } from '@/models/Rooms'
import type { Reservation, SelectedTimeSlot, SubmittedTimeSlot } from '@/models/Reservations'
import NewReservationComponent from '../newReservationComponent/NewReservationComponent.vue'

export default {
  name: 'RoomsComponent',
  components: {
    NewReservationComponent
  },
  setup() {
    const router = useRouter()
    const activeUserStore = useActiveUserStore()
    const reservationsService = new ReservationsService()

    return {
      router,
      activeUserStore,
      reservationsService
    }
  },
  data() {
    return {
      rooms: [] as Room[],
      reservations: [] as Reservation[],
      selectedTimeSlot : {
        room: {} as unknown as Room,
        date: new Date(),
        reservationHour: '',
      } as unknown as SelectedTimeSlot,
      loading: true,
      window: 1,
      firstHour: 8,
      lastHour: 17,
      dialog: false
    }
  },
  async mounted() {
    this.loading = true

    await this.reservationsService.getAllRooms().then((response) => {
      this.rooms = response as Room[]
    })
    await this.reservationsService.getAllReservations().then((response) => {
      this.reservations = response as Reservation[]
    })
    this.loading = false
  },
  methods: {
    checkReservationForThatTime(room: Room, date: Date, hour: string): number {
      let reservationsLeft = 2

      for (let reservation of this.reservations) {
        if (reservation.room._id === room._id) {
          const reservationDate = new Date(reservation.date)

          if (
            reservationDate.getDay() === date.getDay() &&
            reservationDate.getMonth() === date.getMonth()
          ) {
            const reservationStart = reservationDate.getHours()
            const reservationEnd = reservationDate.getHours() + reservation.duration
            const currentHour = parseInt(hour.split(':')[0])
            if (currentHour >= reservationStart && currentHour < reservationEnd) {
              reservationsLeft--
            }
          }
        }
      }

      return reservationsLeft
    },
    dateToLocaleString(date: Date): string {
      const dateString = date.toLocaleDateString('nl-NL', {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
      })

      return dateString
    },
    createReservation(room: Room, day: Date, hour: string) : void{
      const selectedTimeSlot = {
        room: room,
        date: day,
        reservationHour: hour,
      } as SelectedTimeSlot

      this.selectedTimeSlot = selectedTimeSlot
      this.dialog = true
    },
    async submitReservation(submittedTimeSlot: SubmittedTimeSlot) : Promise<void> {
      await this.reservationsService.createReservation(submittedTimeSlot).then(() => {
        this.dialog = false
      })

    }
  },
  computed: {
    hourList(): string[] {
      let hourList = []
      for (let i = this.firstHour; i < this.lastHour; i++) {
        hourList.push(`${i}:00`)
      }
      return hourList
    },
    hoursPlusOneList(): string[] {
      let hoursPlusOneList = []
      for (let i = this.firstHour + 1; i <= this.lastHour; i++) {
        hoursPlusOneList.push(`${i}:00`)
      }
      return hoursPlusOneList
    },
    datelist(): Date[] {
      let dateList = []

      //get the next 5 days
      for (let i = 0; i < 5; i++) {
        let date = new Date()
        date.setDate(date.getDate() + i)

        //if it's a weekend, add 1 or 2 days
        if (date.getDay() === 0) {
          date.setDate(date.getDate() + 1)
        } else if (date.getDay() === 6) {
          date.setDate(date.getDate() + 2)
        }

        dateList.push(date)
      }

      return dateList
    }
  }
}
</script>

<style>

table {
  display: block;
  overflow-x: scroll;
}

.v-window {
  width: 80% !important;
}

.v-window-item {
  width: 100% !important;
  height: 100% !important;
  display: flex;
  justify-content: center;
}

.v-card {
  height: 70vh;
  padding-bottom: 10vh;
}

.overlayContainer {
  width: 90vw !important;
  height: 80% !important;
  position: relative;
  display: flex;
  justify-content: center;
}

.v-table > .v-table__wrapper > table > tbody > tr > th {
  text-align: center !important;
  font-size: medium;
}

.v-table > .v-table__wrapper > table > thead > tr > th {
  text-align: center !important;
  font-size: medium;
}

.dialogContainer {
  width: 100vw !important;
  height: 100vh !important;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}


</style>
