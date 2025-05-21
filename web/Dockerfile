FROM node:23-alpine3.21@sha256:86703151a18fcd06258e013073508c4afea8e19cd7ed451554221dd00aea83fc AS builder

USER 0

RUN mkdir /opt/app

WORKDIR /opt/app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

FROM caddy:2.10.0-alpine@sha256:e2e3a089760c453bc51c4e718342bd7032d6714f15b437db7121bfc2de2654a6

# Needed to use Caddy's logging format transform
RUN caddy add-package github.com/caddyserver/transform-encoder   

## Default dir for caddy iamge

RUN mkdir /opt/app-root
RUN mkdir /opt/app-root/etc

WORKDIR /opt/app-root/www

COPY --from=builder /opt/app/dist .
COPY Caddyfile /opt/app-root/etc 

RUN caddy fmt /opt/app-root/etc/Caddyfile --overwrite

RUN chmod -R 775 /opt/app-root/*
WORKDIR /opt/app-root/www

EXPOSE 2015
CMD ["/usr/bin/caddy", "run", "--config", "/opt/app-root/etc/Caddyfile"]