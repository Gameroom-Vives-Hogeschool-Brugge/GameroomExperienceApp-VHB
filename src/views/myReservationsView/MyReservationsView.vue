<template>
    <NavBarComponent />
    <div class="mainContainer">
        <div class="buttonContainer">
            <v-btn id="routeToPersonalPage" class="btn tertiary-color-btn backButton" @click="navigateTo('PersonalPage')">Terug</v-btn>
            <v-btn class="btn primary-color-btn" @click="navigateTo('Reservations')" :disabled="loading">Maak Nieuwe Reservatie</v-btn>
        </div>
        <div class="todayReservationsContainer">
            <ReservationsListComponent :reservations="reservationsToday" :rooms="rooms" title="Mijn Reservaties Vandaag" :loading="loading"/>
        </div>
        <div class="otherReservationsContainer">
            <ReservationsListComponent :reservations="reservationsOther" :rooms="rooms" title="Mijn Toekomstige Reservaties" :loading="loading"/>
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
import { useActiveUserStore } from '@/stores/activeUserStore';

//other
import { useRouter } from 'vue-router';

export default {
name: 'MyReservationsView',
components: {
    NavBarComponent,
    ReservationsListComponent
},
setup () {
    const router = useRouter();
    const reservationsService = new ReservationsService();
    const roomsService = new RoomsService();
    const activeUserStore = useActiveUserStore();
    
    const navigateTo = (route: string) => {
        if (route == "PersonalPage") {
            router.push("/PersonalPage");
        }
    };
    return {
        navigateTo,
        reservationsService,
        roomsService,
        activeUserStore,
        
    };
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
    const activeUserId = this.activeUserStore.getActiveUser()._id;
    await this.reservationsService.getReservationsByUserId(activeUserId).then((response) => {
        this.reservations = response as Reservation[]
    })

    await this.roomsService.getAllRooms()

    // Fetch rooms
    await this.roomsService.getRooms().then((response) => {
        this.rooms = response as Room[]
    })

    this.loading = false;
    this.showLoadIcon = false;

},
computed: {
    reservationsToday(): Reservation[] {
      return this.reservations.filter((reservation: Reservation) => {
        return new Date(reservation.date).toDateString() == new Date().toDateString()
      })
    },
    reservationsOther(): Reservation[] {
      //return all reservations that are not today and sort them by date
        return this.reservations.filter((reservation: Reservation) => {
            return new Date(reservation.date).toDateString() != new Date().toDateString()
        }).sort((a: Reservation, b: Reservation) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        })
    }  
},
methods: {
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
    height: 10vh;
    width: 90%;
}

.todayReservationsContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90%;
}

.otherReservationsContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90%;
}

</style>