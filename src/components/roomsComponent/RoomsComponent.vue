<template>
    <NavBarComponent />
    <h1></h1>

</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { useActiveUserStore } from '../../stores/activeUserStore';
import NavBarComponent from '../navbarComponent/NavBarComponent.vue';

export default {
    name: 'RoomsComponent',
    components: {
        NavBarComponent
    },
    setup() {
        const router = useRouter();
        const activeUserStore = useActiveUserStore();

        return {
            router,
            activeUserStore
        };
    }
}

</script>