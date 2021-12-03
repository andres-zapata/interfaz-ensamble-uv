FROM node:14.15.0-alpine

WORKDIR /usr/src/frontend

COPY ./package*.json ./
RUN npm install -g @angular/cli
RUN npm install

COPY . ./

CMD ["ng", "serve"]