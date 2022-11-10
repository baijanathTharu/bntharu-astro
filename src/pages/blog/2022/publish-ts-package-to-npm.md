---
layout: '../../../layouts/BlogPost.astro'
title: 'How to publish a typescript package to npm?'
description: 'Here we learn how to publish a package to npm.'
pubDate: 'Nov 11 2022'
heroImage: '/code.jpg'
isPublished: true
---

In this blog we are going to make a [`sum`](https://www.npmjs.com/package/@baijanaththaru/ts-sum) package.
1. Initialize a npm project
```bash
npm init
```
2. Answer all the following questions shown in the image.
![image](https://user-images.githubusercontent.com/60652366/201106199-0a99a364-6795-4f8e-9b25-30e6b701fb6b.png)

After answering all the questions, a *package.json* file will be created.

3. Create a *README.md* file.

4. Install dev dependencies

```bash
npm install -D prettier tslint tslint-config-prettier typescript
```

5. Create a *tsconfig.json* file.

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "declaration": true,
    "outDir": "./lib",
    "strict": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "**/__tests__/*"]
}
```
6. Create *src/index.ts* file
```ts
export const sum = (...numbers: number[]) => {
  let temp = 0;

  for (const num of numbers) {
    temp += num;
  }

  return temp;
};
```
7. Add build, format, and lint command in *package.json*
```
{
"scripts": {
    "build": "tsc",
    "format": "prettier --write \"src/*.ts\"",
    "lint": "tslint -p tsconfig.json"
 }
}
```

8.   Add *files* and *types* in package.json
```json
{
"files": [
    "lib/**/*"
  ],
  "types": "./lib/index.d.ts",
}
```
* `files` are the folders that will be included in the published package.
*  `types` contains the typescript declarations.

9. Run `build` command which will generate a `lib` directory that is included in the package.

10. Add prepare, preversion, version and postversion commands in scripts.
```json
{
 "scripts": {
    "prepare": "npm run build",
    "prepublishOnly": "npm test && npm run lint",
    "preversion": "npm run lint",
    "version": "npm run format && git add -A src",
    "postversion": "git push && git push --tags"
  }
}

```
11. Login to npm
```bash
npm login
```
12. Now we can publish public package using
```bash
npm publish --access public
```
13. Add support for testing using vitest
* Install vitest
```bash
npm install -D vitest
```
* Create vitest config *vitest.config.ts*
```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // ...
  },
});
```
* Add test command in scripts.
```json
{
"scripts": {
    "test": "vitest"
  }
}
```
* Create *__tests__* directory inside src and make a *sum.test.ts* file.
```ts
import { expect, test } from 'vitest';
import { sum } from '../index';

test('testing sum', () => {
  expect(sum(1, 2)).toBe(3);
  expect(sum(2, 10)).toBe(12);
  expect(sum(2, 5)).not.toBe(8);
  expect(sum(1, 2, 3, 4, 5, 6, 7, 8, 100)).toBe(136);
});
```

14. After writing the test, we can publish a new version by updating the version using `npm version` command. In this case, we are making patch version.
```bash
npm version patch
npm publish
```

*Repository link*: [sum package by baijanath](https://github.com/baijanathTharu/ts-sum) 
