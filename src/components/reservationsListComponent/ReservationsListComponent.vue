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
                <v-btn color="error" variant="outlined">Annuleren</v-btn>
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
  </div>
</template>

<script lang="ts">
//types
import type { Reservation } from '@/models/Reservations'
import type { Room } from '@/models/Rooms'

//moment
import moment from 'moment-timezone';

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
    return {}
  },
  data() {
    return {
      showLoadIcon: true
    }
  },
  methods: {
    formatDate(date: Date) : string {
      //format to dd/mm/yyyy HH:mm
      return moment(date).tz("Europe/Brussels").format('DD/MM/YYYY HH:mm')

      //replace the hours with the new hours
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
