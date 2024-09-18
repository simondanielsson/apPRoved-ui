FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
COPY src/theme ./src/theme

RUN mkdir static

RUN npm ci

COPY . ./

RUN npm run build

EXPOSE 3000
CMD ["node", "build"]
