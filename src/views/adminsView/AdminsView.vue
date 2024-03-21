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
      <v-btn class="btn primary-color-btn" @click="navigateTo('Reservations')"
        >Maak Nieuwe Reservatie</v-btn
      >
    </div>
    <div class="headerContainer">
      <h1>Admin Paneel</h1>
    </div>

    <div class="container">
      <div class="container1">
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
            title="Profs"
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
      <div class="container3">
        <div class="container5">
          <!-- A list with all the reservations -->
          <!-- ability to change the information of a reservation-->
          <!-- ability to delete a reservation-->
        </div>
        <div class="container6">
          <!-- Ability to add a reservation-->
          <!-- choose a student-->
          <!-- choose a room-->
          <!-- choose a date-->
          <!-- choose a time-->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'

//components
import NavBarComponent from '@/components/navbarComponent/NavBarComponent.vue'
import UsersListComponent from '@/components/usersListComponent/UsersListComponent.vue'

//services
import ReservationsService from '@/services/reservationsService'
import RoomsService from '@/services/roomsService'

//models
import type { Reservation } from '@/models/Reservations'
import type { Room } from '@/models/Rooms'
import { ObjectId } from 'mongodb'
import AdminService from '@/services/adminService'
import type { FullUser, UserCourse, UserRole, UserType } from '@/models/activeUser'

export default {
  name: 'AdminsView',
  components: {
    NavBarComponent,
    UsersListComponent
  },
  setup() {
    const router = useRouter()
    const reservationsService = new ReservationsService()
    const roomsService = new RoomsService()
    const adminService = new AdminService()

    return {
      router,
      reservationsService,
      roomsService,
      adminService
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
      loadReservations: true,
      loadRooms: true
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

.headingContainer {
        display: flex;
        align-items: center;
        justify-content: center;
        height:8vh;
        width: 100%;
}

.container {
  display: flex;
  justify-content: start;
  padding-top: 0px !important;
  align-items: start !important;
  border: 1px solid black;
}

.container1 {
  width: 50vw;
  border: 1px solid black;
}

.container2 {
  width: 80%;
}
</style>
