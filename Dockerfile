# Specify a base image
FROM node:14.1.0-buster AS buster

# First copy the yarn.lock to install stuff and benefit from the layer cache
COPY ["package.json", "yarn.lock", "/usr/app/"]

# Run all the code from here
WORKDIR /usr/app/

# Install dependencies
RUN yarn install

# Copy the code
COPY [".", "/usr/app/"]

# Build the project
RUN yarn build
