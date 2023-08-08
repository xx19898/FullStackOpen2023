FROM node:16
WORKDIR /usr/src/app/todoBackend
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 8080
CMD ["npm","start"]

