import axios from 'axios'
import { useActiveUserStore} from '@/stores/activeUserStore'
import { useRoomsStore } from '@/stores/roomsStore'
import type { Room } from "@/models/Rooms";
import type { Reservation, SubmittedTimeSlot, NewReservation } from "@/models/Reservations";

export default class reservationsService {
  roomsApiLink: string
  reservationsApiLink: string
  activeUserStore: ReturnType<typeof useActiveUserStore>
  roomsStore: ReturnType<typeof useRoomsStore>

  constructor() {
    this.roomsApiLink = 'http://localhost:3000/rooms'
    this.reservationsApiLink = 'http://localhost:3000/reservations'
    this.roomsStore = useRoomsStore();
    this.activeUserStore = useActiveUserStore();
  }

  async getAllRooms(): Promise<Room[]> {
    const response = await axios.get(this.roomsApiLink)
    const rooms = response.data as Room[]

    this.roomsStore.setRooms(rooms)

    return rooms
 }

 async getAllReservations(): Promise<Reservation[]> {
    const reservationsResponse = await axios.get(this.reservationsApiLink)
    const reservations = reservationsResponse.data as Reservation[]

    return reservations
 }

 async createReservation(submittedTimeSlot : SubmittedTimeSlot): Promise<void> {
    const user = this.activeUserStore.getActiveUser()
    const newReservation = {
      room: submittedTimeSlot.room,
      date: submittedTimeSlot.date,
      duration: submittedTimeSlot.duration,
      user: user.id
    } as unknown as NewReservation

    console.log(newReservation)

    // TO POST THE NEW RESERVATION TO THE API
 }
}