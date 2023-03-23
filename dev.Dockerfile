FROM node:16

WORKDIR /usr/src/api

COPY . .

RUN npm install

CMD npm run dev