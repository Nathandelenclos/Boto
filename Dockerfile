FROM node:latest
LABEL authors="nathandelenclos"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app
RUN yarn install

CMD ["yarn", "start"]
