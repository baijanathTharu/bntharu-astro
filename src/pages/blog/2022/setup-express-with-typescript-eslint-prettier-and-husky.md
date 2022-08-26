---
layout: '../../../layouts/BlogPost.astro'
title: 'Setup express with typescript, eslint, prettier and husky'
description: 'In this article, we are going to setup an express project with typescript, eslint, prettier and husky.'
pubDate: 'Mar 03 2022'
heroImage: '/code.jpg'
isPublished: true
---

In this article, we are going to setup an express project with typescript, eslint, prettier and husky.

### Setup typescript

**Initialize the project**

```bash
npm init
```

**Install typescript dependencies**

```bash
npm i -D typescript ts-node
```

**Create tsconfig.json**

```bash
npx tsc --init
```

**Add command in package.json to build and start the project**

```json
{
  "build": "tsc",
  "start": "nodemon"
}
```

**Use nodemon to start the project**

```json
// in nodemon.json file
{
  "watch": ["src"],
  "ext": ".ts",
  "ignore": [],
  "exec": "node --loader ts-node/esm ./src/index.ts"
}
```

### Setup eslint

```bash
npx eslint --init
```

Choose answers to the questions and eslint config will be generate.

In package.json file, add command for linting

```json
{
  "scripts": {
    "lint": "eslint --ext .ts src/**/*.ts"
  }
}
```

### Setup prettier

```bash
npm i -D prettier eslint-config-prettier
```

**Create .prettierrc.js file for config**

```js
module.exports = {
  printWidth: 80,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
};
```

In eslint config, extend the plugin with prettier

**Add following command in scripts of package.json**

```json
{
  "scripts": {
    "format": "prettier --write src/**/*.ts"
  }
}
```

### Setup husky for formatting

```bash
npm i -D pretty-quick
```

pretty-quick will format our code before committing.

**Initialize husky**

```bash
npx husky-init && npm install
```

This will generate a pre-commit hook, in which **npm test** command is present. We can change this command as our requirement. In this case, we change it to be **npm run format-quick**

In package.json, we have to add command for pretty-quick formatting.

```json
"scripts": {
   "format-quick": "pretty-quick --staged"
}
```

### Create server

**Create a file in src/index.ts**

```ts
import express, { Application, Request, Response, NextFunction } from 'express';

const app: Application = express();
const port = 5000;

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ data: 'Hello World!' });
});

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}!`));
```

Now, we can start building our project from here.
