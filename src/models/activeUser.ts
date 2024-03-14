import { ObjectId } from 'mongodb';

export interface ActiveUser {
    _id: ObjectId;
    idNumber: string | null;
    firstName: string | null;
    lastName: string | null;
    type: string | null;
    role: string | null;
}

export interface User {
    _id: ObjectId,
    firstName: string,
    lastName: string,
}