---
layout: '../../../layouts/BlogPost.astro'
title: 'Authentication workflow using access token and refresh token'
description: 'This post shows the workflow of authentication using JWT tokens.'
pubDate: 'Mar 15 2022'
heroImage: '/code.jpg'
isPublished: true
---

This post shows the workflow of authentication using JWT tokens.

The access token should have short life while the refresh token can have long life.

## Signup flow

1. Client sends client id and password to the server.
2. Check if client already exists in the database or not.
3. If client does not exist, password is hashed and user data is saved in the database.

## Login flow

1. Client sends client id and password to the server.
2. Check if client exists and password is correct.
3. If password is correct, generate access token and refresh token.
4. Send tokens to the client and store it as HTTP only cookie to prevent attackers from getting access to the token.

## Flow for other request

1. Validate the access token. If access token is valid, the request is authenticated.
2. If access token is not valid, validate the refresh token.
3. If refresh token is not valid, logout the user.
4. If refresh token is valid, generate new access token and refresh token and send to the client.

## Logout flow

1. Invalidate the refresh token and access token.
