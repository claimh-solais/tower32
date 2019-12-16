# build backend app
FROM node:12-alpine as build-backend
WORKDIR /tmp/
COPY ./src/backend/package.json ./src/backend/package-lock.json ./src/backend/tsconfig*.json ./src/backend/tslint.json  ./src/backend/nest-cli.json ./
COPY ./src/backend/ ./src/
RUN npm install
RUN npm run build
COPY ./src/backend/env/ ./dist/env/
COPY ./views/ ./dist/views/
# build asset
FROM node:12-alpine as build-asset
WORKDIR /tmp/
COPY ./package*.json ./
RUN apk add --no-cache --virtual .build-deps \
    wget \
    git \
    musl-dev \
    nasm \
    autoconf \
    automake \
    pkgconf \
    cmake \
    libtool \
    binutils-gold \
    openssl-dev \
    curl \
    g++ \
    gcc \
    gnupg \
    libgcc \
    linux-headers \
    make \
    python-dev \
    py-pip \
    unzip \
    bash; \
COPY . .
RUN npm run build-front
# install node_modules
FROM node:12-alpine as node_modules
WORKDIR /tmp/
COPY ./package.json ./
RUN npm install --force --production
# run application
FROM node:12-alpine
WORKDIR /export/
ENV NODE_ENV production
COPY --from=node_modules /tmp/node_modules/ ./node_modules/
COPY --from=build-backend /tmp/dist/ ./
COPY --from=build-asset /tmp/dist/ ./public/
ENTRYPOINT [ "/bin/sh", "-c" ]
CMD [ "node", "/export/main.js" ]
