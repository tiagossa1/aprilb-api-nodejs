# Do NOT change this to alphine. Prisma doesn't work with it.
FROM node:16-slim

ARG PORT

# Dependencies needed for Prisma ORM.
RUN apt-get update
RUN apt-get install -y openssl

# create root application folder
WORKDIR /usr/app

# copy configs to /app folder
COPY package*.json ./
COPY prisma ./prisma/

# copy source code to /app/src folder
COPY . .

# Installing dependencies
RUN npm install

# Compiling the API to JavaScript.
RUN npm run build

# Set working directory.
WORKDIR /usr/app/dist

# Exposing the correct port.
EXPOSE ${PORT}

# Running the command to run migrations and start the API.
CMD [ "npm", "run", "start:migrate:prod" ]
