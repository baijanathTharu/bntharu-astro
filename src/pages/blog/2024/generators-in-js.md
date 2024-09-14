---
layout: "../../../layouts/BlogPost.astro"
title: "Generators in Javascript"
description: "This post explains about generators in javascript and why we need it."
pubDate: "Sept 14 2024"
heroImage: "/code.jpg"
isPublished: true
---

I wanted to compare the timings of a search algorithms - linear and binary search in my machine. I tried to create a big array containing a billion numbers. I got heap out of memory limit.

The code to generate the required array is given below:

```js
new Array(1e9).fill(0).map((_, idx) => idx);
```

If we try to run the above code, we will get `JavaScript heap out of memory`. The default memory limit of NodeJS is 1.5GB for a 64 bit systems. We can get around it by increasing the size of the memory.

In Javascript, numbers are typically represented as 64-bit floating-point numbers, which take 8 bytes of memory each.

So for a billion numbers, we can set the memory to:

> 1 billion \* 8 bytes= 8 billion bytes (8GB)

I didn't want to increase the memory size.

Therefore, I had to look at the `generators` to solve my problem.

**Generators** are basically functions that allows to pause and resume their execution.

A simple generator looks like below:

```js
function* twoNumberGenerator() {
  yield 1;
  yield 2;
}

const gen = simpleGenerator();

console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: undefined, done: true }
```

The `twoNumberGenerator` function returns an iterator object. Iterator object has a `next` method. Whenever, we call it, the generator will yield us the values as shown above in the comments. When `done` becomes true, we come to know that the generator has ended its execution.

Taking the above code as an example, we can create an array containing a billion numbers.

```js
function* generateNumbers(length) {
  for (let i = 0; i < length; i++) {
    yield i;
  }
}

const billionNumberGenerator = generateNumbers(1e9);

// we can process the numbers as below:
for (const num of billionNumberGenerator) {
  // we can process the `num` here
}
```

Now, I have an array of billion numbers, I can now go ahead with the comparison of the algorithms which I might write about in future blogs.
