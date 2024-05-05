# Game Room Experience App Vives Hogeschool Brugge

[![Made with Docker](https://img.shields.io/badge/Made_with-Docker-blue?logo=docker&logoColor=white)](https://www.docker.com/ "Go to Docker homepage")
[![Made with TypeScript](https://img.shields.io/badge/TypeScript-4-blue?logo=typescript&logoColor=white)](https://typescriptlang.org "Go to TypeScript homepage")
[![Made with Vue](https://img.shields.io/badge/Vue-3-blue?logo=vue.js&logoColor=white)](https://v3.vuejs.org "Go to Vue homepage")

Welcome, this application is the frontend of the Game Room Experience Reservation and Door Access application. This server should be therefore used in conjunction with the backend that can be found here -> [Backend](https://github.com/Gameroom-Vives-Hogeschool-Brugge/GameRoomExperienceServer-VHB).

The Game Room Experience Reservation and Door Access application allows you to create, update and control reservations for the Game Experience Room. Furthermore it is connected to a electrically controlled door which you can open if you have a valid reservation at that time.

## Team

[Olivier Van Ransbeeck]([Olivier Van Ransbeeck - Brussels Metropolitan Area | Professional Profile | LinkedIn](https://www.linkedin.com/in/oliviervanransbeeck/))

## Example video

## Features

- User Login control

- User Registration control

- Fetch Reservations

- Create and Delete Reservations

- Create, Update and Delete Users

- Fetch Roles, Types, Courses and Rooms

- Open the access door

- Monitor the application via logfiles

- Encrypt outgoing data, decrypt incoming data

- Verify users via verification emails

- Parses excel file with the registered students

- Uses Cronjobs and Puppeteer for automatic email attachment fetching

- Uses Cronjobs for automatic database cleaning

- Stores and fetches data from a mongoDb database

# Configuration and Installation

## Cloning the repository

```bash
git clone https://github.com/Gameroom-Vives-Hogeschool-Brugge/GameroomExperienceApp-VHB.git
```

## Configuration before deploying

1. Copy the environment variables file (.env) to the main application folder.

### Deploy all containers

```bash
docker-compose up --build -d
```

## Containers

### App

The is a Vue.js application

### Nginx

This is an open-source webserving software.

## Important Maps

### Views

These are big components which have their own route.

### Components

These are the smaller components which are being used by the Views.

### Models

These are the typescript models the application uses.

### Plugins

The Vuetify Plugin in defined here

### Router

This folder holds the index file containing the routes.

### Stores

Here the Pinia stores are defined which are used in the application.

### Services

This contains the services which talk to the backend. They fetch and post information.
