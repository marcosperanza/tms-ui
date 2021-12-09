FROM nginx:1.19.10 as app
COPY build /usr/share/nginx/html
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
ENV SERVER_PORT=80
ENV TMS_SERVICES=http://localhost:8080
