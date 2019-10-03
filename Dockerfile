FROM node:8.16-jessie

COPY index.js /server/
COPY package.json /server/

WORKDIR /server

CMD node index.js
