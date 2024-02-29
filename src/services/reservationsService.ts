import axios from 'axios'
import { useActiveUserStore} from '@/stores/activeUserStore'
import type { Room } from "@/models/Rooms";

export default class reservationsService {
  roomsApiLink: string
  reservationsApiLink: string
  activeUserStore: ReturnType<typeof useActiveUserStore>

  constructor() {
    this.roomsApiLink = 'http://localhost:3000/rooms'
    this.reservationsApiLink = 'http://localhost:3000/reservations'
    this.activeUserStore = useActiveUserStore();
  }

  async getAllRooms(): Promise<Room[]> {
    const response = await axios.get(this.roomsApiLink)
    const rooms = response.data as Room[]
    return rooms
 }

 async getAllReservations(): Promise<void> {
    const response = await axios.get(this.reservationsApiLink)
 }
}