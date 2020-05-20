# Specify a base image
FROM node:14.1.0-buster AS buster

# Run all the code from here
WORKDIR /app

# Copy and Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install

# Copy the code
COPY . .

RUN yarn build

EXPOSE 4000
