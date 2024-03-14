<template>
    <NavBarComponent />
    <div class="container">
        <div class="buttonContainer">
            <v-btn id="routeToPersonalPage" class="v-btn--size-default" @click="navigateTo('PersonalPage')">Terug</v-btn>
            <v-btn class="v-btn--size-default" @click="createReservation()" :disabled="loading">Maak Nieuwe Reservatie</v-btn>
        </div>
        <div class="roomsComponentContainer">
            <RoomsComponent :rooms="rooms" :loading="loading" @loading-Completed="loadingCompleted"  />
        </div>
    </div>
    <div v-if="dialog" class="dialogContainer">
    <v-dialog v-model="dialog" max-width="500">
      <NewReservationComponent @submit-Reservation="submitReservation" @close-Window="closeWindow" :rooms="rooms" :selectedTimeSlot="selectedTimeSlot" :dialog="dialog"/>
    </v-dialog>
  </div>
     
</template>

<script lang="ts">
import RoomsComponent from '../../components/roomsComponent/RoomsComponent.vue'
import NavBarComponent from '../../components/navbarComponent/NavBarComponent.vue'
import type { Room } from '@/models/Rooms'
import type { SubmittedTimeSlot, SelectedTimeSlot } from '@/models/Reservations'
import NewReservationComponent from '../../components/newReservationComponent/NewReservationComponent.vue'
import RoomsService from '@/services/roomsService'
import ReservationsService from '@/services/reservationsService'
import { useRouter } from 'vue-router'
import { ObjectId } from "mongodb";

export default {
    components: {
        RoomsComponent,
        NavBarComponent,
        NewReservationComponent
    },
    setup() {
    const router = useRouter()
    const roomsService = new RoomsService()
    const reservationsService = new ReservationsService()

    return {
      router,
      roomsService,
      reservationsService
    }
  },
  async mounted() {
        await this.roomsService.getAllRooms()

        await this.roomsService.getRooms().then((response) => {
            this.rooms = response as Room[]
        })
    },
    data: () => ({
        rooms: [] as Room[],
        selectedTimeSlot : {
            roomId: "" as unknown as ObjectId,
            date: new Date(),
            reservationHour: '',
        } as unknown as SelectedTimeSlot,
      dialog: false,
      loading: true
    }),
    methods: {
        navigateTo(route: string) {
            if (route == "PersonalPage") {
                this.$router.push("/PersonalPage");
            } else if (route == "NewReservation") {
                this.$router.push("/NewReservation");
            }
        },
        async submitReservation(submittedTimeSlot: SubmittedTimeSlot) : Promise<void> {
            await this.reservationsService.createReservation(submittedTimeSlot).then(() => {
            this.dialog = false
        })

        },
        closeWindow() {
            this.dialog = false
        },
        createReservation() : void{
            const selectedTimeSlot = {
                roomId: this.rooms[0]._id,
                date: new Date(),
                reservationHour: "",
            } as SelectedTimeSlot

            this.selectedTimeSlot = selectedTimeSlot
            this.dialog = true
        },
        loadingCompleted() {
            this.loading = false
        }
    },
    computed:{
    }
}


</script>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        padding-top: 10vh;
        background-color: #f5f5f5;
    }

    .buttonContainer {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 20vh;
        width: 100%;
    }

    .roomsComponentContainer {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 80vh;
        width: 100%;
    }
</style>