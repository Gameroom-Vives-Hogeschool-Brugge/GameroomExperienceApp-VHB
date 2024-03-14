import axios from 'axios'
import { useRoomsStore } from '@/stores/roomsStore'
import type { Room } from '@/models/Rooms'

export default class RoomsService {
  roomsApiLink: string
  roomsStore: ReturnType<typeof useRoomsStore>

  constructor() {
    this.roomsApiLink = 'http://localhost:3000/rooms'
    this.roomsStore = useRoomsStore()
  }

  async getAllRooms(): Promise<void> {
    const response = await axios.get(this.roomsApiLink)
    const rooms = response.data as Room[]

    this.roomsStore.setRooms(rooms)
  }

  async getRooms(): Promise<Room[]> {
    return this.roomsStore.getRooms()
  }

  async getFirstAndLastReservationHour(): Promise<{first: number, last : number}> {
    return {first: this.roomsStore.getFirstReservableHour(), last: this.roomsStore.getLastReservableHour()}
  }
}
