//services
import EncryptionService from './encryptionService'

//models
import type { FullUser, UserRole, UserCourse, UserType, CreateUser } from '@/models/activeUser'
import type { ObjectId } from 'bson'

//imports
import axios, { type AxiosResponse } from 'axios'

export default class AdminService {
    usersApiLink : string
    rolesApiLink: string
    typesApiLink: string
    coursesApiLink: string
    encryptionService: EncryptionService

    constructor() {
        this.usersApiLink = import.meta.env.VITE_USERS_URL
        this.rolesApiLink = import.meta.env.VITE_ROLES_URL
        this.typesApiLink = import.meta.env.VITE_TYPES_URL
        this.coursesApiLink = import.meta.env.VITE_COURSES_URL
        this.encryptionService = new EncryptionService()
    }

    async getAllUsers(): Promise<FullUser[]> {
        //get request to the server
        const response = await axios.get(this.usersApiLink) as AxiosResponse

        //decrypt the response
        const users = this.encryptionService.decryptObject(response.data) as FullUser[]
        
        return users
    }

    async createUser(createUser : CreateUser): Promise<number> {
        //encrypt the user object
        const encryptedUser = this.encryptionService.encryptObject(createUser)

        //post request to the server
        const response = await axios.post(this.usersApiLink,  {encryptedUser: encryptedUser}, {
            headers: {
                "Content-Type": "application/json",
            },
        })

        //check if the response is successful
        return response.status
    }

    async deleteUser(userId: ObjectId): Promise<number> {
        //encrypt the user object
        const encryptedUserId = this.encryptionService.encrypt(userId.toString())

        //delete request to the server
        const response = await axios.delete(this.usersApiLink, {
            data: {
                encryptedUserId: userId
            },
            headers: {
                "Content-Type": "application/json",
            },
        })

        //check if the response is successful
        return response.status
    }

    async updateUser(user: FullUser): Promise<number> {
        //encrypt the user object
        const encryptedUser = this.encryptionService.encryptObject(user)

        //put request to the server
        const response = await axios.put(this.usersApiLink, {encryptedUser: encryptedUser}, {
            headers: {
                "Content-Type": "application/json",
            },
        })

        //check if the response is successful
        return response.status
    }

    async getAllTypes(): Promise<UserType[]> {
        //get request to the server
        const response = await axios.get(this.typesApiLink) as AxiosResponse

        //decrypt the response
        const types = this.encryptionService.decryptObject(response.data) as UserType[]
        
        return types
    }

    async getAllRoles(): Promise<UserRole[]> {
        //get request to the server
        const response = await axios.get(this.rolesApiLink) as AxiosResponse

        //decrypt the response
        const roles = this.encryptionService.decryptObject(response.data) as UserRole[]
        
        return roles
    }

    async getAllCourses(): Promise<UserCourse[]> {
        //get request to the server
        const response = await axios.get(this.coursesApiLink) as AxiosResponse

        //decrypt the response
        const courses = this.encryptionService.decryptObject(response.data) as UserCourse[]
        
        return courses
    }
}