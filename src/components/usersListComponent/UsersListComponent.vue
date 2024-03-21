<template>
    <div class="listContainer">
        <div class="header">
            <h2>{{ title }}</h2>
        </div>
        <v-list>
                <v-list-item v-for="user in users" :key="user._id.toString()" @click=editUser(user)>
                    <v-list-item-title>{{ user.firstName }} {{ user.lastName }}</v-list-item-title>
                    <v-list-item-subtitle><strong>Id Nummer: </strong>{{ user.idNumber }}</v-list-item-subtitle>
                    <v-list-item-subtitle><strong>Email: </strong>{{ user.email }}</v-list-item-subtitle>
                    <v-list-item-subtitle><strong>Type: </strong>{{ getTypeDescription(user.type) }}</v-list-item-subtitle>
                    <v-list-item-subtitle v-if="title != 'Profs'"><strong>Opleiding: </strong>{{ getCourseDescription(user.course)}}</v-list-item-subtitle>
                    <v-list-item-subtitle><strong>Rol: </strong>{{ getRoleDescription(user.role) }}</v-list-item-subtitle>
                    <div class="buttons">
                        <!-- ability to change the information of a user-->
                        <v-btn color="warning" variant="outlined" @click=editUser(user)>Edit</v-btn>
                        <!-- ability to delete a user-->
                        <v-btn color="error" variant="outlined" @click=deleteUser(user._id) id="deletebutton">Delete</v-btn>
                    </div>
                </v-list-item>
        </v-list>

        <v-dialog v-model="editDialog">
            <v-card>
                <v-card-title>Wijzig Gebruiker</v-card-title>
                    <v-container>
                        <v-text-field variant="outlined" v-model="firstName" label="Voornaam" type="input" color="black"></v-text-field>
                        <v-text-field variant="outlined" v-model="lastName" label="Achternaam" type="input"></v-text-field>
                        <v-text-field variant="outlined" v-model="idNumber" label="Id Nummer" type="input"></v-text-field>
                        <v-text-field variant="outlined" v-model="email" label="Email" type="input"></v-text-field>
                        <v-select variant="outlined" v-model="type" :items="types" :item-title="(type) => type.type" :item-value="(type) => type._id" label="Type" required></v-select>
                        <v-select variant="outlined" v-model="course" :items="courses" :item-title="(course) => course.course" :item-value="(course) => course._id" label="Opleiding" required></v-select>
                        <v-select variant="outlined" v-model="role" :items="roles" :item-title="(role) => role.role" :item-value="(role) => role._id" label="Rol" required></v-select>
                    </v-container>
                <v-card-actions>
                    <v-btn variant="outlined" @click="editDialog = false">Cancel</v-btn>
                    <v-btn variant="outlined" @click=saveUser() color="success">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts">
//models
import type { FullUser, UserCourse, UserRole, UserType } from '@/models/activeUser'
import { ObjectId } from 'mongodb'

//services

//components

//
    export default {
        name: 'UsersListComponent',
        components: {
        },
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
            }
        },
        setup() {
            return {
            }
        },
        data() {
            return {
                editDialog: false,
                firstName: '' as string,
                lastName: '' as string,
                idNumber: '' as string,
                email: '' as string,
                type: '' as unknown as ObjectId,
                course: '' as unknown as ObjectId,
                role: '' as unknown as ObjectId
            }
        },
        async mounted() {
        },
        methods: {
            getTypeDescription (typeId: ObjectId): string | undefined {
                return this.types.find(type => type._id === typeId)?.type
            },
            getRoleDescription (roleId: ObjectId): string | undefined {
                return this.roles.find(role => role._id === roleId)?.role
            },
            getCourseDescription (courseId: ObjectId): string | undefined {
                return this.courses.find(course => course._id === courseId)?.course
            },
            editUser (user: FullUser) {
                this.firstName = user.firstName
                this.lastName = user.lastName
                this.idNumber = user.idNumber
                this.email = user.email
                this.type = user.type
                this.course = user.course
                this.role = user.role
                this.editDialog = true
            },
            deleteUser (userId: ObjectId) {
                console.log(userId)
            },
            saveUser () {
                console.log(this.firstName)
                console.log(this.lastName)
                console.log(this.idNumber)
                console.log(this.email)
                console.log(this.type)
                console.log(this.course)
                console.log(this.role)
            }
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
    }
    .header {
        display: flex;
        justify-content: center;
        text-align: center;
    }

    .buttons {
        margin-top: 10px;
    }

    .v-dialog {
        width: 500px;
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
    }

    .v-list-item {
        margin-top: 5px;
    }

    .v-list-item-subtitle{
        margin-top: 3px;
    }

    
</style>