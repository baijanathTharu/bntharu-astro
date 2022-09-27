---
layout: '../../../layouts/BlogPost.astro'
title: 'Docker containers in same network'
description: 'In this post, we test containers in same network.'
pubDate: 'Sep 27 2022'
heroImage: '/code.jpg'
isPublished: true
---

In this project, we are testing two containers in same network. We have following apps:

### Apps

1. server - an Express app running on port 4444
2. client - a NextJs app running on port 3000

### Build containers

- Build client

```bash
docker build --build-arg NEXT_PUBLIC_BACKEND_URI=http://localhost:4444 -t client .
```

- Build server

```bash
docker build -t server .
```

- Create a network

```bash
docker network create test-common-net
```

### Running containers in same network

- Run server

```bash
docker run -p 4444:4444 --net test-common-net --name server -d server
```

- Run client

```bash
docker run -p 3000:3000 --net test-common-net --name client -d client
```

Github Link: [Docker containers in same network](https://github.com/baijanathTharu/containers-same-network)

