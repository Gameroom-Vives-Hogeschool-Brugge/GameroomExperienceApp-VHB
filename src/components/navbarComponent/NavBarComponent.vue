<template>
        <v-app-bar>
            <v-app-bar-title id="navBarTitle">Welkom {{ activeUser.firstName }} {{ activeUser.lastName }}</v-app-bar-title>
        </v-app-bar>
</template>

<script lang="ts">
import type { ActiveUser } from '@/models/activeUser';
import { useActiveUserStore } from '@/stores/activeUserStore';

export default {
  name: 'NavBarComponent',
  setup() {
    const activeUserStore = useActiveUserStore();
    const activeUser: ActiveUser = activeUserStore.activeUser;

    return {
        activeUserStore,
        activeUser
    };
  },
}


</script>