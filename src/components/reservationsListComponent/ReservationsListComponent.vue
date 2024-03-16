<template>
  <div class="today">
    <h2>Today</h2>
    <v-list>
      <v-list-item v-for="reservation in reservationsToday" :key="reservation._id.toString()">
        <v-card 
            max-width="344" 
            max-height="150" 
            hover
            variant="outlined">
          <v-card-item>
            <v-card-title> {{ reservation.room.description }} </v-card-title>
            <v-card-subtitle> Starttijd: {{ reservation.date }} </v-card-subtitle>
            <v-card-subtitle> Eindtijd: {{ reservation.date }} </v-card-subtitle>
            <v-actions>
                <v-btn color="error">Annuleren</v-btn>
            </v-actions>
          </v-card-item>
        </v-card>
      </v-list-item>
    </v-list>
  </div>
  <div class="other"></div>
</template>

<script lang="ts">
//types
import type { Reservation } from '@/models/Reservations'
import type { Room } from '@/models/Rooms'
import type { ObjectId } from 'mongodb'

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
    }
  },
  setup() {
    return {}
  },
  data() {
    return {}
  },
  methods: {},
  computed: {
    reservationsToday(): Reservation[] {
      return this.reservations
    },
    reservationsOther(): Reservation[] {
      return this.reservations.filter((reservation: Reservation) => {
        return new Date(reservation.date).toDateString() != new Date().toDateString()
      })
    }
  }
}
</script>

<style scoped>
.today {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
}
</style>
