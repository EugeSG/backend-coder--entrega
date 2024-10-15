FROM node:20.10.0
WORKDIR /src
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 8081
CMD ["npm", "start"]