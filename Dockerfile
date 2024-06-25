FROM node:20-alpine as base

WORKDIR /usr/code/

COPY package*.json .

RUN npm cache clean --force

# If you are building your code for production
# RUN npm ci --omit=dev
RUN npm install

COPY . .

EXPOSE 3500

CMD [ "npm", "run", "local" ]
