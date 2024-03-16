import axios from 'axios'
import { useRoomsStore } from '@/stores/roomsStore'
import type { Room } from '@/models/Rooms'
import type { ObjectId } from 'mongodb'

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

  async getFirstAndLastReservationHour(roomId: ObjectId): Promise<{first: number, last : number}> {
    return {first: this.roomsStore.getFirstReservableHour(roomId), last: this.roomsStore.getLastReservableHour(roomId)}
  }
}