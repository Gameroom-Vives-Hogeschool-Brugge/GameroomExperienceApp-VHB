import axios from "axios";
import { useActiveUserStore } from "@/stores/activeUserStore";

export default class OpeningDoorService {
    activeUserStore: ReturnType<typeof useActiveUserStore>
    doorsApiLink: string

    constructor() {
        this.activeUserStore = useActiveUserStore();
        this.doorsApiLink = import.meta.env.VITE_OPEN_DOOR_URL;
    }

    async openDoor(): Promise<number> {
        const response = await axios.post(this.doorsApiLink,
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