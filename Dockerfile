# Specify a base image
FROM node:14.1.0-buster AS buster
RUN npm install -g nodemon

# Run all the code from here
WORKDIR /app

# Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install

# Copy the code
COPY . .

RUN yarn build

EXPOSE 4000
