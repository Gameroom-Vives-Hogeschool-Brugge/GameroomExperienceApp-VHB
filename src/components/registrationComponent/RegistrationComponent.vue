<template>

    <v-sheet  width="300" class="mx-auto">
        <v-form @submit.prevent = "register()">
            <v-select v-model=student label="Selecteer Uw Naam" :items="registeredPersons" :item-props="registeredPersonsProps" :rules="rules"></v-select>
            <v-btn type="submit" block class="mt-2">Submit</v-btn>
        </v-form>
    </v-sheet>

    <v-overlay v-model="loading">
        <v-progress-circular indeterminate color="#E00020" bg-color="#DDD" :size="500"></v-progress-circular>
    </v-overlay>
</template>

<script lang="ts">
import registrationService from '@/services/registrationService';

interface RegisteredPerson {
    firstName: string;
    lastName: string;
}

export default {
    name: 'RegistrationComponent',
    components: {
    },
    setup() {
        const RegService: registrationService = new registrationService();

        return {
            RegService
        }
    },
    data() {
        return {
            loading: false,
            registeredPersons: [] as RegisteredPerson[],
            student: null as RegisteredPerson | null,
            rules: [
                    (value: string) => {
                    if (!value) {
                        return 'Selecteer Uw Naam';
                    }
                    return true;
                }
            ]
        }
    },
    async created() {
        this.registeredPersons = await this.RegService.getRegistrations(); 
    },
    methods: {
        registeredPersonsProps (registeredPerson: RegisteredPerson) {
            return {
                title: `${registeredPerson.firstName} ${registeredPerson.lastName}`
            }
        },
        async register() {
            this.loading = true;
            this.RegService.registerPerson(this.student);
            this.loading = false; 
        }
    },
}


</script>