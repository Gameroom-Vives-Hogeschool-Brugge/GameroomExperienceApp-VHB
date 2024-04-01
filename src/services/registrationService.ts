import axios from "axios";
import type { RegistrationPerson } from "../models/Registrations";
import { useActiveUserStore } from "@/stores/activeUserStore";
import EncryptionService from "./encryptionService";

export default class RegistrationService {
    activeUserStore: any;
    encryptionService: EncryptionService;
    registrationsApiLink: string;
    
    constructor() {
        this.activeUserStore = useActiveUserStore();
        this.encryptionService = new EncryptionService();
        this.registrationsApiLink = import.meta.env.VITE_REGISTRATIONs_URL;
    }

    async getRegistrations(): Promise<RegistrationPerson[]> {
        const response = await axios.get(this.registrationsApiLink, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        const decryptedRegistrations = this.encryptionService.decryptObject(response.data) as RegistrationPerson[];

        return decryptedRegistrations;
    }

    async registerPerson(person: RegistrationPerson | null): Promise<Boolean> {
        const response = await axios.post(this.registrationsApiLink, 
        {
            person: person,
            cardNumber: this.activeUserStore.getTemporaryCardNumber(),
            role: "Student",
            type: "Student"
        }, {
            headers: {
                "Content-Type": "application/json",
            },
        })

        if (response.status !== 201) {
            return false;   
        } else {
            return true;
        }
    }
}