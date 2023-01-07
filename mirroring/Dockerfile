FROM node:latest

WORKDIR /app

COPY main.js .
COPY package.json .
COPY relays.yaml .

RUN yarn

CMD ["node", "main.js"]
