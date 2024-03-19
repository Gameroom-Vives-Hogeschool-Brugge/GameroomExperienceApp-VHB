<template>
  <NavbarComponent />
  <div class="container">
    <div class="container1">
      <h1>Kies uw naam uit de lijst</h1>
      <h2>Uw kaartnummer wordt aan deze naam gekoppeld en een verificatie email wordt verstuurd.</h2>
    </div>
    <div class="container2">
      <v-sheet>
        <v-form @submit.prevent="register()">
          <v-select
            v-model="student"
            label="Selecteer Uw Naam"
            :items="registeredPersons"
            :item-props="registeredPersonsProps"
            :rules="rules"
          ></v-select>
          <v-btn id="submit-btn" type="submit" color="btn primary-color-btn">Verstuur email</v-btn>
        </v-form>
      </v-sheet>
    </div>
  </div>

  <v-overlay v-model="loading">
    <v-progress-circular indeterminate color="#E00020" bg-color="#DDD"></v-progress-circular>
  </v-overlay>

  <v-dialog v-model="succes" v-if="succes" @click="router.push('/')">
    <v-card>
      <v-card-title>
        <h3>Email succesvol verzonden</h3>
      </v-card-title>
      <v-card-text>
        Een verificatie email is gestuurd naar het emailadres gekoppeld aan deze naam. Gelieve jouw
        account te activeren met de link in de email.
      </v-card-text>
      <v-card-actions>
        <v-btn id="close-btn" @click="router.push('/')" color="btn secondary-color-btn"
          >Terug naar het beginscherm</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="error" v-if="error" @click="router.push('/')">
    <v-card>
      <v-card-title>
        <h3>Fout bij verzending van email</h3>
      </v-card-title>
      <v-card-text>
        Oh oh, er is iets verkeerd gegaan. U wordt terug doorverwezen naar het beginscherm. Gelieve
        opnieuw te proberen.
      </v-card-text>
      <v-card-actions>
        <v-btn id="close-btn" @click="navigateTo('HomeComponent')" color="btn secondary-color-btn"
          >Terug naar het beginscherm</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import registrationService from '@/services/registrationService'
import { useActiveUserStore } from '@/stores/activeUserStore'
import NavbarComponent from '@/components/navbarComponent/NavBarComponent.vue'

interface RegisteredPerson {
  firstName: string
  lastName: string
}

export default {
  name: 'RegistrationComponent',
  components: {
    NavbarComponent
  },
  setup() {
    const RegService: registrationService = new registrationService()
    const activeUserStore = useActiveUserStore()
    const router = useRouter()

    return {
      RegService,
      router,
      activeUserStore
    }
  },
  data() {
    return {
      loading: false,
      succes: false,
      error: false,
      registeredPersons: [] as RegisteredPerson[],
      student: {
        firstName: '',
        lastName: ''
      } as RegisteredPerson | null,
      rules: [
        (value: string) => {
          if (!value) {
            return 'Selecteer Uw Naam'
          }
          return true
        }
      ]
    }
  },
  async created() {
    this.registeredPersons = await this.RegService.getRegistrations()
  },
  methods: {
    registeredPersonsProps(registeredPerson: RegisteredPerson) {
      return {
        title: `${registeredPerson.firstName} ${registeredPerson.lastName}`
      }
    },
    async register() {
      this.loading = true
      //await new Promise((resolve) => setTimeout(resolve, 1000)) //for testing purposes
      const succes = await this.RegService.registerPerson(this.student);
      this.loading = false
      if (succes) {
        this.succes = true
      } else {
        this.error = true
      }
    },
    navigateTo (route: string) {
        if (route == "HomeComponent") {
            this.activeUserStore.resetActiveUser();
            this.activeUserStore.setTemporaryCardNumber("");
            this.activeUserStore.setActiveUserSelected(false);
            this.router.push("/home");
        }
      } 
  }
}
</script>

<style scoped>
v-card {
  width: 50vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding-bottom: 20vh;
}

.container1 {
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
}

.container1 h1,h2 {
  text-align: center;
}

.container2 {
  width: 80%;
  min-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.v-sheet {
  min-width: 300px;
  max-width: 80%;
}

.v-form {
  width: 80%;
  min-width: 300px;
}

.v-card-title,
.v-card-text,
.v-card-actions {
  width: 100%;
  text-align: center;
  align-self: center;
}

.v-card-actions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#close-btn {
  height: 50px !important;
  width: 80%;
  min-width: 250px;
}

#submit-btn {
  width: 100% !important;
  height: 40px !important;
}
</style>
