---
layout: '../../../layouts/BlogPost.astro'
title: 'Setup dockerized development with frontend, backend and database'
description: 'This post shows how to setup an environment using docker in order to do local development.'
pubDate: 'May 06 2023'
heroImage: '/code.jpg'
isPublished: true
---

Github Link: [sample-monorepo-with-yarn](https://github.com/baijanathTharu/sample-monorepo-with-yarn)

We are using NextJS on the frontend, ExpressJS on the backend, postgres as database and prisma to query the database. 

`docker-compose.yml`
```yml
version: "3"

services:
  frontend:
    build:
      context: ./frontend
      target: DEV
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
    command: >
      sh -c "cd frontend && yarn dev"
    networks:
      - sample_monorepo
    volumes:
      - .:/src
  db:
    image: postgres:13
    restart: on-failure
    ports:
      - "5433:5432"
    environment:
      - POSTGRES_USER=root
      - POSTGRES_PASSWORD=admin
      - POSTGRES_DB=sample_monorepo
    volumes:
      - ./db:/var/www/html
    networks:
      - sample_monorepo
  backend:
    build:
      context: ./backend
      target: DEV
    restart: on-failure
    depends_on:
      - db
    ports:
      - "8080:8080"
    command: >
      sh -c "cd backend && yarn dev"
    environment:
      - NODE_ENV=development
      - PORT=8080
      - WHITELISTED_ORIGIN=http://localhost:3000
      - DATABASE_URL=postgresql://root:admin@db/sample_monorepo?schema=public
    networks:
      - sample_monorepo
    volumes:
      - .:/src

networks:
  sample_monorepo:
    driver: bridge

```

`Dockerfile` for frontend

```yml
FROM node:18-alpine as DEV

WORKDIR /src

ENV NODE_ENV=development
ARG NEXT_PUBLIC_BACKEND_URL

COPY package.json ./
COPY yarn.lock ./
COPY next.config.js ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD [ "yarn", "dev" ]
```

`Dockerfile` for backend

```yml
FROM node:18-alpine as DEV

WORKDIR /src

ENV NODE_ENV=development


COPY package.json ./package.json
COPY yarn.lock ./yarn.lock
COPY prisma prisma

RUN yarn install

# Generate prisma client
RUN yarn g

COPY . .

EXPOSE 8080

CMD [ "yarn", "dev" ]
```
