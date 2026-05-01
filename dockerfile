FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV MONGO_URL=mongodb://admin:vishal@mongo:27017

EXPOSE 5050

CMD ["node", "server.js"]



# docker build -t testapp:v1
