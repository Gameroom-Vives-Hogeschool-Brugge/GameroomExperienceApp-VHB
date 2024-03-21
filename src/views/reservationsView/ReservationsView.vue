<template>
    <NavBarComponent />
    <div class="container">
        <div class="buttonContainer">
            <v-btn id="routeToPersonalPage" class="btn tertiary-color-btn backButton" @click="navigateTo('PersonalPage')">Terug</v-btn>
            <v-btn class="btn primary-color-btn" @click="createReservation()" :disabled="loading">Maak Nieuwe Reservatie</v-btn>
        </div>
        <div class="headingContainer">
            <h1>Reservaties</h1>
        </div>
        <div class="roomsComponentContainer">
            <RoomsComponent @loading-Started="loadingStarted" @loading-Completed="loadingCompleted" :rooms="rooms" :loading="loading"/>
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

        this.rooms = this.roomsService.getRooms() as Room[]
    },
    data: () => ({
        rooms: [] as Room[],
        selectedTimeSlot : {
            roomId: "" as unknown as ObjectId,
            date: new Date(),
            reservationHour: '',
        } as unknown as SelectedTimeSlot,
      dialog: false,
      loading: true,
      screenwidth: window.innerWidth
    }),
    methods: {
        navigateTo(route: string) {
            if (route == "PersonalPage") {
                this.$router.push("/PersonalPage");
            } else if (route == "NewReservation") {
                this.$router.push("/NewReservation");
            }
        },
        async submitReservation(submittedTimeSlot: SubmittedTimeSlot) : Promise<any> {
            const responseStatus = await this.reservationsService.createReservation(submittedTimeSlot)
            this.dialog = false

            return responseStatus
        },
        closeWindow() {
            this.dialog = false
        },
        createReservation() : void{
            const selectedTimeSlot = {
                roomId: this.rooms[0]._id,
                date: new Date(),
                reservationHour: "9:00",
            } as SelectedTimeSlot

            this.selectedTimeSlot = selectedTimeSlot
            this.dialog = true
        },
        loadingCompleted() {
            this.loading = false
        },
        loadingStarted() {
            this.loading = true
        }
    },
    computed:{
    },
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
        flex-wrap: wrap;
        height: 8vh;
        min-width: 300px;
        width: 100vw;
    }

    .headingContainer {
        display: flex;
        align-items: center;
        justify-content: center;
        height:8vh;
        width: 100%;
    }

    .roomsComponentContainer {
        display: flex;
        align-items: start;
        justify-content: center;
        height: 80vh;
        width: 100%;
    }

    .backButton {
        margin-right: 10px;
    }

    @media (min-width: 1250px) {
        .roomsComponentContainer {
            padding-top: 2vh;
        }
    }

    @media screen and (max-width: 1250px) {
        .headingContainer {
            padding-top: 1vh !important;
        }
        
    }
</style>