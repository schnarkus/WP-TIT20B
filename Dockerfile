FROM node:12-alpine
RUN git https://github.com/schnarkus/WP-TIT20B.git
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install 
COPY . .

EXPOSE 8080
CMD [ "yarn", "run", "start" ]