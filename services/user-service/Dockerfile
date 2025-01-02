FROM node:18-alpine

WORKDIR /app

COPY tsconfig.base.json ./
COPY package*.json ./
COPY services/user-service ./services/user-service

WORKDIR /app/services/user-service

RUN npm install
RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "dev"]