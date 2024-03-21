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

export interface FullUser {
    _id: ObjectId;
    idNumber: string;
    cardNumber: string;
    firstName: string;
    lastName: string;
    email: string;
    course: ObjectId;
    role: ObjectId;
    type: ObjectId;
    token: string;
    verified: boolean;
}

export interface UserType {
    _id: ObjectId;
    type: string;
}

export interface UserRole {
    _id: ObjectId;
    role: string;
}

export interface UserCourse {
    _id: ObjectId;
    course: string;
    description: string;
    location: string;
}