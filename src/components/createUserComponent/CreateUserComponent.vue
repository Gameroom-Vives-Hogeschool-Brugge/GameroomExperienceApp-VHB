<template>
  <div class="createUserContainer">
    <v-card>
        <v-card-title class="dialogTitle">Nieuwe Gebruiker</v-card-title>
        <v-container>
          <v-text-field
            variant="outlined"
            v-model="user.firstName"
            label="Voornaam"
            type="input"
            :rules="rules"
            color="black"
          ></v-text-field>
          <v-text-field
            variant="outlined"
            v-model="user.lastName"
            label="Achternaam"
            type="input"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            variant="outlined"
            v-model="user.idNumber"
            label="Id Nummer"
            type="input"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            variant="outlined"
            v-model="user.cardNumber"
            label="Kaart Nummer"
            type="input"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            variant="outlined"
            v-model="user.email"
            label="Email"
            type="input"
            :rules="isEmailAdress"
          ></v-text-field>
          <v-select
            variant="outlined"
            v-model="user.type"
            :items="types"
            :item-title="(type) => type.type"
            :item-value="(type) => type._id"
            @update:modelValue="user.role = shownRoles[0]._id; user.course = shownCourses[0]._id"
            label="Type"
            required
          ></v-select>
          <v-select
            variant="outlined"
            v-model="user.role"
            :items="shownRoles"
            :item-title="(role) => role.role"
            :item-value="(role) => role._id"
            @update:modelValue="user.course = shownCourses[0]._id; user.type = types[0]._id"
            label="Rol"
            required
          ></v-select>
          <v-select
            variant="outlined"
            v-model="user.course"
            :items="shownCourses"
            :item-title="(course) => course.course"
            :item-value="(course) => course._id"
            @update:modelValue="user.role = shownRoles[0]._id; user.type = types[0]._id"
            label="Opleiding"
            required
          ></v-select>
        </v-container>
        <v-card-actions class="dialogButtons">
          <v-btn variant="outlined" @click="closeDialog()">Sluiten</v-btn>
          <v-btn variant="outlined" @click="createUser()" :disabled="!formisValid" color="success">Opslaan</v-btn>
        </v-card-actions>
      </v-card>
  </div>
</template>

<script lang="ts">
//models
import type { UserRole } from '@/models/activeUser'
import type { UserCourse } from '@/models/activeUser'
import type { UserType } from '@/models/activeUser'
import type { CreateUser } from '@/models/activeUser'

export default {
  name: 'CreateUserComponent',
  props: {
    createUserToggle: Boolean,
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
    }
  },
  emits: ['closeDialog', 'createUser'],
  setup() {
    return {}
  },
  data() {
    return {
      user: {
        idNumber: '',
        firstName: '',
        lastName: '',
        email: '',
        cardNumber: '',
        type: this.types[0]._id,
        role: this.roles[0]._id,
        course: this.courses[0]._id
      } as unknown as CreateUser,
      rules: [(v: string) => !!v || 'Verplicht veld'],
      isEmailAdress: [
        //must be a valid email address
        (v: string) => /.+@.+\..+/.test(v) || 'Email moet een geldig email adres zijn'
      ],
    }
  },
  methods: {
    closeDialog() {
      //emit event to close dialog
      this.$emit('closeDialog')
    },
    createUser() {
      this.$emit('createUser', this.user)
    },
  },
  computed: {
    isProf() {
      //get the _id of type prof
      let profType = this.types.find((type) => type.type === 'Prof')

      //if the user.type is prof, return true
      if (profType && this.user.type === profType._id) {
        return true
      } else {
        return false
      }
    },
    isStudent() {
      //get the _id of type student
      let studentType = this.types.find((type) => type.type === 'Student')

      //if the user.type is student, return true
      if (studentType && this.user.type === studentType._id) {
        return true
      } else {
        return false
      }
    },
    shownRoles() {
        const roles = this.roles

        //check if this.type.type is "Student" and if so, filter out the role that is called "Prof"
        if (this.types.find((type) => type._id === this.user.type)?.type === 'Student'){
          return roles.filter((role) => role.role !== 'Prof')
        }

        //check if this.type.type is "Prof" and if so, filter out the role that is called "Student"
        if (this.types.find((type) => type._id === this.user.type)?.type === 'Prof'){
          return roles.filter((role) => role.role !== 'Student')
        }

      return this.roles
    },
    shownTypes() {
        const types = this.types

        //check if this.role.role is "Prof" and if so, filter out the type that is called "Student"
        if (this.roles.find((role) => role._id === this.user.role)?.role === 'Prof'){
          return types.filter((type) => type.type !== 'Student')
        }

        //check if this.role.role is "Student" and if so, filter out the type that is called "Prof"
        if (this.roles.find((role) => role._id === this.user.role)?.role === 'Student'){
          return types.filter((type) => type.type !== 'Prof')
        }

      return types
    },
    shownCourses() {
        const courses = this.courses

        //check if this.role.role is "Prof" and if so, only display the course that is called "N/A"
        if (this.roles.find((role) => role._id === this.user.role)?.role === 'Prof'){
          return courses.filter((course) => course.course === 'Not Applicable')
        }

      return courses
    },
    formisValid() {
      //check if all fields are filled in and all the rules are met
      return this.user.firstName && this.user.lastName && this.user.idNumber && this.user.cardNumber && this.user.email && this.user.type && this.user.role && this.user.course

    }
  }
}
</script>

<style scoped>

.createUserContainer{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.v-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 95%;
  max-width: 500px;
}

.v-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.v-input {
  width: 90% !important;
}

.dialogTitle {
    margin-bottom: 10px;
    margin-top: 10px;
    text-align: center;
}

.dialogButtons {
    margin-bottom: 10px;
}
</style>
