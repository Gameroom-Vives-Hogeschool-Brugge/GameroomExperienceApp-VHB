//import
import axios from 'axios'

//services
import EncryptionService from './encryptionService'

//models
import type { LogFile } from '../models/logFile'

export default class LoggerService {
    apiLink: string
    encryptionService: EncryptionService

    constructor() {
        this.apiLink = import.meta.env.VITE_LOGFILES_URL
        this.encryptionService = new EncryptionService()
      }

    async getAllLogs(): Promise<[LogFile]> {
        const response = await axios.get(this.apiLink)
        const encryptedData = response.data
        const data = this.encryptionService.decryptObject(encryptedData) as [LogFile]

        console.log(data)

        return data
    }
}