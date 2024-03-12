import type { ActiveUser } from '@/models/activeUser'
import axios from 'axios'
import { useActiveUserStore} from '@/stores/activeUserStore'
import EncryptionService from './encryptionService'

export default class LoginService {
  apiLink: string
  activeUserStore: ReturnType<typeof useActiveUserStore>
  encryptionService: EncryptionService

  constructor() {
    this.apiLink = 'http://localhost:3000/login'
    this.activeUserStore = useActiveUserStore();
    this.encryptionService = new EncryptionService()
  }

  async login(link: string): Promise<number> {
    const EncryptedLink = this.encryptionService.encrypt(link)

    try {
      const response = await axios.post(
        this.apiLink,
        { encryptedLink: EncryptedLink },
        { headers: { 'Content-Type': 'application/json'}}
      )

      if (response.status === 297) {
        const descryptedActiveUser = this.encryptionService.decryptObject(response.data) as ActiveUser
        this.activeUserStore.setActiveUser(descryptedActiveUser)
        this.activeUserStore.activeUserSelected = true
      }

      return response.status

    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return error.response?.status || 500
      } else {
        return 500
      }
    }
  }
}
