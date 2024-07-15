# FROM node:16.18-alpine3.15

# RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app

# COPY package*.json ./
# RUN npm install

# COPY . .

# RUN npm run build

# RUN npm i -g pm2
# EXPOSE 5001
# EXPOSE 5002
# EXPOSE 6001
# EXPOSE 6002
# CMD [ "pm2-runtime", "ecosystem.config.js" ]
FROM node:20.14.0
# ENV NODE_ENV=development
WORKDIR /client
COPY package*.json ./
COPY tsconfig.json ./
# COPY .env ./
COPY . .
# RUN npm ci
RUN npm install
RUN npm run build

# RUN ls
# ARG default_yml

# CMD [ "./start_bap_client.sh" ]