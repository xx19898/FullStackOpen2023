FROM  node:16 AS build-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN CI=true npm test

FROM node:16

COPY --from=build-stage /usr/src/app /usr/src/app

WORKDIR /usr/src/app

RUN npm run build