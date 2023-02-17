---
layout: '../../../layouts/BlogPost.astro'
title: 'Use Composition to get rid of props drilling in React'
description: 'This post shows how we can use composition to get rid of props drilling in React.'
pubDate: 'Feb 17 2023'
heroImage: '/code.jpg'
isPublished: true
---

### Passing props using props drilling

```tsx
type TProduct = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type TProps = {
  product: TProduct;
};

function Order({ product }: TProps) {
  return <div>Order Quantity: {product.quantity} </div>;
}

function Payment({ product }: TProps) {
  return <div>Payment Price: {product.price}</div>;
}

function ProductDetail({ product }: TProps) {
  return (
    <div>
      <div>Product Id: {product.id}</div>
      <div>Product Name: {product.name}</div>
      <div>
        <Order product={product} />
      </div>
      <div>
        <Payment product={product} />
      </div>
    </div>
  );
}

function ProductComponent({ product }: TProps) {
  return (
    <div>
      <h3>Product Component</h3>
      <ProductDetail product={product} />
    </div>
  );
}

function fetchProduct() {
  const product: TProduct = { id: 1, name: 'Laptop', quantity: 5, price: 1000 };
  return product;
}

export default function PropDrillingPage() {
  const product = fetchProduct();
  return (
    <div>
      <h2>Props Drilling</h2>
      <ProductComponent product={product} />
    </div>
  );
}
```

### Using Composition

```tsx
import React from 'react';

type TProduct = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type TProps = {
  product: TProduct;
};

function Order({ product }: TProps) {
  return <div>Order Quantity: {product.quantity} </div>;
}

function Payment({ product }: TProps) {
  return <div>Payment Price: {product.price}</div>;
}

function ProductDetail({ product }: TProps) {
  return (
    <div>
      <div>Product Id: {product.id}</div>
      <div>Product Name: {product.name}</div>
    </div>
  );
}

function ProductComponent({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

ProductComponent.displayName = 'Product';
ProductDetail.displayName = 'Product.Detail';
Order.displayName = 'Product.Order';
Payment.displayName = 'Product.Payment';

const Product = Object.assign(ProductComponent, {
  Detail: ProductDetail,
  Order: Order,
  Payment: Payment,
});

function fetchProduct() {
  const product: TProduct = { id: 1, name: 'Laptop', quantity: 5, price: 1000 };
  return product;
}

export default function PropDrillingPage() {
  const product = fetchProduct();
  return (
    <div>
      <h2>Composition</h2>
      <Product>
        <Product.Detail product={product} />
        <Product.Order product={product} />
        <Product.Payment product={product} />
      </Product>
    </div>
  );
}

```
