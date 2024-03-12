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
    room: ObjectId,
    date: Date,
    duration: number,
    user: ObjectId
}

export interface SelectedTimeSlot {
    room : Room,
    date : Date,
    reservationHour : string
}

export interface CreatedTimeSlot {
    room : Room,
    date : string,
    reservationHour : string,
    duration: number,
}

export interface SubmittedTimeSlot {
    room : ObjectId,
    date : Date,
    duration: number,
}

