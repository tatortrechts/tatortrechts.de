FROM node:20-slim

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_MAPBOX_TOKEN
ARG NEXT_TELEMETRY_DISABLED

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build

EXPOSE 5000
CMD ["npm", "start"]
