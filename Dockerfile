FROM node:12-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install 
COPY . .

EXPOSE 8080
CMD [ "yarn", "run", "start" ]