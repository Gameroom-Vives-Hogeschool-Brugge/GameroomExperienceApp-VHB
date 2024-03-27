<template>
  <NavBarComponent />
  <div class="mainContainer">
    <div class="buttonContainer">
      <v-btn
        id="routeToPersonalPage"
        class="btn tertiary-color-btn backButton"
        @click="navigateTo('PersonalPage')"
        >Terug</v-btn
      >
      <v-btn class="btn primary-color-btn" @click=" displayUsers()"
        >Toon Gebruikers</v-btn>
      <v-btn class="btn primary-color-btn" @click="displayReservations()"
        >Toon Reservaties</v-btn>
      <v-btn class="btn primary-color-btn" @click="displayLogs()"
        >Toon Logs</v-btn
      >
    </div>
    <div class="headerContainer">
      <h1>Admin Paneel | {{ shownContainer }}</h1>
    </div>

    <div class="container">
      <div  v-if="showUsers" class="users">
        <div class="container3">
          <!-- A list with all the students -->
          <UsersListComponent
            :users="getStudents"
            title="Studenten"
            :roles="roles"
            :types="types"
            :courses="courses"
          />
          <!-- A list with all the exceptions -->
          <UsersListComponent
            :users="getProfs"
            title="Proffen"
            :roles="roles"
            :types="types"
            :courses="courses"
          />
          <!-- A list with all the profs -->
          <UsersListComponent
            :users="getExceptions"
            title="Uitzonderingen"
            :roles="roles"
            :types="types"
            :courses="courses"
          />
        </div>
        <div class="container4">
          <!-- Ability to add a person-->
          <!-- choose between type: student, exception or prof-->
          <!-- choose between role: admin, prof or student-->
        </div>
      </div>
      <div v-if="showReservations" class="reservations">
        <div v-for="room of rooms" :key="room._id.toString()" class="container5">
          <ReservationsListComponent
            @reservation-Deleted="reservationDeleted"
            :reservations="filterReservationsOnRoomId(room._id as ObjectId)"
            :rooms="[room]"
            :title="room.description "
            :loading="loading"
            :nameGiven="true"
            
          />
        </div>
        <div class="container6">
          <!-- Ability to add a reservation-->
          <!-- choose a student-->
          <!-- choose a room-->
          <!-- choose a date-->
          <!-- choose a time-->
        </div>
      </div>
      <div v-if="showLogs && !loading" class="logs">
          <v-select
              label="Select"
              :items="logFiles"
              :item-title="item => item.name"
              :item-value="item => item"
              v-model="selectedLogFile"
          ></v-select>
        <div v-if="selectedLogFile" class="container7">
          <LogsListComponent :logFile="selectedLogFile" :loading="loading" />
        </div>
        
        <!-- A list with all the logs of that category -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'

//components
import NavBarComponent from '@/components/navbarComponent/NavBarComponent.vue'
import UsersListComponent from '@/components/usersListComponent/UsersListComponent.vue'
import ReservationsListComponent from '@/components/reservationsListComponent/ReservationsListComponent.vue'
import LogsListComponent from '@/components/logsListComponent/LogListComponent.vue'

//services
import ReservationsService from '@/services/reservationsService'
import RoomsService from '@/services/roomsService'
import AdminService from '@/services/adminService'
import LoggerService from "@/services/loggerService"

//models
import type { Reservation } from '@/models/Reservations'
import type { Room } from '@/models/Rooms'
import type { LogFile } from '@/models/logFile'
import { ObjectId } from 'mongodb'
import type { FullUser, UserCourse, UserRole, UserType } from '@/models/activeUser'

//stores
import { useActiveUserStore } from '@/stores/activeUserStore'

export default {
  name: 'AdminsView',
  components: {
    NavBarComponent,
    UsersListComponent,
    ReservationsListComponent,
    LogsListComponent
  },
  setup() {
    const router = useRouter()

    //services
    const reservationsService = new ReservationsService()
    const roomsService = new RoomsService()
    const adminService = new AdminService()
    const loggerService = new LoggerService()

    //stores
    const activeUserStore = useActiveUserStore()

    return {
      router,
      reservationsService,
      roomsService,
      adminService,
      loggerService,
      activeUserStore
    }
  },
  data() {
    return {
      reservations: [] as Reservation[],
      rooms: [] as Room[],
      users: [] as FullUser[],
      types: [] as UserType[],
      roles: [] as UserRole[],
      courses: [] as UserCourse[],
      logFiles: [{}] as LogFile[],
      selectedLogFile: {} as LogFile,
      loadReservations: true,
      loadRooms: true as boolean,
      showUsers: true as boolean,
      showReservations: false as boolean,
      showLogs: false,
      loading: true,
      showLoadIcon: true
    }
  },
  async mounted() {
    //get all reservations
    this.reservations = await this.reservationsService.getAllReservations()

    //get all rooms
    await this.roomsService.getAllRooms()
    this.rooms = this.roomsService.getRooms() as Room[]

    this.users = await this.adminService.getAllUsers()
    this.types = (await this.adminService.getAllTypes()) as UserType[]
    this.roles = (await this.adminService.getAllRoles()) as UserRole[]
    this.courses = (await this.adminService.getAllCourses()) as UserCourse[]

    //get all logs
    this.logFiles = await this.loggerService.getAllLogs() as LogFile[]
    this.selectedLogFile = this.logFiles[0] as LogFile

    this.loading = false;
    this.showLoadIcon = false;
  },
  computed: {
    getStudents(): FullUser[] {
      //get the _id of type student
      const typeId = this.types.find((type) => type.type === 'Student')?._id as ObjectId

      //filter the users to only get the students
      return this.users.filter((user) => user.type === typeId)
    },
    getProfs(): FullUser[] {
      //get the _id of type prof
      const typeId = this.types.find((type) => type.type === 'Prof')?._id as ObjectId

      //filter the users to only get the profs
      return this.users.filter((user) => user.type === typeId)
    },
    getExceptions(): FullUser[] {
      //get the _id of type exception
      const typeId = this.types.find((type) => type.type === 'Exception')?._id as ObjectId

      //filter the users to only get the exceptions
      return this.users.filter((user) => user.type === typeId)
    },
    shownContainer() : string {
      if (this.showUsers) {
        return 'Alle Gebruikers'
      } else if (this.showReservations) {
        return 'Alle Reservaties'
      } else if (this.showLogs) {
        return 'Alle Logs'
      } else {
        return ''
      }
    }
  },
  methods: {
    navigateTo(route: string) {
      if (route == 'PersonalPage') {
        this.router.push('/PersonalPage')
      } else if (route == 'Reservations') {
        this.router.push('/Reservations')
      }
    },
    async createReservation() {
      this.router.push('/NewReservation')
    },
    displayLogs(): void {
      this.showUsers = false
      this.showReservations = false
      this.showLogs = true
    },
    displayUsers(): void {
      this.showUsers = true
      this.showReservations = false
      this.showLogs = false
    },
    displayReservations(): void {
      this.showUsers = false
      this.showReservations = true
      this.showLogs = false
    },
    filterReservationsOnRoomId(roomId: ObjectId): Reservation[] {
      return this.reservations.filter((reservation) => reservation.room._id === roomId)
    },
    async reservationDeleted() : Promise<void> {
        await this.reservationsService.getReservationsByUserId(this.activeUserStore.getActiveUser()._id).then((response) => {
            this.reservations = response as Reservation[]
        })
    }
  }
}
</script>

<style scoped>
navbarComponent {
  height: 10vh;
}

.mainContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 10vh !important;
}

.buttonContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 8vh;
    width: 100%;
}

.buttonContainer > .btn {
    margin: 0 5px;
}

.headingContainer {
        display: flex;
        align-items: center;
        justify-content: center;
        height:8vh;
        width: 100%;
}

.headingContainer > h1 {
    text-align: center;
}

.container {
  display: flex;
  justify-content: start;
  padding-top: 0px !important;
  align-items: start !important;
  margin-top: 10px;
  background-color: white;
}

.users {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
}

</style>
