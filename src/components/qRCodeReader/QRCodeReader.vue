<template>
    <div class="container">
        <div class="container1">
            <div class="buttonContainer">
                <v-btn id="back-btn" color="btn primary-color-btn" @click="router.push('/')">Terug</v-btn>
            </div>
            <div class="title">
                <h2>Gelieve uw QR code te scannen op de achterkant van uw kaart.</h2>
            </div>
        </div>
        <div class="container2">
            <qrcode-stream @detect="onDetect"></qrcode-stream>          
        </div>
    </div>
    <v-overlay v-model="loading">
        <v-progress-circular indeterminate color="#E00020" bg-color="#DDD"></v-progress-circular>
    </v-overlay>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import LoginService from '../../services/loginService'
import { QrcodeStream } from 'vue-qrcode-reader'
import { useActiveUserStore } from '@/stores/activeUserStore'

export default {
    name: 'QRCodeReader',
    components: {
        QrcodeStream
    },
    setup() {
        const loginService: LoginService = new LoginService();
        const router = useRouter()
        const activeUserStore = useActiveUserStore();

        return {
            loginService,
            router,
            activeUserStore
        }
    },
    data() {
        return {
            loading: false,
        }
    },
    methods: {
        async onDetect(detectedObject: Object) {
            const Text = (detectedObject as any[])[0].rawValue;
            this.loading = true;
            const response = await this.loginService.login(Text)
            this.loading = false;

            if (response === 299) {
                console.log("Student Kortrijk")
                //naar registratiepagina
                this.router.push("/Registration") 
            } else if (response === 298){
                console.log("Prof")
                //naar registratiepagina
                this.router.push("/Registration")
            } else if (response === 297){
                console.log("Logged In")
                //naar personalPagepagina
                this.router.push("/PersonalPage")
            } else if (response === 401) {
                console.log("Not a Valid Student or Prof")
                //naar homepagina
                this.router.push('/home')
            } else {
                console.log("Card not found or invalid cardnumber")
                //naar homepagina
                this.router.push('/home')
            }
        },
        onLoaded() {
        }
  },
  onUnmounted() {
    console.log("unmounted");
  }
}

</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
}

.container1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 50px;
    max-height: 20%;
    width: 100%;
}

.buttonContainer {
    display: flex;
    align-self: center;
    margin-bottom: 50px;
}

.title {
    display: flex;
    align-self: center;
    min-width: 300px;
    max-width: 80%;

}

.container2 {
    min-width: 300px;
    max-height: 80%;
    width: 80vw;
}



#back-btn {
    width: 80%;
    min-width: 250px;
    height: 50px;
}
</style>