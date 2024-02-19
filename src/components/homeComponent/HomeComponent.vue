<script lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useActiveUserStore } from '@/stores/activeUserStore';

export default {
  name: 'HomeComponent',
  setup() {
    const dialog = ref(false);
    const extra = ref(false);
    const router = useRouter();
    const activeUserStore = useActiveUserStore();

    const navigateToQrCodeReader = () => {
      router.push("/QrcodeReader");
    };

    return {
      dialog,
      navigateToQrCodeReader,
      extra,
      activeUserStore
    };
  }
}
</script>

<template>
  <div class="top-left-image-container">
    <img alt="Vives Hogeschool Logo" src="../../assets/images/VivesHogeschool.png" />
  </div>

  <div class="container">
    <div class="container1">
      <h1>Welkom</h1>
      <h2>Gelieve uw QR Code op uw studentenkaart te scannen.</h2>
    </div>
    <div class="container2">
      <v-btn @click="navigateToQrCodeReader()" class="btn primary-color-btn">QR Code Scannen</v-btn>
      <v-btn id="dialog-btn" @click="dialog = true" color="btn tertiary-color-btn" >Hulp Nodig?
        <v-dialog v-model="dialog" v-if="dialog">
          <v-card>
            <v-card-text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </v-card-text>
            <v-card-actions>
              <v-btn id="close-btn" @click="dialog = false" color="btn secondary-color-btn">Close Dialog</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-btn>
    </div>
  </div>

</template>

<style scoped>

  #close-btn {
    height: 50px !important;
  }
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    z-index: 2;
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
    z-index: 0; 
  }

  .top-left-image-container img {
    position: absolute;
    width: 20%;
    min-width: 150px;
    top: 0px;
    opacity: 0.3 !important;
  }

  .v-model {
    width: 50%;
    min-height: 500px;
  }

</style>
