FROM node:16-alpine

RUN apk add --update --no-cache \
    build-base \
    bash \
    curl \
    make \
    nodejs \
    python3

RUN npm i -g pnpm

RUN mkdir -p /usr/src/app && \
  chown -R node:node /usr/src/app

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN pnpm install && pnpm run build
