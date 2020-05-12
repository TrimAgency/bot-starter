# Specify a base image
FROM node:14.1.0-buster AS buster
RUN npm install -g nodemon

WORKDIR /app
# Run all the code from here
# COPY ["package.json", "yarn.lock", "/app/"]
COPY package.json .
COPY yarn.lock .

# Install dependencies
RUN yarn install

# Copy the code
COPY . .

RUN yarn build

EXPOSE 4000
EXPOSE 3000
