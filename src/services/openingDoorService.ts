import axios from "axios";
import { useActiveUserStore } from "@/stores/activeUserStore";

export default class OpeningDoorService {
    activeUserStore: ReturnType<typeof useActiveUserStore>

    constructor() {
        this.activeUserStore = useActiveUserStore();
    }

    async openDoor(): Promise<number> {
        const response = await axios.post("http://localhost:3000/opendoor",
        {
            _id: this.activeUserStore.getActiveUserMongoId(),
        },
        {
            headers: {
                "Content-Type": "application/json",
            }
        });

        return response.status;
    }
}