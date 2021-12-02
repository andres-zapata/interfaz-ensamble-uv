FROM node:14.15.0-alpine

WORKDIR /usr/src/frontend

COPY ./package*.json ./

EXPOSE 4200

RUN npm install

COPY . ./

CMD ["npm", "start"]