<template>
    <div v-if="!loading">
        <StreamBarcodeReader
        @decode="onDecode"
        @onLoad="onLoaded"
        style="width: 1000px; height: 1000px;"
        ></StreamBarcodeReader>
    </div>
    <v-overlay v-model="loading">
        <v-progress-circular indeterminate color="#E00020" bg-color="#DDD"></v-progress-circular>
    </v-overlay>
    <RouterLink to="/" v-if="!loading">Terug</RouterLink>  
</template>

<script lang="ts">
import { RouterLink} from 'vue-router'
import { StreamBarcodeReader } from "vue-barcode-reader";
import { useRouter } from 'vue-router'
import LoginService from '../services/loginService'

export default {
    name: 'QRCodeReader',
    components: {
        StreamBarcodeReader
    },
    setup() {
        const loginService: LoginService = new LoginService();
        const router = useRouter()

        return {
            loginService,
            router
        }
    },
    data() {
        return {
            loading: false
        }
    },
    methods: {
        async onDecode(Text: string) {
            this.loading = true;
            const response = await this.loginService.login(Text)
            this.loading = false;

            if (response.responseCode === 299) {
                console.log("Student Kortrijk")
                const cardnumber = response.data
                this.router.push("/Registration")

                //naar registratiepagina
            } else if (response.responseCode === 298){
                console.log("Prof")
                console.log(response.data)

                //naar registratiepagina
                this.router.push("/Registration")
            } else if (response.responseCode === 297){
                console.log("Logged In")
                console.log(response.data)

                //naar personalPagepagina
                this.router.push("/PersonalPage")
            } else if (response.responseCode === 401) {
                console.log("Not a Valid Student or Prof")
                console.log(response.data)

                //naar homepagina
                this.router.push('/home')
            } else {
                console.log("Card not found or invalid cardnumber")
                console.log(response.data)

                //naar homepagina
                this.router.push('/home')
            }
        },
        onLoaded() {
        }
    }
}

</script>