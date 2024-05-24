<template>
  <div class="listContainer">
    <div class="header">
      <h2>{{ title }}</h2>
    </div>
    <v-list class="usersContainer">
      <v-list-item v-for="user in users" :key="user._id.toString()">
        <v-list-item-title>{{ user.firstName }} {{ user.lastName }}</v-list-item-title>
        <v-list-item-subtitle><strong>Id Nummer: </strong>{{ user.idNumber }}</v-list-item-subtitle>
        <v-list-item-subtitle
          ><strong>Kaart Nummer: </strong>{{ user.cardNumber }}</v-list-item-subtitle
        >
        <v-list-item-subtitle><strong>Email: </strong>{{ user.email }}</v-list-item-subtitle>
        <v-list-item-subtitle
          ><strong>Type: </strong>{{ getTypeDescription(user.type) }}</v-list-item-subtitle
        >
        <v-list-item-subtitle v-if="title != 'Proffen'"
          ><strong>Opleiding: </strong>{{ getCourseDescription(user.course) }}</v-list-item-subtitle
        >
        <v-list-item-subtitle
          ><strong>Rol: </strong>{{ getRoleDescription(user.role) }}</v-list-item-subtitle
        >
        <div class="userButtons">
          <!-- ability to change the information of a user-->
          <v-btn color="warning" variant="outlined" @click="openEditDialog(user)">Aanpassen</v-btn>
          <!-- ability to delete a user-->
          <v-btn color="error" variant="outlined" @click="openDeleteDialog(user._id)" id="deletebutton"
            >Verwijderen</v-btn
          >
        </div>
      </v-list-item>
    </v-list>

    <v-dialog v-model="editDialog">  
      <v-card>
        <v-card-title class="dialogTitle">WIJZIG GEBRUIKER</v-card-title>
        <v-container>
          <v-text-field
            variant="outlined"
            v-model="firstName"
            label="Voornaam"
            type="input"
            color="black"
          ></v-text-field>
          <v-text-field
            variant="outlined"
            v-model="lastName"
            label="Achternaam"
            type="input"
          ></v-text-field>
          <v-text-field
            variant="outlined"
            v-model="idNumber"
            label="Id Nummer"
            type="input"
          ></v-text-field>
          <v-text-field
            variant="outlined"
            v-model="cardNumber"
            label="Kaart Nummer"
            type="input"
          ></v-text-field>
          <v-text-field
            variant="outlined"
            v-model="email"
            label="Email"
            type="input"
          ></v-text-field>
          <v-select
            variant="outlined"
            v-model="type"
            :items="types"
            :item-title="(type) => type.type"
            :item-value="(type) => type._id"
            @update:modelValue="role = shownRoles[0]._id; course = shownCourses[0]._id"
            label="Type"
            required
          ></v-select>
          <v-select
            variant="outlined"
            v-model="role"
            :items="shownRoles"
            :item-title="(role) => role.role"
            :item-value="(role) => role._id"
            @update:modelValue="course = shownCourses[0]._id; type = types[0]._id"
            label="Rol"
            required
          ></v-select>
          <v-select
            variant="outlined"
            v-model="course"
            :items="shownCourses"
            :item-title="(course) => course.course"
            :item-value="(course) => course._id"
            @update:modelValue="role = shownRoles[0]._id; type = types[0]._id"
            label="Opleiding"
            required
          ></v-select>
        </v-container>
        <v-card-actions class="dialogButtons">
          <v-btn variant="outlined" @click="editDialog = false">Sluiten</v-btn>
          <v-btn variant="outlined" @click="saveUser()" color="success">Opslaan</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog">
      <v-card class="deleteCard">
        <v-card-title  class="deleteTitle">Weet u zeker dat u deze gebruiker wilt verwijderen?</v-card-title>
        <v-card-actions>
          <v-btn variant="outlined" @click="deleteDialog = false">Nee</v-btn>
          <v-btn variant="outlined" color="error" @click="deleteUser()">Ja</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
//models
import type { FullUser, UserCourse, UserRole, UserType } from '@/models/activeUser'
import type { ObjectId } from 'bson'

//services

//components

export default {
  name: 'UsersListComponent',
  components: {},
  props: {
    users: {
      type: Array as () => FullUser[],
      required: true
    },
    title: {
      type: String,
      required: true
    },
    roles: {
      type: Array as () => UserRole[],
      required: true
    },
    types: {
      type: Array as () => UserType[],
      required: true
    },
    courses: {
      type: Array as () => UserCourse[],
      required: true
    },
  },
  emits: ['delete-user', 'update-editedUser'],
  setup() {
    return {}
  },
  data() {
    return {
      editDialog: false,
      userId: '' as unknown as ObjectId,
      firstName: '' as string,
      lastName: '' as string,
      idNumber: '' as string,
      cardNumber: '' as string,
      email: '' as string,
      type: '' as unknown as ObjectId,
      course: '' as unknown as ObjectId,
      role: '' as unknown as ObjectId,
      deleteDialog: false,
      userToDelete: null as unknown as ObjectId
    }
  },
  async mounted() {},
  computed: {
    shownRoles() {
        const roles = this.roles

        //check if this.type.type is "Student" and if so, filter out the role that is called "Prof"
        if (this.types.find((type) => type._id === this.type)?.type === 'Student'){
          return roles.filter((role) => role.role !== 'Prof')
        }

        //check if this.type.type is "Prof" and if so, filter out the role that is called "Student"
        if (this.types.find((type) => type._id === this.type)?.type === 'Prof'){
          return roles.filter((role) => role.role !== 'Student')
        }

      return this.roles
    },
    shownTypes() {
        const types = this.types

        //check if this.role.role is "Prof" and if so, filter out the type that is called "Student"
        if (this.roles.find((role) => role._id === this.role)?.role === 'Prof'){
          return types.filter((type) => type.type !== 'Student')
        }

        //check if this.role.role is "Student" and if so, filter out the type that is called "Prof"
        if (this.roles.find((role) => role._id === this.role)?.role === 'Student'){
          return types.filter((type) => type.type !== 'Prof')
        }

      return types
    },
    shownCourses() {
        const courses = this.courses

        //check if this.role.role is "Prof" and if so, only display the course that is called "N/A"
        if (this.roles.find((role) => role._id === this.role)?.role === 'Prof'){
          return courses.filter((course) => course.course === 'Not Applicable')
        }

      return courses
    }
  },
  methods: {
    getTypeDescription(typeId: ObjectId): string | undefined {
      return this.types.find((type) => type._id === typeId)?.type
    },
    getRoleDescription(roleId: ObjectId): string | undefined {
      return this.roles.find((role) => role._id === roleId)?.role
    },
    getCourseDescription(courseId: ObjectId): string | undefined {
      return this.courses.find((course) => course._id === courseId)?.course
    },
    openDeleteDialog(userId: ObjectId) {
      this.userToDelete = userId

      this.deleteDialog = true
    },
    openEditDialog(user: FullUser) {
      this.userId = user._id
      this.firstName = user.firstName
      this.lastName = user.lastName
      this.idNumber = user.idNumber
      this.email = user.email
      this.cardNumber = user.cardNumber
      this.type = user.type
      this.course = user.course
      this.role = user.role

      this.editDialog = true
    },
    deleteUser() {
      this.$emit('delete-user', this.userToDelete)
      this.deleteDialog = false
    },
    saveUser() {
      const editedUser = {
        _id: this.userId,
        firstName: this.firstName,
        lastName: this.lastName,
        idNumber: this.idNumber,
        cardNumber: this.cardNumber,
        email: this.email,
        type: this.type,
        course: this.course,
        role: this.role
      }

      this.$emit('update-editedUser', editedUser)
      this.editDialog = false
    },
  }
}
</script>

<style scoped>
#deletebutton {
  margin-left: 10px;
}
.listContainer {
  display: flex;
  flex-direction: column;
  margin-top: 2vh;
  padding-top: 5px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
}

.usersContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 90vw;
}
.header {
  display: flex;
  justify-content: center;
  text-align: center;
}

.userButtons {
  margin-top: 10px;
  padding-bottom: 5px;
}

.v-dialog {
  max-width: 500px;
}

.v-input {
  width: 80% !important;

}

.dialogTitle {
    margin-bottom: 10px;
    margin-top: 10px;
}

.dialogButtons {
    margin-bottom: 10px;
}

.v-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.v-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.v-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
}

.v-list-item {
  margin-top: 5px;
  max-width: 40vw;
  max-width: 500px;
  border: 1px solid black;
  border-radius: 5px;
  margin: 10px;
}

.v-list-item-subtitle {
  margin-top: 3px;
  word-wrap: break-word;
  white-space: normal;
  text-overflow: ellipsis;
}

.deleteCard {
  display: flex;
  flex-direction: column;
  align-items: start;
  max-width: 500px;
  padding-top: 10px;
  padding-bottom: 10px;
}

.deleteTitle {
  white-space: normal;
}

@media screen and (max-width: 800px) {
  #deletebutton {
    margin-left: 0px;
  }

  .usersContainer {
    width: 100%;
  }
  
  .v-list-item {
    min-width: 300px;
  }

  .userButtons {
    display: flex;
    flex-direction: column;
    height: 100px;
    justify-content: space-evenly;
  }

  
}
</style>
