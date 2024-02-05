<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const dialog = defineModel({ type: Boolean })


const navigateTo = (route: string) => {
  if (route === 'QrcodeReader') {
    router.push({ name: route });
  } else {
    router.push({ name: 'Home' });
  }
  console.log(route);
  router.push({ name: route });
}
</script>

<template>
  <div class="top-left-image-container">
    <img alt="Vives Hogeschool Logo" src="../assets/images/VivesHogeschool.png" />
  </div>

  <div class="container">
    <div class="container1">
      <h1>Welkom</h1>
      <h2>Gelieve uw QR Code op uw studentkaart in te scannen.</h2>
    </div>
    <div class="container2">
      <v-btn @click="navigateTo('QrcodeReader')" class="btn primary-color-btn">QRH Code Scannen</v-btn>
      <v-btn @click="dialog = true" color="btn tertiary-color-btn" > Hulp Nodig?
        <v-dialog v-model="dialog" class="v-model">
          <v-card>
            <v-card-text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </v-card-text>
            <v-card-actions>
              <v-btn color="btn secondary-color-btn dialog-btn" block @click="dialog = false">Close Dialog</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-btn>
    </div>
  </div>

  
    
</template>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .container1 {
    width: 90%;
    height: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .container1 h2 {
    text-align: center;
  }

  .container2 {
    height: 50%;
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }

  .dialog-btn {
    width: 40% !important;
  }


  .v-btn--size-default {
    width: 100% !important;
    height: 20% !important;
  }

 
  .top-left-image-container {
    position: absolute;
    top: 0; 
    left: 0; 
    width: 100%; 
    height: 100%;
    z-index: -1; 
  }

  .top-left-image-container img {
    position: absolute;
    width: 20%;
    min-width: 150px;
    top: 0px;
  }

  .v-model {
    width: 50%;
    min-height: 500px;
  }

</style>
