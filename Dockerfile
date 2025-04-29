FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npx prisma migrate dev

COPY . .

EXPOSE 4000
