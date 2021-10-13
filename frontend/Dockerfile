FROM node:alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
ARG TESTNET_API
ARG MAINNET_API
ENV TESTNET_API ${TESTNET_API}
ENV MAINNET_API ${MAINNET_API}
COPY . .
RUN npm run build
ENTRYPOINT [ "npm", "start"]