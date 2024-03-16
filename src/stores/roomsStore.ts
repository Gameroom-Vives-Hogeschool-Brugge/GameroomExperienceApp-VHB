import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Room } from '@/models/Rooms'
import type { ObjectId } from 'mongodb'

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
    
    function getFirstReservableHour(roomId: ObjectId): number {
      const room = rooms.value.find((room) => room._id === roomId)

      if (room === undefined) {
        return 12
      } else {
        const earliestReservationTime = parseInt(room.earliestReservationTime.split(':')[0])
        
        return earliestReservationTime
      }
    }

    function getLastReservableHour(roomId: ObjectId): number {
      const room = rooms.value.find((room) => room._id === roomId)

      if (room === undefined) {
        return 12
      } else {

        const latestReservationTime = parseInt(room.latestReservationTime.split(':')[0])
        return latestReservationTime
      }
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
