FROM node:alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
ARG NETWORK
ENV NETWORK ${NETWORK}
COPY . .
RUN npm run build
ENTRYPOINT [ "npm", "start"]