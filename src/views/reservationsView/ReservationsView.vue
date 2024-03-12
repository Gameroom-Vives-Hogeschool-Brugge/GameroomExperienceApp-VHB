<template>
    <NavBarComponent />
    <div class="container">
        <div class="buttonContainer">
            <v-btn id="routeToPersonalPage" class="v-btn--size-default" @click="navigateTo('PersonalPage')">Terug</v-btn>
            <v-btn class="v-btn--size-default" @click="navigateTo('NewReservation')">Maak Nieuwe Reservatie</v-btn>
        </div>
        <div class="roomsComponentContainer">
            <RoomsComponent  />
        </div>
    </div>
     
</template>

<script lang="ts">
import RoomsComponent from '../../components/roomsComponent/RoomsComponent.vue'
import NavBarComponent from '../../components/navbarComponent/NavBarComponent.vue'

export default {
    components: {
        RoomsComponent,
        NavBarComponent
    },
    data: () => ({
    }),
    methods: {
        navigateTo(route: string) {
            if (route == "PersonalPage") {
                this.$router.push("/PersonalPage");
            } else if (route == "NewReservation") {
                this.$router.push("/NewReservation");
            }
        }
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