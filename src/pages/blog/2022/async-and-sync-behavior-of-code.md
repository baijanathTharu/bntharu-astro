---
layout: '../../../layouts/BlogPost.astro'
title: 'Async and sync behavior of code'
description: 'This post shows the difference between synchronous and asynchronous code.'
pubDate: 'Jun 05 2022'
heroImage: '/code.jpg'
isPublished: true
---

Repl Link: [Async and sync behavior of code](https://replit.com/@baijanathTharu/Async-and-sync-behavior-of-code)

This post is used to learn about the difference in `async` and `sync` behavior of code.

### Sync Behavior

- Without `async call`, the count of unchecked boxes is tracked correctly.

```jsx
import Link from 'next/link';
import { useState } from 'react';

const NUMBER_OF_CHECKBOX = 5;

export default function IndexPage() {
  const [unchecked, setUnchecked] = useState(NUMBER_OF_CHECKBOX);

  const onChange = (e) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      setUnchecked((unchecked) => (unchecked === 0 ? 0 : unchecked - 1));
    } else {
      setUnchecked((unchecked) => unchecked + 1);
    }
  };

  return (
    <div>
      <Link href='/'>
        <a style={{ color: 'blue' }}>Home</a>
      </Link>
      <div>
        <h3>Sync Behavior</h3>
        <p>Number of unchecked: {unchecked}</p>

        {new Array(NUMBER_OF_CHECKBOX).fill(0).map((_, index) => {
          const count = index + 1;
          return (
            <div>
              <label>Checkbox: {count}</label>
              <input type='checkbox' name={count} onChange={onChange} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

### Async Behavior

- With `async call`, it takes some time to synchronize the count of the unchecked boxes.

```jsx
import Link from 'next/link';
import { useState } from 'react';

const NUMBER_OF_CHECKBOX = 5;

const resolveAfter = (timeInSeconds, cb) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      cb();
      resolve('done');
    }, timeInSeconds * 1000);
  });
};

export default function AsyncPage() {
  const [unchecked, setUnchecked] = useState(NUMBER_OF_CHECKBOX);

  const checkOrUnCheck = (isChecked) => {
    if (isChecked) {
      setUnchecked((unchecked) => (unchecked === 0 ? 0 : unchecked - 1));
    } else {
      setUnchecked((unchecked) => unchecked + 1);
    }
  };

  const onChange = (e) => {
    const isChecked = e.target.checked;

    resolveAfter(1, () => checkOrUnCheck(isChecked));

    // Bug here: this block of code is called when the number of unchecked boxes on the UI is not 0.
    if (unchecked === 0) {
      alert('This is a bug');
    }
  };

  return (
    <div>
      <Link href='/'>
        <a style={{ color: 'blue' }}>Home</a>
      </Link>
      <div>
        <h3>Async Behavior</h3>
        <p>Number of unchecked: {unchecked}</p>

        {new Array(NUMBER_OF_CHECKBOX).fill(0).map((_, index) => {
          const count = index + 1;
          return (
            <div>
              <label>Checkbox: {count}</label>
              <input type='checkbox' name={count} onChange={onChange} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

Therefore, we need to give more attention whenever we are dealing with such conditions. This condition is a source of many bugs in our code.
