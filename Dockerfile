FROM node:lts-slim

WORKDIR /app

COPY package*.json ./

RUN chown -R node:node /app

USER node

RUN npm install

COPY --chown=node:node . .

CMD npm run start
