FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN apk add --no-cache python3 make g++

COPY . .

RUN npm run build

CMD ["npm", "run", "start:dev"]