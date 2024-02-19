import axios from "axios";
import type { RegistrationPerson } from "../models/Registrations";
import { useActiveUserStore } from "@/stores/activeUserStore";

export default class RegistrationService {
    constructor() {
        const activeUserStore = useActiveUserStore();
    }

    async getRegistrations(): Promise<RegistrationPerson[]> {
        const response = await axios.get("http://localhost:3000/registrations", {
            headers: {
                "Content-Type": "application/json",
            },
        });

        const registrations: RegistrationPerson[] = response.data;
        return registrations;
    }

    async registerPerson(person: RegistrationPerson | null): Promise<Boolean> {
        const response = await axios.post("http://localhost:3000/registrations", {
            person: person
        }, {
            headers: {
                "Content-Type": "application/json",
            },
        })

        console.log(response)

        if (response.status !== 201) {
            return false;   
        } else {
            return true;
        }
    }
}