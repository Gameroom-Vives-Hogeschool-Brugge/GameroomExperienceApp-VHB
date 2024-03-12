import { ObjectId } from 'mongodb';

export interface Rooms {
    rooms: Room[]
}

export interface Room {
    _id: ObjectId,
    description: string,
    maxStudents: number,
    earliestReservationTime: string
    latestReservationTime: string
    roomNumber: number
}