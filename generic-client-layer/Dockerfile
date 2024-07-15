FROM node:latest
# ENV NODE_ENV=development
WORKDIR /gcl
COPY package*.json ./
COPY tsconfig.json ./
COPY . .
# RUN npm ci
RUN npm install
RUN npm run build
CMD ["npm" , "run", "start:prod"]
