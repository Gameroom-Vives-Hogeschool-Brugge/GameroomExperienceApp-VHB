<template>
    <NavBarComponent />
    <div class="mainContainer">
        <div class="buttonContainer">
            <v-btn id="routeToPersonalPage" class="v-btn--size-default" @click="navigateTo('PersonalPage')">Terug</v-btn>
            <v-btn class="v-btn--size-default" @click="navigateTo('NewReservation')">Maak Nieuwe Reservatie</v-btn>
        </div>
        <div class="reservationsContainer">
            <ReservationsListComponent :reservations="reservations" :rooms="rooms" />
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
        activeUserStore
    };
},
data() {
    return {
        reservations: [] as Reservation[],
        rooms: [] as Room[]
    }
},
async mounted() {
    // Fetch reservations
    const activeUserId = this.activeUserStore.getActiveUser()._id;
    await this.reservationsService.getReservationsByUserId(activeUserId).then((response) => {
        this.reservations = response as Reservation[]
        console.log(this.reservations)
    })

    await this.roomsService.getAllRooms()

    // Fetch rooms
    await this.roomsService.getRooms().then((response) => {
        this.rooms = response as Room[]
    })

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
    margin-top: 10vh;
}

.buttonContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 10vh;
    width: 100%;
}

.reservationsContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 90vh;
    width: 100%;
    padding-top: 5vh;
}

</style>