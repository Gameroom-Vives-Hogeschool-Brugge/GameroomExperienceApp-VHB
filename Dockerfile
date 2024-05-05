#Step 1 Build the file
FROM node:21.6.1-alpine3.19 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

#Step 2 Run the file
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Copy the nginx configuration file
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

