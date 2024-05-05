<template>
  <div class="top-left-image-container">
    <img alt="Vives Hogeschool Logo" src="../../assets/images/VivesHogeschool.png" />
  </div>

  <div class="container">
    <div class="container1">
      <h1>Welkom op {{ title }}</h1>
      <h2>Gelieve de QR Code op uw studentenkaart te scannen.</h2>
    </div>
    <div class="container2">
      <v-btn @click="navigateToQrCodeReader()" class="btn primary-color-btn mainButton"
        >QR Code Scannen</v-btn
      >
      <v-btn class="mainButton" @click="dialog = true" color="btn tertiary-color-btn"
        >Hulp Nodig?
      </v-btn>
      <v-dialog v-model="dialog" v-if="dialog">
        <v-card class="dialogCard">
          <div>
            <v-card-title class="dialogTitle">
              Gelieve bij problemen of vragen contact op te nemen met onderstaande personen.
            </v-card-title>
          </div>
          <div class="container4">
            <v-card-text class="container5">
              <!--image of person-->
              <v-avatar size="150">
                <v-img alt="Pedro Calleeuw" src="src\assets\images\P_Calleeuw.jpeg"></v-img>
              </v-avatar>
              <v-card-title>Pedro Calleeuw</v-card-title>
              <v-card-actions>
                <v-btn variant="outlined" href="mailto:pedro.calleeuw@vives.be"
                  >pedro.calleeuw@vives.be</v-btn
                >
              </v-card-actions>
            </v-card-text>
            <v-card-text class="container5">
              <v-avatar size="150">
                <v-img alt="Ronny Mees" src="src\assets\images\R_Mees.jpeg"></v-img>
              </v-avatar>
              <v-card-title>Ronny Mees</v-card-title>
              <v-card-actions>
                <v-btn variant="outlined" class="infoBtn" href="mailto:ronny.mees@vives.be"
                  >ronny.mees@vives.be</v-btn
                >
              </v-card-actions>
            </v-card-text>
          </div>
          <v-card-actions class="container6">
            <v-btn id="close-btn" @click="dialog = false" color="btn secondary-color-btn"
              >Close Dialog</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>

  <div class="alerts">
    <v-alert
      v-if="bruggeError"
      text="Je lijkt geen student van Brugge te zijn. Gelieve contact op te nemen via de 'Hulp Nodig' knop onderaan."
      title="Geen student van Brugge?"
      type="error"
    ></v-alert>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useActiveUserStore } from '@/stores/activeUserStore'

export default {
  name: 'HomeView',
  setup() {
    const dialog = ref(false)
    const extra = ref(false)
    const router = useRouter()
    const activeUserStore = useActiveUserStore()

    const navigateToQrCodeReader = () => {
      router.push('/QrcodeReader')
    }

    return {
      dialog,
      navigateToQrCodeReader,
      extra,
      activeUserStore
    }
  },
  data() {
    return {
      title: 'het Gameroom Experience Reservatie Systeem',
      bruggeError: false
    }
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
}

#close-btn {
  height: 50px !important;
  width: 90% !important;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  height: 90vh;
  z-index: 0;
  background-color: #f5f5f5;
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


.container4 {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.container5 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.container6 {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.container7 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.infoBtn {
  height: 50px !important;
}
.mainButton {
  width: 100% !important;
  height: 20% !important;
}

.top-left-image-container {
  height: 20vh;
  background-color: #f5f5f5;
}

.top-left-image-container img {
  position: absolute;
  width: 20%;
  min-width: 150px;
  top: 0px;
  opacity: 0.3 !important;
  z-index: 2;
}

.dialogCard {
  max-width: 800px;
}

.dialogTitle {
  text-align: center;
  text-wrap: wrap;
}

.alerts {
  z-index: 2;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.v-alert {
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
}
</style>
