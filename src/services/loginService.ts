import type { ActiveUser } from '@/models/activeUser'
import axios from 'axios'
import { useActiveUserStore} from '@/stores/activeUserStore'
import type { PiniaStore } from '@/stores/activeUserStore'

export default class LoginService {
  apiLink: string
  activeUserStore: PiniaStore<typeof useActiveUserStore>

  constructor() {
    this.apiLink = 'http://localhost:3000/login'
    this.activeUserStore = useActiveUserStore();
  }

  async login(link: string): Promise<number> {
    const response = await axios.post(
      this.apiLink,
      { link: link },
      { headers: { 'Content-Type': 'application/json'}}
    )

    if (response.status === 297) {
      const activeUser = response.data as ActiveUser
      this.activeUserStore.setActiveUser(activeUser)

      const cardNumber = link.split("/").pop();
      this.activeUserStore.setTemporaryCardNumber(cardNumber)
      
      this.activeUserStore.activeUserSelected = true
    }

    return response.status
  }
}
