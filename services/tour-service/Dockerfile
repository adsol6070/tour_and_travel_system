FROM node:18-alpine

WORKDIR /app

COPY tsconfig.base.json ./
COPY package*.json ./
COPY services/tour-service ./services/tour-service

WORKDIR /app/services/tour-service

RUN npm install
RUN npm run build

EXPOSE 3002

CMD ["npm", "run", "dev"]