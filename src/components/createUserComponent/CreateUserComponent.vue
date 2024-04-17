<template>
  <div class="createUserContainer">
    <v-sheet>
      <v-form @submit.prevent="createUser" v-model="isFormValid">
        <v-text-field v-model="user.idNumber" :rules="rules" label="Id Nummer" required></v-text-field>
        <v-text-field v-model="user.firstName" :rules="rules" label="Voornaam" required></v-text-field>
        <v-text-field v-model="user.lastName" :rules="rules" label="Achternaam" required></v-text-field>
        <v-text-field v-model="user.email" :rules="isEmailAdress" label="Email" required></v-text-field>
        <v-text-field v-model="user.cardNumber" :rules="rules" label="Kaartnummer" required></v-text-field>

        <v-select
          v-model="user.type"
          :items="types"
          :item-title="(userType: UserType) => userType.type"
          :item-value="(userType: UserType) => userType._id"
          :rules="rules"
          label="Type"
          required
        ></v-select>
        <v-select
          v-model="user.role"
          :items="shownRoles()"
          :item-title="(userRole: UserRole) => userRole.role"
          :item-value="(userRole: UserRole) => userRole._id"
          :rules="rules"
          label="Role"
          required
        ></v-select>
        <v-select
          v-model="user.course"
          :items="shownCourses()"
          :item-title="(userCourse: UserCourse) => userCourse.course"
          :item-value="(userCourse: UserCourse) => userCourse._id"
          :rules="rules"
          label="Course"
          required
        ></v-select>
        <v-btn id="close-btn" @click="closeDialog()" color="btn secondary-color-btn"
          >Annuleren</v-btn
        >
        <v-btn id="save-btn" @click="createUser()" :disabled="!isFormValid" color="btn primary-color-btn">Opslaan</v-btn>
      </v-form>
    </v-sheet>
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
      rules: [
        (v: string) => !!v || 'Verplicht veld',
      ],
      isEmailAdress : [
        //must be a valid email address
        (v: string) => /.+@.+\..+/.test(v) || 'Email moet een geldig email adres zijn'
      ],
        isFormValid: false
    }
  },
  methods: {
    closeDialog() {
      //emit event to close dialog
      this.$emit('closeDialog')
    },
    createUser() {
      this.$emit("createUser", this.user)
    },
    //depending on the type of user, show the correct courses
    shownCourses() {
      //if the user.type is prof, autoselect the NotApplicable course
      if (this.isProf) {
        //set the course to Not Applicable
        this.user.course = this.courses.find((course) => course.course === 'Not Applicable')!._id

        //return only the Not Applicable course
        return this.courses.filter((course) => course.course === 'Not Applicable')
      } else if (this.isStudent) {
        //set the course to PBA Electronica-ICT (Kortrijk) (AO)
        this.user.course = this.courses.find(
          (course) => course.course === 'PBA Electronica-ICT (Kortrijk) (AO)'
        )!._id

        //return all courses except the Not Applicable course
        return this.courses.filter((course) => course.course !== 'Not Applicable')
      } else {
        return this.courses
      }
    },
    //depending on the type of user, show the correct roles
    shownRoles() {
      if (this.isProf) {
        //set the role to Prof
        this.user.role = this.roles.find((role) => role.role === 'Prof')!._id

        //return all roles except the Student role
        return this.roles.filter((role) => role.role !== 'Student')
      } else if (this.isStudent) {
        //set the role to Student
        this.user.role = this.roles.find((role) => role.role === 'Student')!._id

        //return all roles except the Prof role
        return this.roles.filter((role) => role.role !== 'Prof')
      } else {
        return this.roles
      }
    }
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
    }
  }
}
</script>


<style scoped>

.createUserContainer {
  max-width: 50vw !important;
  min-width: 400px;
}

</style>
