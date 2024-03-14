import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Room } from '@/models/Rooms'
import type { ObjectId } from 'mongodb'

export const useRoomsStore = defineStore(
  'roomsStore',
  () => {
    const rooms = ref({} as Room[])
    const firstReservableHour = ref(8 as number)
    const lastReservableHour = ref(17 as number) 

    function setRooms(pulledRooms: Room[]): Boolean {
      rooms.value = pulledRooms

      return true
    }

    function getRooms(): Room[] {
      return rooms.value
    }
    
    function getFirstReservableHour(): number {
      return firstReservableHour.value
    }

    function getLastReservableHour(): number {
      return lastReservableHour.value
    }

    function getRoomById(roomId: ObjectId): Room | undefined {
      return rooms.value.find((room) => room._id === roomId)
    }

    function resetRooms(): Boolean {
      rooms.value = {} as Room[]

      return true
    }

    return {
      setRooms,
      getRooms,
      getFirstReservableHour,
      getLastReservableHour,
      getRoomById,
      resetRooms
    }
  },
  {
    persist: true
  }
)
