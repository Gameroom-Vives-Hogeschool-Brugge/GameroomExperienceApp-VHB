import axios from 'axios'
import { useActiveUserStore} from '@/stores/activeUserStore'
import type { Reservation, SubmittedTimeSlot, NewReservation } from "@/models/Reservations";
import type { ObjectId } from 'bson'

export default class reservationsService {
  reservationsApiLink: string
  myReservationsApiLink: string
  activeUserStore: ReturnType<typeof useActiveUserStore>

  constructor() {
    this.reservationsApiLink = import.meta.env.VITE_RESERVATIONS_URL
    this.myReservationsApiLink = import.meta.env.VITE_MY_RESERVATIONS_URL
    this.activeUserStore = useActiveUserStore();
  }

  // Get all reservations in the database
 async getAllReservations(): Promise<Reservation[]> {
    const reservationsResponse = await axios.get(this.reservationsApiLink)
    const reservations = reservationsResponse.data as Reservation[]
    
    return reservations
 }

 // Get all reservations for a specific user
 async getReservationsByUserId(userId: ObjectId): Promise<Reservation[]> {
    const reservationsResponse = await axios.post(this.myReservationsApiLink, {
      userId: userId
    },
    {headers: {
      "Content-Type": "application/json",
    }})
    const reservations = reservationsResponse.data as Reservation[]

    return reservations
 }

 // Delete a reservation by its id
 async deleteReservation(reservationId: ObjectId): Promise<number> {
    const body = {
      reservationId: reservationId
    }
    const response = await axios.delete(this.reservationsApiLink, {data: body})

    return response.status
 }

 // Create a new reservation
 async createReservation(submittedTimeSlot : SubmittedTimeSlot): Promise<number> {
    const user = this.activeUserStore.getActiveUser()

    const newReservation = {
      roomId: submittedTimeSlot.roomId,
      date: submittedTimeSlot.date,
      duration: submittedTimeSlot.duration,
      userId: user._id
    } as unknown as NewReservation

    const response = await axios.post(this.reservationsApiLink, newReservation, {headers: {
      "Content-Type": "application/json",
    }})

    return response.status
 }
}