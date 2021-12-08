#FROM node:14.16.1 as build
#COPY public /app/public
#COPY src /app/src
#COPY package.json /app/package.json
#COPY tsconfig.json /app/tsconfig.json
#WORKDIR /app
#RUN npm install && npm run generate && npm run build

FROM nginx:1.19.10 as app
COPY build /usr/share/nginx/html
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
ENV SERVER_PORT=80
ENV TMS_SERVICES=http://localhost:8080
