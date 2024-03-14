import { ObjectId } from 'mongodb';
import type { Room } from './Rooms';
import type { User } from './activeUser';

export interface Reservation {
    _id: ObjectId,
    room: Room,
    date: Date,
    duration: number,
    user: User
}

export interface NewReservation {
    roomId: ObjectId,
    date: Date,
    duration: number,
    userId: ObjectId
}

export interface SelectedTimeSlot {
    roomId : ObjectId,
    date : Date,
    reservationHour : string
}

export interface CreatedTimeSlot {
    roomId : ObjectId,
    date : string,
    reservationHour : string,
    duration: number,
}

export interface SubmittedTimeSlot {
    roomId : ObjectId,
    date : Date,
    duration: number,
}

