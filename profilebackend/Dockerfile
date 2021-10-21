FROM node:alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
RUN npm install -g ts-node
ENV DBPASSWORD ${DBPASSWORD}
COPY . .
ENTRYPOINT ["npm", "start"]