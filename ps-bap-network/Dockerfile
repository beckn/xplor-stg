FROM node:18-alpine
# ENV NODE_ENV=development
WORKDIR /client
COPY package*.json ./
COPY tsconfig.json ./
COPY . .
# RUN npm ci
RUN npm install
RUN npm run build
RUN chmod +x update_variables_in_yml.sh
RUN chmod +x start.sh
CMD ["./start.sh"]
