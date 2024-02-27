<template>
    <NavBarComponent />
    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="8" md="6">
                <v-card>
                    <v-card-title>
                        <h2>Rooms</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col v-for="room in rooms" :key="room._id" cols="12" sm="6" md="4">
                                <v-card>
                                    <v-card-title>
                                        <h3>Room {{ room.roomNumber }}</h3>
                                    </v-card-title>
                                    <v-card-text>
                                        <p>{{ room.description }}</p>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-btn @click="router.push({ name: 'RoomDetails', params: { id: room._id } })">Details</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { useActiveUserStore } from '../../stores/activeUserStore';
import NavBarComponent from '../navbarComponent/NavBarComponent.vue';
import ReservationsService from '@/services/reservationsService';
import type { Rooms, Room } from '@/models/Rooms';

export default {
    name: 'RoomsComponent',
    components: {
        NavBarComponent
    },
    setup() {
        const router = useRouter();
        const activeUserStore = useActiveUserStore();
        const reservationsService = new ReservationsService();

        return {
            router,
            activeUserStore,
            reservationsService
        };
    },
    data() {
        return {
            rooms: [] as Room[],
            loading: false
        };
    },
    beforeMount() {
        this.loading = true;
        this.reservationsService.getAllRooms().then((response) => {
            this.rooms = response as Room[];
            this.loading = false;
        });
    },
}

</script>