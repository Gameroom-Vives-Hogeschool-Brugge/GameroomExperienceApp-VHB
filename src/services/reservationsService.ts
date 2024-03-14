import axios from 'axios'
import { useActiveUserStore} from '@/stores/activeUserStore'
import type { Reservation, SubmittedTimeSlot, NewReservation } from "@/models/Reservations";

export default class reservationsService {
  reservationsApiLink: string
  activeUserStore: ReturnType<typeof useActiveUserStore>

  constructor() {
    this.reservationsApiLink = 'http://localhost:3000/reservations'
    this.activeUserStore = useActiveUserStore();
  }

 async getAllReservations(): Promise<Reservation[]> {
    const reservationsResponse = await axios.get(this.reservationsApiLink)
    const reservations = reservationsResponse.data as Reservation[]

    return reservations
 }

 async createReservation(submittedTimeSlot : SubmittedTimeSlot): Promise<void> {
    const user = this.activeUserStore.getActiveUser()

    const newReservation = {
      roomId: submittedTimeSlot.roomId,
      date: submittedTimeSlot.date,
      duration: submittedTimeSlot.duration,
      userId: user._id
    } as unknown as NewReservation

    // TO POST THE NEW RESERVATION TO THE API
    const response = await axios.post(this.reservationsApiLink, newReservation, {headers: {
      "Content-Type": "application/json",
    }})

    console.log(response.data)

 }
}