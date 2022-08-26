---
layout: '../../../layouts/BlogPost.astro'
title: 'Types that always represent valid states'
description: 'We must design our types in such a way that the type must represent the valid states.'
pubDate: 'Jun 10 2022'
heroImage: '/code.jpg'
isPublished: true
---

We must design our types in such a way that the type must represent the valid states. If our type does not represent valid state, then it brings
complexity in implementing functions using those types.

For example:

- If we design a interface for a web page, that has pageName, isLoading and error fields. The interface that we have chosen allows both isLoading and error state to be set at the same time because of which we have complexity in implementing the functions as shown in the code below:

```ts
interface PageState {
  pageName: string;
  isLoading?: boolean;
  error?: string;
}

async function changePage(page: PageState) {
  page.isLoading = true;

  try {
    const newPage = await getPage(page.pageName);

    console.log('newPage', newPage);

    // here we forgot to reset the isLoading state and error state
  } catch (e) {
    page.error = JSON.stringify(e);
    console.log('error', page.error);
    // here we forgot to reset the isLoading state
  }
}

async function getPage(pageName: string) {
  return new Promise((resolve, reject) => {
    const rand = Math.floor(Math.random() * 5);

    if (rand > 2) {
      reject('something went wrong');
    } else {
      resolve(pageName);
    }
  });
}

changePage({
  pageName: 'home',
});
```

If you want to play with the code: [Repl Link](https://replit.com/@baijanathTharu/Designing-types-in-typescript#validState.ts)
