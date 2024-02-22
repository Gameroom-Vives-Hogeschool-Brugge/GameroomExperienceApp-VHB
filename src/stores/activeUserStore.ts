import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ActiveUser } from '@/models/activeUser'

export const useActiveUserStore = defineStore('activeUserStore', () => {
  const activeUser = ref({} as ActiveUser)
  const activeUserSelected = ref(<Boolean>false)
  const temporaryCardNumber = ref<string | undefined>('')

  function setActiveUser(newActiveUser: ActiveUser): Boolean {
    activeUser.value = newActiveUser
    activeUserSelected.value = true
    return true
  }
  function setTemporaryCardNumber(cardNumber: string | undefined): void {
    temporaryCardNumber.value = cardNumber
  }

  function setActiveUserSelected(isActiveUser: Boolean): void {
    activeUserSelected.value = isActiveUser
  }

  function getActiveUser(): ActiveUser {
      return activeUser.value
  }
  
  function getTemporaryCardNumber(): string | undefined {
    return temporaryCardNumber.value
  }

  function getActiveUserid(): string | null | Boolean {
    if (activeUserSelected.value) {
      return activeUser.value.id
    } else {
      return false
    }
  }

  function getActiveUserSelected(): Boolean {
    return activeUserSelected.value
  }

  function resetActiveUser(): void {
    activeUser.value = {} as ActiveUser
  }

  function resetTemporaryCardNumber(): void {
    temporaryCardNumber.value = ''
  }

  function resetActiveUserSelected(): void {
    activeUserSelected.value = false
  }

  function logOut(): void {
    activeUser.value = {} as ActiveUser
    activeUserSelected.value = false
    temporaryCardNumber.value = ''
  }

  return {
    activeUser,
    activeUserSelected,
    temporaryCardNumber,
    setActiveUser,
    setTemporaryCardNumber,
    getActiveUser,
    getTemporaryCardNumber,
    getActiveUserid,
    logOut,
    getActiveUserSelected,
    resetActiveUser,
    resetTemporaryCardNumber,
    resetActiveUserSelected,
    setActiveUserSelected
  }  
},{
  persist: true,
  
})
