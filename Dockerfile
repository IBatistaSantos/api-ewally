FROM node:16.14.2

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "start"]
