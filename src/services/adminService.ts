import EncryptionService from './encryptionService'
import type { FullUser, UserRole, UserCourse, UserType } from '@/models/activeUser'
import axios, { type AxiosResponse } from 'axios'

export default class AdminService {
    apiLink: string
    encryptionService: EncryptionService

    constructor() {
        this.apiLink = 'http://localhost:3000/'
        this.encryptionService = new EncryptionService()
    }

    async getAllUsers(): Promise<FullUser[]> {
        //get request to the server
        const response = await axios.get(this.apiLink + "users") as AxiosResponse

        //decrypt the response
        const users = this.encryptionService.decryptObject(response.data) as FullUser[]
        
        return users
    }

    async getAllTypes(): Promise<UserType[]> {
        //get request to the server
        const response = await axios.get(this.apiLink  + "types") as AxiosResponse

        //decrypt the response
        const types = this.encryptionService.decryptObject(response.data) as UserType[]
        
        return types
    }

    async getAllRoles(): Promise<UserRole[]> {
        //get request to the server
        const response = await axios.get(this.apiLink + "roles") as AxiosResponse

        //decrypt the response
        const roles = this.encryptionService.decryptObject(response.data) as UserRole[]
        
        return roles
    }

    async getAllCourses(): Promise<UserCourse[]> {
        //get request to the server
        const response = await axios.get(this.apiLink + "courses") as AxiosResponse

        //decrypt the response
        const courses = this.encryptionService.decryptObject(response.data) as UserCourse[]
        
        return courses
    }
}