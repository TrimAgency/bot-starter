# Specify a base image

FROM node:14.1.0-buster AS buster
WORKDIR /usr/app/

# Install dependencies
COPY package.json /usr/app/

RUN yarn install
RUN yarn build

EXPOSE 4000