<template>
        <NavBarComponent />
        <div class="container">
            <div class="container2">
                <v-btn id="routeToPersonalPage" class="v-btn--size-default" @click="navigateTo('PersonalPage')">Terug</v-btn>
                <v-btn class="v-btn--size-default" @click="navigateTo('NewReservation')">Maak Nieuwe Reservatie</v-btn>
            </div>
        </div>
</template>

<script lang="ts">
import NavBarComponent from '../navbarComponent/NavBarComponent.vue';
import { useRouter } from 'vue-router';

export default {
    name: 'MyReservationComponent',
    components: {
        NavBarComponent
    },
    setup () {
        const router = useRouter();
        
        const navigateTo = (route: string) => {
            if (route == "PersonalPage") {
                router.push("/PersonalPage");
            }
        };
        return {
            navigateTo
        };
    },
    data() {
        return {
            reservations: []
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

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 90vh;
        margin-top: 10vh;
        background-color: #f5f5f5;
    }

</style>