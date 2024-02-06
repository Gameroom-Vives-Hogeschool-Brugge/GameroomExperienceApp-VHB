<script lang="ts">
import type { get } from 'http';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import NavBarComponent from '../navbarComponent/NavBarComponent.vue';

export default {
  name: 'PersonalPageComponent',
  components: {
    NavBarComponent
  },
  setup() {
    const router = useRouter();

    const navigateTo = (route: string) => {
        if (route == "HomeComponent") {
            router.push("/home");
        } else if (route == "CheckInComponent") {
            router.push("/checkin");
        } else if (route == "MyReservationComponent") {
            router.push("/MyReservations");
        } else if (route == "NewReservationComponent") {
            router.push("/newreservation");
        } else if (route == "RoomComponent") {
            router.push("/room");
        }
    };

    return {
      navigateTo
    };
  }
}
</script>

<template>
    <NavBarComponent />

    <div class="container">
        <div class="container1">
            <v-btn id="routeToCheckInComponent" @click="navigateTo('CheckInComponent')" class="btn primary-color-btn">Aanmelden</v-btn>
        </div>
        <div class="container2">
            <v-btn id="routeToMyReservationsComponent" @click="navigateTo('MyReservationComponent')" class="btn secondary-color-btn">Mijn Reservaties</v-btn>
            <v-btn id="routeToNewReservationComponent" @click="navigateTo('NewReservationComponent')" class="btn secondary-color-btn">Nieuwe Reservatie</v-btn>
            <v-btn id="routeToRoomComponent" @click="navigateTo('RoomComponent')" class="btn secondary-color-btn">Tijdsschema Lokaal</v-btn>
            <v-btn id="routeToHomeComponent" @click="navigateTo('HomeComponent')" class="btn tertiary-color-btn">Afmelden</v-btn>
        </div>
    </div>

</template>

<style scoped>

    NavBarComponent {
        height: 10vh;
    }
    .container {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        height: 80vh;
        margin-top: 15vh;
    }

    .container1, .container2, .container3{    
        width: 80%;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .container1 {
        height: 35%;
        justify-content: space-around;
    }

    .container2, .container3 {
        height: 65%;
        justify-content: space-evenly;
        flex-wrap: wrap;
        margin-bottom: 5vh;
    }

    .v-btn--size-default {
        width: 30% !important;
        height: 100px !important;
    }   

    @media (max-width: 1200px){
        .container {
            margin-top: 20vh;
        }

        .v-btn--size-default {
            height: 80px !important;
        }
    }

    @media (max-width: 800px){
        .container {
            margin-top: 25vh;
        }
        .v-btn--size-default {
            height: 80px !important;
        }
    }

    @media (max-width: 600px) {
        .container {
            margin-top: 10vh;
        }
        .container1, .container2, .container3 {
            flex-direction: column;
        }

        .v-btn--size-default {
            width: 90% !important;
            height: 20% !important;
        }

        .container1 .v-btn--size-default {
            height: 40% !important;
        } 
    }


</style>

