<template>
        <v-app-bar id="navBar">
            <v-app-bar-title id="navBarTitle">Welkom {{ activeUser.firstName }} {{ activeUser.lastName }}</v-app-bar-title>
            <v-app-bar-title v-if="screenWidth >= 700" id="navBarTime">Huidige Tijd: {{ currentTime }}</v-app-bar-title>
        </v-app-bar>
</template>

<script lang="ts">
import type { ActiveUser } from '@/models/activeUser';
import { useActiveUserStore } from '@/stores/activeUserStore';

export default {
  name: 'NavBarComponent',
  setup() {
    const activeUserStore = useActiveUserStore();
    const activeUser: ActiveUser = activeUserStore.getActiveUser();

    return {
        activeUserStore,
        activeUser
    };
  },
  created() {
    setInterval(() => {
        this.currentTime = new Date().toLocaleTimeString();
    }, 1000);
  },
  data() {
    return {
        currentTime: new Date().toLocaleTimeString()
    }
  },
  computed: {
    screenWidth() {
        return window.innerWidth;
    }
  }
}


</script>

<style scoped>
#navBar {
    display: flex;
    justify-content: space-between;
}

#navBarTitle {
    padding: 2%;
}

#navBarTime {
  text-align: right;
  padding: 2%;
}

</style>