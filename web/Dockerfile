FROM node:23-alpine3.21@sha256:139be64e98a1374a1c49ee62b23a91f688a37a628422ff8bb9fba94185678ab3 AS builder

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

# From https://docs.redhat.com/en/documentation/openshift_container_platform/4.16/html/images/creating-images#use-uid_create-images
# Even though the admin and persistent config is turned off in the Caddyfile, caddy still tries to create files
# in the data and config directories
RUN mkdir -p /data/caddy /config/caddy && \
    chgrp -R 0 /data /config && \
    chmod -R g=u /data /config

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