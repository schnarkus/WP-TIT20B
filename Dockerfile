FROM node:12-alpine
RUN apk add --no-cache git
WORKDIR /app
RUN git clone https://github.com/schnarkus/WP-TIT20B.git /app/data
WORKDIR /app/data
RUN yarn install 

EXPOSE 8080
CMD [ "yarn", "run", "start" ]
