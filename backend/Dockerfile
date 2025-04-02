FROM node:20-alpine3.18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN mkdir -p /app/uploads

EXPOSE 5050

CMD ["sh", "-c", "node seeder.js && node server.js"]
