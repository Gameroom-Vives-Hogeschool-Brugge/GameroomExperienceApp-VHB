<template>
  <div class="mainListContainer">
    <h2>{{title}}</h2>
    <v-list v-if="!loading" class="listContainer">
      <v-list-item v-for="reservation in reservations" :key="reservation._id.toString()">
        <v-card 
            max-width="344" 
            max-height="150" 
            hover
            variant="outlined">
          <v-card-item>
            <v-card-title> {{ reservation.room.description }} </v-card-title>
            <v-card-subtitle> Starttijd: {{ formatDate(new Date(reservation.date)) }} </v-card-subtitle>
            <v-card-subtitle> Eindtijd: {{ formatDate(calculatEndTime(reservation)) }} </v-card-subtitle>
            <v-card-actions>
                <v-btn color="error" variant="outlined" @click="openDeleteDialog(reservation._id)">Annuleren</v-btn>
            </v-card-actions>
          </v-card-item>
        </v-card>
      </v-list-item>
    </v-list>
    <div v-if="loading" class="overlayContainer">
            <v-overlay
                v-model="showLoadIcon"
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

    <v-dialog v-model="deleteDialog" max-width="500">
      <v-card>
        <v-card-title>Weet u zeker dat u deze reservering wilt annuleren?</v-card-title>
        <v-card-actions>
          <v-btn color="error" @click="deleteDialog = false">Nee</v-btn>
          <v-btn color="error" @click="deleteReservation()">Ja</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
//types
import type { Reservation } from '@/models/Reservations'
import type { Room } from '@/models/Rooms'
import type { ObjectId } from 'mongodb'

//moment
import moment from 'moment-timezone';

//services
import ReservationsService from '@/services/reservationsService'

export default {
  name: 'ReservationsListComponent',
  components: {},
  props: {
    reservations: {
      type: Array as () => Reservation[],
      required: true
    },
    rooms: {
      type: Array as () => Room[],
      required: true
    },
    title: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    }
  },
  setup() {
    const reservationsService = new ReservationsService()

    return {
      reservationsService
    }
  },
  data() {
    return {
      showLoadIcon: true,
      deleteDialog: false,
      reservationToDelete: null as unknown as ObjectId
    }
  },
  methods: {
    formatDate(date: Date) : string {
      return moment(date).tz("Europe/Brussels").format('DD/MM/YYYY HH:mm')
    },
    calculatEndTime(reservation: Reservation) : Date {
      //add the duration to the start time
      let endTime = new Date(reservation.date);
      endTime.setHours(endTime.getHours() + reservation.duration);

      return endTime;
    },
    getDifferenceBetweenUTCandBrusselsTime() : number {
      const currentBrusselsTime = parseInt(moment().tz("Europe/Brussels").format('HH'))
      const currentUTC = new Date().getUTCHours()
      const difference = currentBrusselsTime - currentUTC

      return difference
    },
    openDeleteDialog(reservationId: ObjectId) {
      this.deleteDialog = true
      this.reservationToDelete = reservationId
    },
    async deleteReservation() {
      const responseStatus = await this.reservationsService.deleteReservation(this.reservationToDelete as ObjectId)
      if (responseStatus == 200) {
        this.$emit('reservationDeleted')
      } else {
        console.log('error deleting reservation')
      }

      this.deleteDialog = false
    }
  },
  computed: {
    
  }
}
</script>

<style scoped>
.mainListContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;

}

.listContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
}

.listContainer > v-list-item {
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 21%;
}

.overlayContainer {
  min-height: 200px;
  position: relative;
  display: flex;
  justify-content: center;
}

.v-card-actions {
  padding: 0 !important;
}
</style>
