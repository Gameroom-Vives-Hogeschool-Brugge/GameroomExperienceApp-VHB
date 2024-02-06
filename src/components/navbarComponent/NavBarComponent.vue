<template>
        <v-app-bar>
            <v-app-bar-title id="navBarTitle">Welkom {{ firstName }} {{ lastName }}</v-app-bar-title>
        </v-app-bar>
</template>

<script lang="ts">
export default {
  name: 'NavBarComponent',
  setup() {
    return {
        
    };
  },
  data:() => {
    return {
        firstName: "Olivier",
        lastName: "Van Ransbeeck"
    };
  }
}


</script>