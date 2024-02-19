import { defineStore } from 'pinia'
import type { ActiveUser } from '@/models/activeUser'


export const useActiveUserStore =  defineStore("activeUserStore", {
    state: () => {
        return {
            activeUser: {} as ActiveUser,
            activeUserSelected: false as Boolean,
            temporaryCardNumber: "" as string | undefined
        }
    },
    actions : {
        //set the active user
        setActiveUser(activeUser: ActiveUser) : Boolean {
            this.activeUser = activeUser
            this.activeUserSelected = true
            return true
        },
        //set the temporary card number
        setTemporaryCardNumber(cardNumber: string | undefined) : void {
            this.temporaryCardNumber = cardNumber
        },
        //get the active user
        getActiveUser() : ActiveUser | Boolean{
            if (this.activeUserSelected) {
                return this.activeUser          
            } else {
                return false
            }
        },
        //get the temporary card number
        getTemporaryCardNumber() : string | undefined {
            return this.temporaryCardNumber
        },
        //get the active user's username
        getActiveUserid() : string | null | Boolean{
            if (this.activeUserSelected) {
                return this.activeUser.id
            } else {
                return false
            }
        },
        //get the active user's role
        getActiveUserRole() : string | Boolean | null{
            if (this.activeUserSelected) {
                return this.activeUser.role
            } else {
                return false
            }
        },
        //return true if an active user is selected
        getActiveUserSelected() : Boolean {
            return this.activeUserSelected
        },
        // reset the active user
        resetActiveUser() : void {
            this.activeUser = {
                id: null,
                firstName: null,
                lastName: null,
                type: null,
                role: null
            }
        },
        resetUserSelected() : void {
            this.activeUserSelected = false
        },
        //reset temporary card number
        resetTemporaryCardNumber() : void {
            this.temporaryCardNumber = ""
        },
        //logout the active user, delete the api key, delete the geolocation api key and set activeUserSelected boolean to false
        logout() : void {
            this.resetActiveUser()
            this.resetUserSelected()
            this.resetTemporaryCardNumber()
        }
    },
    //persist the active user and active user selected boolean for use on page refresh
    persist: {
        paths: ["activeUser", "activeUserSelected"]
    },
})

export type PiniaStore<T extends (...args: any) => any> = Omit<
  ReturnType<T>,
  keyof ReturnType<typeof defineStore>
>;