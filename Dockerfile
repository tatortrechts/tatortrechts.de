FROM node:20-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build

EXPOSE 5000
CMD ["npm", "start"]
