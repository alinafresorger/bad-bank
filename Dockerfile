FROM node:slim

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

COPY index.js /app/index.js

EXPOSE 3000

CMD ["npm", "start"]
