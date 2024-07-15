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
RUN ls -la
# RUN chmod +x ./update_variables_in_yml.sh
# RUN chmod +x ./start.sh
CMD ["./start.sh"]
