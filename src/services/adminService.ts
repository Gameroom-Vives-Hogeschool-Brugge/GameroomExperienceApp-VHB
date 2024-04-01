import EncryptionService from './encryptionService'
import type { FullUser, UserRole, UserCourse, UserType } from '@/models/activeUser'
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