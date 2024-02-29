import axios from "axios";
import type { RegistrationPerson } from "../models/Registrations";
import { useActiveUserStore } from "@/stores/activeUserStore";
import EncryptionService from "./encryptionService";

export default class RegistrationService {
    activeUserStore: any;
    encryptionService: EncryptionService;
    
    constructor() {
        this.activeUserStore = useActiveUserStore();
        this.encryptionService = new EncryptionService();
    }

    async getRegistrations(): Promise<RegistrationPerson[]> {
        const response = await axios.get("http://localhost:3000/registrations", {
            headers: {
                "Content-Type": "application/json",
            },
        });

        const decryptedRegistrations = this.encryptionService.decryptObject(response.data) as RegistrationPerson[];

        return decryptedRegistrations;
    }

    async registerPerson(person: RegistrationPerson | null): Promise<Boolean> {
        const response = await axios.post("http://localhost:3000/registrations", 
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