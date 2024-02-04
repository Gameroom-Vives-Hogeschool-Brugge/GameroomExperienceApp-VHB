<template>
    <div>
        <StreamBarcodeReader
        @decode="onDecode"
        @onLoad="onLoaded"
        style="width: 1000px; height: 1000px;"
        ></StreamBarcodeReader>
    </div>
    <RouterLink to="/">Terug</RouterLink>  
</template>

<script setup lang="ts">
import { RouterLink} from 'vue-router'
import { StreamBarcodeReader } from "vue-barcode-reader";
import { useRouter } from 'vue-router'
//eslint-disable-next-line
import LoginService from '../services/LoginService'

const router = useRouter()
const loginService = new LoginService()

const onDecode = async (Text: string) => {
    await loginService.login(Text)
    router.push('/home')
    console.log(`Decode text from QR code is ${Text}`)
}

const onLoaded = () => {
}
</script>