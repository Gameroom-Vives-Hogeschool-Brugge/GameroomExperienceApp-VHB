#Step 1 Build the file
FROM node:21.6.1-alpine3.19 as build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

#Step 2 Run the file
FROM nginx:1.25.3-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

