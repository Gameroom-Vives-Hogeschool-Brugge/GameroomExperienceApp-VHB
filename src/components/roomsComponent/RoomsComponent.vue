<template>
  <v-window v-model="window" show-arrows v-if="!loading && screenwidth > 1300">
    <v-window-item v-for="room in rooms" :key="room._id.toString()">
      <v-card class="d-flex justify-center align-center flex-column">
        <v-card-title>
          <h3>{{ room.description }}</h3>
        </v-card-title>
        <v-table width="100vw">
          <thead>
            <tr>
              <th>TIJDSTIP/DAG</th>
              <th v-for="day in dateList" :key="dateToLocaleString(day)" class="text-center">
                {{ dateToLocaleString(day).toUpperCase() }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(hour, index) in hourList(room._id)" :key="hour">
              <th>{{ hour }} - {{ hoursPlusOneList(room._id)[index] }}</th>
              <td v-for="day in dateList" :key="dateToLocaleString(day)">
                <v-menu location="bottom" id="tooltip" :open-delay="100" :open-on-hover="true">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      block
                      variant="tonal"
                      v-bind="props"
                      v-if="checkReservationForThatTime(room, day, hour) === 0"
                      color="error"
                      >Volzet</v-btn
                    >
                    <v-btn
                      block
                      variant="tonal"
                      v-if="checkReservationForThatTime(room, day, hour) === 2"
                      color="success"
                      v-bind="props"
                      @click="createReservation(room._id, day, hour)"
                      >2 plaatsen vrij</v-btn
                    >
                    <v-btn
                      block
                      variant="tonal"
                      v-if="checkReservationForThatTime(room, day, hour) === 1"
                      color="warning"
                      v-bind="props"
                      @click="createReservation(room._id, day, hour)"
                      >1 plaats vrij</v-btn
                    >
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="reservation in giveReservationsForThatTime(room, day, hour)"
                      :key="reservation._id.toString()"
                    >
                      <v-list-item-title
                        >Persoon: {{ reservation.user.firstName }}
                        {{ reservation.user.lastName }}</v-list-item-title
                      >
                      <v-list-item-subtitle
                        >Starttijd:
                        {{ formatDate(new Date(reservation.date)) }}</v-list-item-subtitle
                      >
                      <v-list-item-subtitle
                        >Eindtijd:
                        {{ formatDate(calculatEndTime(reservation)) }}</v-list-item-subtitle
                      >
                      <v-btn
                        class="deleteButton"
                        variant="outlined"
                        color="error"
                        v-if="checkIfUserIsAdmin"
                        >Verwijder</v-btn
                      >
                    </v-list-item>
                    <v-list-item v-if="giveReservationsForThatTime(room, day, hour).length < 2">
                      <v-list-item-title>Maak een reservatie</v-list-item-title>
                      <v-btn
                        class="createReservationButton"
                        variant="outlined"
                        color="success"
                        @click="createReservation(room._id, day, hour)"
                        >Reserveer</v-btn
                      >
                    </v-list-item>
                  </v-list>
                </v-menu>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
    </v-window-item>
  </v-window>
  <div class="roomDiv" v-if="!loading && screenwidth < 1300">
    <v-select
      label="Select"
      :items="rooms"
      :item-value="(room) => room._id.toString()"
      :item-title="(room) => room.description"
      v-model="selectedRoomId"
    ></v-select>

    <v-list class="listDiv">
      <h2>{{ getRoombyId(selectedRoomId).description }}</h2>
      <v-list-item v-for="day in dateList" :key="dateToLocaleString(day)">
        <v-card>
          <v-card-title>
            <h3>{{ dateToLocaleString(day) }}</h3>
          </v-card-title>
          <div v-for="(hour, index) in hourList(selectedRoomId)" :key="hour">
            <v-card-subtitle>
              {{ hour }} - {{ hoursPlusOneList(selectedRoomId)[index] }}
            </v-card-subtitle>
            <v-menu location="bottom" id="tooltip" :open-delay="100" :open-on-click="true">
              <template v-slot:activator="{ props }">
                <v-btn
                  block
                  variant="tonal"
                  color="error"
                  v-bind="props"
                  v-if="checkReservationForThatTime(getRoombyId(selectedRoomId), day, hour) === 0"
                  >Volzet</v-btn
                >
                <v-btn
                  block
                  variant="tonal"
                  v-if="checkReservationForThatTime(getRoombyId(selectedRoomId), day, hour) === 2"
                  color="success"
                  v-bind="props"
                  >2 plaatsen vrij</v-btn
                >
                <v-btn
                  block
                  variant="tonal"
                  v-if="checkReservationForThatTime(getRoombyId(selectedRoomId), day, hour) === 1"
                  color="warning"
                  v-bind="props"
                  >1 plaats vrij</v-btn
                >
              </template>
              <v-list>
                <v-list-item
                  v-for="reservation in giveReservationsForThatTime(
                    getRoombyId(selectedRoomId),
                    day,
                    hour
                  )"
                  :key="reservation._id.toString()"
                >
                  <v-list-item-title
                    >Persoon: {{ reservation.user.firstName }}
                    {{ reservation.user.lastName }}</v-list-item-title
                  >
                  <v-list-item-subtitle
                    >Starttijd: {{ formatDate(new Date(reservation.date)) }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    >Eindtijd: {{ formatDate(calculatEndTime(reservation)) }}</v-list-item-subtitle
                  >
                  <v-btn
                    class="deleteButton"
                    variant="outlined"
                    color="error"
                    v-if="checkIfUserIsAdmin"
                    >Verwijder</v-btn
                  >
                </v-list-item>
                <v-list-item
                  v-if="
                    giveReservationsForThatTime(getRoombyId(selectedRoomId), day, hour).length < 2
                  "
                >
                  <v-list-item-title>Maak een reservatie</v-list-item-title>
                  <v-btn
                    class="createReservationButton"
                    variant="outlined"
                    color="success"
                    @click="createReservation(selectedRoomId, day, hour)"
                    >Reserveer</v-btn
                  >
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </v-card>
      </v-list-item>
    </v-list>
  </div>

  <div v-if="loading" class="overlayContainer">
    <v-overlay v-model="showLoadIcon" class="align-center justify-center" contained>
      <v-progress-circular color="error" size="128" indeterminate></v-progress-circular>
    </v-overlay>
  </div>
  <div v-if="dialog" class="dialogContainer">
    <v-dialog v-model="dialog" max-width="500">
      <NewReservationComponent
        @submit-Reservation="submitReservation"
        @close-Window="closeWindow"
        :rooms="rooms"
        :selectedTimeSlot="selectedTimeSlot"
        :dialog="dialog"
      />
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { useActiveUserStore } from '../../stores/activeUserStore'
import { useRoomsStore } from '../../stores/roomsStore'
import ReservationsService from '@/services/reservationsService'
import type { Room } from '@/models/Rooms'
import type { Reservation, SelectedTimeSlot, SubmittedTimeSlot } from '@/models/Reservations'
import NewReservationComponent from '../newReservationComponent/NewReservationComponent.vue'
import { ObjectId } from 'mongodb'
import RoomsService from '@/services/roomsService'
import moment from 'moment-timezone'

export default {
  name: 'RoomsComponent',
  components: {
    NewReservationComponent
  },
  props: {
    rooms: {
      type: Array as () => Room[],
      required: true
    },
    loading: {
      type: Boolean as () => Boolean,
      required: true
    }
  },
  emits: ['loadingCompleted'],
  setup() {
    const router = useRouter()
    const activeUserStore = useActiveUserStore()
    const roomsStore = useRoomsStore()
    const reservationsService = new ReservationsService()
    const roomsService = new RoomsService()

    return {
      router,
      activeUserStore,
      roomsStore,
      reservationsService,
      roomsService
    }
  },
  data() {
    return {
      reservations: [] as Reservation[],
      selectedTimeSlot: {
        roomId: '' as unknown as ObjectId,
        date: new Date(),
        reservationHour: ''
      } as unknown as SelectedTimeSlot,
      window: 1,
      dialog: false,
      showLoadIcon: true,
      screenwidth: window.innerWidth,
      selectedRoomId: null as unknown as ObjectId
    }
  },
  async mounted() {
    await this.reservationsService.getAllReservations().then((response) => {
      this.reservations = response as Reservation[]
    })

    this.selectedRoomId = this.rooms[0]._id

    this.showLoadIcon = false

    this.$emit('loadingCompleted')
  },
  methods: {
    checkReservationForThatTime(room: Room, date: Date, hour: string): number {
      let reservationsLeft = 2

      const difference = this.giveDifferenceBetweenBrusselsAndUTC()

      //check if there are any reservations for that room on that day and hour
      for (let reservation of this.reservations) {
        if (reservation.room._id === room._id) {
          let reservationDate = new Date(reservation.date)

          if (
            reservationDate.getUTCDay() === date.getUTCDay() &&
            reservationDate.getUTCMonth() === date.getUTCMonth()
          ) {
            const reservationStart = reservationDate.getUTCHours()
            const reservationEnd = reservationDate.getUTCHours() + reservation.duration

            //get the current hour in brussels time
            let currentHour = parseInt(hour.split(':')[0]) + difference

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
    createReservation(roomId: ObjectId, day: Date, hour: string): void {
      const selectedTimeSlot = {
        roomId: roomId,
        date: day,
        reservationHour: hour
      } as SelectedTimeSlot

      this.selectedTimeSlot = selectedTimeSlot
      this.dialog = true
    },
    async submitReservation(submittedTimeSlot: SubmittedTimeSlot): Promise<void> {
      await this.reservationsService.createReservation(submittedTimeSlot).then(() => {
        this.dialog = false
      })
    },
    closeWindow() {
      this.dialog = false
    },
    hourList(roomId: ObjectId): string[] {
      let hourList = []
      const earliestHour = this.roomsStore.getFirstReservableHour(roomId)
      const latestHour = this.roomsStore.getLastReservableHour(roomId)

      for (let i = earliestHour; i < latestHour; i++) {
        hourList.push(`${i}:00`)
      }
      return hourList
    },
    hoursPlusOneList(roomId: ObjectId): string[] {
      let hoursPlusOneList = []
      const earliestHour = this.roomsStore.getFirstReservableHour(roomId)
      const latestHour = this.roomsStore.getLastReservableHour(roomId)

      for (let i = earliestHour + 1; i <= latestHour; i++) {
        hoursPlusOneList.push(`${i}:00`)
      }
      return hoursPlusOneList
    },
    giveDifferenceBetweenBrusselsAndUTC(): number {
      const currentBrusselsTime = parseInt(moment().tz('Europe/Brussels').format('HH'))
      const currentUTC = new Date().getUTCHours()
      const difference = currentUTC - currentBrusselsTime

      return difference
    },
    giveReservationsForThatTime(room: Room, date: Date, hour: string): Reservation[] {
      let reservationsForThatTime = []

      const difference = this.giveDifferenceBetweenBrusselsAndUTC()

      //check if there are any reservations for that room on that day and hour
      for (let reservation of this.reservations) {
        if (reservation.room._id === room._id) {
          let reservationDate = new Date(reservation.date)

          if (
            reservationDate.getUTCDay() === date.getUTCDay() &&
            reservationDate.getUTCMonth() === date.getUTCMonth()
          ) {
            const reservationStart = reservationDate.getUTCHours()
            const reservationEnd = reservationDate.getUTCHours() + reservation.duration

            //get the current hour in brussels time
            let currentHour = parseInt(hour.split(':')[0]) + difference

            if (currentHour >= reservationStart && currentHour < reservationEnd) {
              reservationsForThatTime.push(reservation)
            }
          }
        }
      }

      return reservationsForThatTime
    },
    formatDate(date: Date): string {
      //format to dd/mm/yyyy HH:mm
      return moment(date).tz('Europe/Brussels').format('HH:mm')
    },
    calculatEndTime(reservation: Reservation): Date {
      //add the duration to the start time
      let endTime = new Date(reservation.date)
      endTime.setHours(endTime.getHours() + reservation.duration)

      return endTime
    },
    getRoombyId(roomId: ObjectId): Room {
      return this.rooms.find((room) => room._id === roomId) as Room
    }
  },
  computed: {
    dateList(): Date[] {
      let dateList = []
      let dayCounter = 0

      //get the next 5 days
      for (let i = 0; i < 6; i++) {
        let date = new Date()
        date.setDate(date.getDate() + dayCounter + i)

        //if it's a weekend, skip it
        if (date.getDay() === 0 || date.getDay() === 6) {
          ++dayCounter
          continue
        }

        dateList.push(date)
      }

      return dateList
    },
    checkIfUserIsAdmin(): boolean {
      console.log(this.activeUserStore.getActiveUserRole())

      return this.activeUserStore.getActiveUserRole() === 'Admin'
    }
  }
}
</script>

<style>
table {
  display: block;
  overflow-x: scroll;
}

.v-tooltip__content {
  background-color: white !important;
  color: white !important;
}

.v-window {
  width: 100% !important;
}

.v-window-item {
  width: 100% !important;
  height: 100% !important;
  display: flex;
  justify-content: center;
}

.v-card {
  height: 100%;
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

.tooltip {
  background-color: #424242;
}

.deleteButton {
  margin-top: 10px;
}

.createReservationButton {
  margin-top: 10px;
}

.roomDiv {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.listDiv {
  width: 90vw;
}

.listDiv > h2 {
  text-align: center;
}



</style>
