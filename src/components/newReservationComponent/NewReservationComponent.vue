<template>
    <v-sheet>
        <v-form @submit.prevent="submit">
          <v-select
            v-model="createdTimeSlot.roomId"
            label="Selecteer uw console"
            :items="rooms"
            :item-title="(room: Room) => room.description"
            :item-value="(room: Room) => room._id"
            :rules="consoleRules"
            required
          ></v-select>
          <v-select
            v-model="createdTimeSlot.date"
            label="Selecteer uw reservatieDatum"
            :items="dateList"
            :items-title="(dateString: string) => dateStringtoLocaleDateString(dateString)"
            :itels-value="(dateString: string) => dateString"
            :rules="dateRules"
            required
          ></v-select>
          <v-select
            v-model="createdTimeSlot.reservationHour"
            label="Selecteer uw starttijd"
            :items="hourList"
            :rules="hourRules"
            required
          ></v-select>
          <v-select
            v-model="createdTimeSlot.duration"
            label="Selecteer de totale duur van uw sessie"
            :items="durationList"
            :rules="durationRules"
            required
          ></v-select>
          <v-btn id="submit-btn" type="submit" color="btn primary-color-btn">Maak Reservatie</v-btn>
          <v-btn id="close-btn" color="btn secondary-color-btn" @click="closeWindow()">Annuleer</v-btn>
        </v-form>
    </v-sheet>
  
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { useActiveUserStore } from '../../stores/activeUserStore'
import { useRoomsStore } from '../../stores/roomsStore'
import type { Room } from '@/models/Rooms'
import type { ObjectId } from 'bson'
import type { SelectedTimeSlot, CreatedTimeSlot, SubmittedTimeSlot } from '@/models/Reservations'
import moment from 'moment-timezone';
import RoomsService from '@/services/roomsService'

export default {
  name: 'NewReservationComponent',
  components: {},
  props: {
    rooms: {
      type: Array as () => Room[],
      required: true
    },
    selectedTimeSlot : {
      type: Object as () => SelectedTimeSlot,
      required: true
    },
    dialog: {
      type: Boolean as () => Boolean,
      required: true
    }
  },
  setup() {
    const router = useRouter()
    const activeUserStore = useActiveUserStore()
    const roomsStore = useRoomsStore()
    const roomsService = new RoomsService()

    return {
      router,
      activeUserStore,
      roomsStore,
      roomsService
    }
  },
  data() {
    return {
      createdTimeSlot: {
        roomId: this.selectedTimeSlot.roomId as ObjectId,
        date: this.dateTodateString(this.selectedTimeSlot.date) as string,
        reservationHour: this.selectedTimeSlot.reservationHour as string,
        duration: 1,
      } as unknown as CreatedTimeSlot,
      consoleRules: [
        (v: any) => !!v || 'Console is verplicht',
      ],
      dateRules: [
        (v: any) => !!v || 'Datum is verplicht',
      ],
      hourRules: [
        (v: any) => !!v || 'Starttijd is verplicht',
      ],
      durationRules: [
        (v: any) => !!v || 'Duur is verplicht',
      ],
        firstHour: 8,
        lastHour: 17,
    }
  },
  methods: {
    submit(event: Event) : void {
      //create a new SubmittedTimeSlot object
      const submittedTimeSlot = {
        roomId: this.createdTimeSlot.roomId,
        date: this.dateStringtoDate(this.createdTimeSlot.date, this.createdTimeSlot.reservationHour),
        duration: this.createdTimeSlot.duration
      } as unknown as SubmittedTimeSlot

      this.$emit('submitReservation', submittedTimeSlot)
    },
    dateStringtoDate(dateString: string, reservationHour: string) : Date {
      //get the year, month and day from the dateString
      const date = dateString.split(" ")[1]
      
      //get the year, month and day from the dateString
      const year = date.split('-')[2]
      const month = date.split('-')[1]
      const day = date.split('-')[0]

      //get the hour from the reservationHour
      let hour = reservationHour.split(':')[0]

      //add a 0 in front of the hour if it's only 1 digit
      if (hour.length === 1) {
        hour = `0${hour}`
      }

      //create date object with local time from above parameters
      let a = moment.tz(`${year}-${month}-${day} ${hour}:00`, 'Europe/Brussels')
      const localDate = new Date(a.format())

      return localDate
    },
    dateTodateString(date: Date) : string {
      //format the date to a string with only days, monts and year
      const dateString = date.toISOString().split('T')[0]
      const month = dateString.split('-')[1]
      const day = dateString.split('-')[2]
      const year = dateString.split('-')[0]
      const weekday = date.toLocaleDateString('nl-NL', {
        weekday: 'short'
      })

      const newDateString = `${weekday} ${day}-${month}-${year}`

      return newDateString
    },
    dateStringtoLocaleDateString(dateString: string) : string {
      const newDate = new Date(dateString)
      const localString = newDate.toLocaleDateString('nl-NL', {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
      })

      console.log("localString:", localString)
      return localString
    },
    closeWindow() {
      this.$emit('closeWindow')
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
    durationList(): number[] {
        let durationList = []
        for (let i = 1; i < 5; i++) {
            durationList.push(i)
        }
        return durationList
    },
    dateList(): string[] {
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

        const newDateString = this.dateTodateString(date)

        dateList.push(newDateString)
      }

      return dateList
    },
  }
}
</script>

<style>
form {
  display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background: white;
    opacity: 1;
}

#close-btn {
  height: 40px !important;
  width: 80%;
  min-width: 250px;
  margin-top: 10px;
  margin-bottom: 10px;
}

#submit-btn {
  width: 80% !important;
  height: 40px !important;
  min-width: 250px;
  margin-bottom: 10px;
}

.v-input {
  width: 80% !important;
  height: 80px !important;
  margin: 10px 0 !important;
  min-width: 300px !important;
}

</style>
