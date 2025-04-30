---
layout: "../../../layouts/BlogPost.astro"
title: "Naming is hard"
description: "This post explains how to name variables and things in your software program so that it is easy to understand."
pubDate: "Apr 20 2025"
heroImage: "/code.jpg"
isPublished: true
---

# Naming is Hard: A Survival Guide for JavaScript Developers

Let’s be honest: naming things in code is hard. Like, really hard. If you’ve ever stared at your screen for 10 minutes trying to decide between `data`, `info`, or `thingy`, you’re not alone. I’ve been there, and so has every developer who’s ever written more than three lines of code. But here’s the thing: good names matter—a lot. Bad names are like banana peels in your codebase, just waiting for someone (maybe future you) to slip on them.

## Why Bother With Good Names?

Imagine you’re reading a book where every character is named Bob. Confusing, right? Code is the same. Good names make your code readable, maintainable, and less likely to make you want to throw your laptop out the window.

## Variables: The Usual Suspects

**Bad:**

```js
let x = 42;
let foo = getData();
let temp = userInfo;
```

**Good:**

```js
let userAge = 42;
let userProfile = getUserProfile();
let userInfo = currentUserInfo;
```

**Why?**

- `x` tells you nothing. `userAge` tells you exactly what it is.
- `foo` is only good for placeholder jokes. `userProfile` is clear.
- `temp` is only useful if you’re actually storing temperature.

## Functions: What Does This Even Do?

**Bad:**

```js
function handle() {
  /* ... */
}
function doStuff(a, b) {
  /* ... */
}
function process() {
  /* ... */
}
```

**Good:**

```js
function handleUserLogin() {
  /* ... */
}
function calculateTotalPrice(cartItems) {
  /* ... */
}
function processPayment(order) {
  /* ... */
}
```

**Why?**

- A function name should say what it does. `doStuff` does not.
- Be specific! `handleUserLogin` is much better than `handle`.

## Classes: Not Just Fancy Functions

**Bad:**

```js
class Data {}
class Manager {}
class Thing {}
```

**Good:**

```js
class User {}
class CartManager {}
class EmailService {}
```

**Why?**

- `Thing` is not a thing. `User` is.
- `Manager` of what? Be explicit: `CartManager`.

## Files: The First Thing You See

**Bad:**

```
utils.js
data.js
stuff.js
```

**Good:**

```
formatDate.js
userController.js
cartUtils.js
```

**Why?**

- `utils.js` could be anything. `formatDate.js` is clear.
- File names should match what’s inside.

## Constants and Magic Numbers

**Bad:**

```js
const a = 3.14;
const b = 86400;
```

**Good:**

```js
const PI = 3.14;
const SECONDS_IN_A_DAY = 86400;
```

**Why?**

- `a` and `b` are mysterious. `PI` and `SECONDS_IN_A_DAY` are not.

## General Tips for Naming

- Be descriptive, not verbose. `userEmail` is good. `theEmailAddressOfTheUser` is too much.
- Use common conventions. For booleans, use `is`, `has`, `can` (e.g., `isActive`, `hasPermission`).
- Avoid abbreviations unless they’re obvious (`id`, `URL`, `API` are fine).
- Don’t be afraid to rename things as your code evolves. Refactoring is your friend.
- If you can’t think of a good name, ask a teammate or take a break. Inspiration often strikes when you’re not looking.

## Practical Naming Rules to Live By

1. **Name for intent, not type.**
   - Bad: `list`, `arr`, `str`
   - Good: `userList`, `cartItems`, `emailAddress`
2. **Use consistent casing.**
   - Variables/functions: `camelCase` (`userName`, `getUserInfo`)
   - Classes: `PascalCase` (`UserProfile`)
   - Constants: `UPPER_SNAKE_CASE` (`MAX_RETRIES`)
3. **Avoid generic words.**
   - Bad: `data`, `info`, `object`
   - Good: `orderData`, `userInfo`, `paymentObject`
4. **Prefer positive names for booleans.**
   - Bad: `isNotActive`
   - Good: `isActive`
5. **Don’t encode type in the name.**
   - Bad: `userArray`, `strName`
   - Good: `users`, `name`
6. **Pluralize for collections.**
   - Bad: `user`
   - Good: `users` (if it’s an array)
7. **Be specific with function names.**
   - Bad: `update()`
   - Good: `updateUserProfile()`
8. **Avoid context repetition.**
   - Bad: `user_userName`, `cartCartItems`
   - Good: `userName`, `cartItems`
9. **Use domain language.**
   - Bad: `thing`, `item`, `stuff`
   - Good: `invoice`, `transaction`, `product`
10. **Don’t be afraid of longer names if they add clarity.**
    - Bad: `fn`, `val`
    - Good: `formatUserName`, `totalOrderValue`
11. **Prefix event handlers with 'on' or 'handle'.**
    - Bad: `click()`, `submit()`
    - Good: `onButtonClick()`, `handleFormSubmit()`
12. **Avoid misleading names.**
    - Bad: `isLoaded` (when it means loading)
    - Good: `isLoading` (if true when loading)

## Final Thoughts

Bad names are like glitter: once they’re in your codebase, they’re hard to get rid of. But with a little effort (and maybe a few laughs at your old `fooBar` variables), you can make your code a much friendlier place for everyone—including future you. Happy naming!
