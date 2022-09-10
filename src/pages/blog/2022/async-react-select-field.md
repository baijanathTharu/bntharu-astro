---
layout: '../../../layouts/BlogPost.astro'
title: 'Async react select field'
description: 'This post shows how to use a react-select to make a asynchronous Select field.'
pubDate: 'Sept 09 2022'
heroImage: '/code.jpg'
isPublished: true
---

1. First create a react project and install `react-select` as a dependency.
2. Make a Async component that fetches data from a [JSON placeholder](https://jsonplaceholder.typicode.com/photos?_page=1&_limit=5) as shown below.

```tsx
import React, { Component } from 'react';

import AsyncSelect from 'react-select/async';

const LIMIT = 10;

type Photo = {
  albumId: number;
  id: number;
  url: string;
  thumbnailUrl: string;
};

async function fetchPhotos(page: number): Promise<{
  data: Array<Photo> | null;
  error: string | null;
}> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${LIMIT}`
  );
  const data = await res.json();

  if (res.status !== 200) {
    return {
      data: null,
      error: 'Something went wrong!',
    };
  }

  return {
    error: null,
    data,
  };
}

async function loadPhotoOptions(inputValue: string) {
  const { data, error } = await fetchPhotos(1);

  if (error) {
    console.log(error);
  }

  const options = data.map((photo) => ({
    value: photo.id,
    label: photo.url,
  }));

  return options;
}

export function AsyncPhotosSelect() {
  return (
    <div style={{ marginTop: '10px' }}>
      <label>
        {' '}
        Select Photo
        <AsyncSelect
          name='photo'
          cacheOptions
          defaultOptions
          loadOptions={loadPhotoOptions}
        />
      </label>
    </div>
  );
}
```

Try it yourself in a Repl: [Link](https://replit.com/@baijanathTharu/async-react-select#components/async-react-select.tsx)
