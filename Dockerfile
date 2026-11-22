FROM node:24-bookworm-slim

COPY index.js /server/
COPY package.json /server/

WORKDIR /server

CMD ["node", "index.js"]
