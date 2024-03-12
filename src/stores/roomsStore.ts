import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Room } from '@/models/Rooms'

export const useRoomsStore = defineStore(
  'roomsStore',
  () => {
    const rooms = ref({} as Room[])

    function setRooms(pulledRooms: Room[]): Boolean {
      rooms.value = pulledRooms

      return true
    }

    function getRooms(): Room[] {
      return rooms.value
    }

    function restetRooms(): Boolean {
      rooms.value = {} as Room[]

      return true
    }

    return {
      setRooms,
      getRooms,
      restetRooms
    }
  },
  {
    persist: true
  }
)
