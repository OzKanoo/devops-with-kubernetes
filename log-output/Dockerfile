FROM node:18-alpine
WORKDIR /usr/src/app
COPY package* ./
RUN npm install
COPY . .
CMD ["node", "index.js"]
