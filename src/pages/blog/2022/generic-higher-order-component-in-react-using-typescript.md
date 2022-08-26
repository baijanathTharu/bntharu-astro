---
layout: '../../../layouts/BlogPost.astro'
title: 'Generic higher order component in react using typescript'
description: 'In this blog, we are going to see how to create a generic higher order component in react using typescript.'
pubDate: 'Mar 10 2022'
heroImage: '/code.jpg'
isPublished: true
---

In this blog, we are going to see how to create a generic higher order component in react using typescript.

A generic higher order component can be used in react to share codes between multiple component. For example, if we want **Profile** component to behave in one way when user is logged in and in other way when user is not logged in. The **Profile** component can be wrapped in a HOC **withLoggedInUser**.

In the example above, if user is logged in, we show the name of the user otherwise, we show a login button.

## Create **"Profile"** component

```tsx
export interface IProfileProps {
  // username is passed as props after wrapping with HOC
  username: string;

  // isLoggedIn is injected by the HOC component
  isLoggedIn: boolean;
}

export function Profile({ username, isLoggedIn }: IProfileProps) {
  return (
    <div>
      {isLoggedIn ? (
        <p>username: {username} is logged in.</p>
      ) : (
        <p>Please Login In</p>
      )}
    </div>
  );
}
```

## Create **"withLoggedInUser"** component

```tsx
export const withLoggedInUser = <T extends {}>(
  Component: React.ComponentType<T>

  // we omit "isLoggedIn" props and only expose other props of the wrapped component
): React.FC<Props & Omit<T, 'isLoggedIn'>> => {
  // withLoggedInUser injects isLoggedIn props to Component
  const isLoggedIn = false;

  return (props: Props) => {
    return (
      <>
        <Component {...(props as unknown as T)} isLoggedIn={isLoggedIn} />
      </>
    );
  };
};
```

## Using the HOC component

```tsx
// in app.tsx
const ProfileWithLoggedInUser = withLoggedInUser<IProfileProps>(Profile)

function App() {
  return (
    <ProfileWithLoggedInUser username='baijanath'>
  )
}
```
