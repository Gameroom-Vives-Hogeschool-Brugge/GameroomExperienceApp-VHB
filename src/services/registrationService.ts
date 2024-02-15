import axios from "axios";
import type { RegistrationPerson } from "../models/Registrations";

export default class RegistrationService {
    constructor() {
    }

    async register(): Promise<void> {
        console.log("Registering...");
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

    async registerPerson(person: RegistrationPerson): Promise<void> {
        const response = await axios.post("http://localhost:3000/registrations", person, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}