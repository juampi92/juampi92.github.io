---
extends: _layouts.post
section: content
title: Reusable Sessions in Laravel
date: 2022-12-04
description: Sessions are an easy-to-use feature for a stateful application, but they usually get messy very quickly. Follow these steps to clean up your Sessions.
thumbnail_image: /assets/images/3-reusable-sessions.jpg
---

Say you need to implement a simple shopping cart feature and you are planning on using the Session for it.

First, you create an endpoint to add a product and an amount:

```php
$request->session()->push('cart', [
    'productId' => $product->id,
    'amount' => $request->amount,
]);
```

Then, to access it, you create the Cart endpoint to display all items:

```php
$items = $request->session()->get('cart', []);
```

Finally, you allow flushing the session altogether:

```php
$request->session()->forget('cart');
```

This implementation is decent enough, although we repeat `'cart'` too often. To avoid accidentally introducing a typo, we can refactor it into a constant.

The client sees this and is happy about it. However, after using the feature, they realize they would like to see product recommendations based on what is in the cart.

To achieve this, we simply need to use the `RecommendationService` that takes an array of product IDs.

```php
$items = $request->session()->get('cart', []);
$productIds = Arr::pluck($items, 'productId');

$recommendationService->recommend($productIds);
```

This approach doesn't scale. You will have to repeat every section that uses the session. Can you imagine how it would be to update the structure or the way we add products?

## Repository pattern

This is where the Repository pattern comes into play. They abstract access to the data store and only provide access to business methods.

Let's first imagine the methods we would like to have in this implementation.

A method to add a product.

```php
public function addItem(Product $product, int $amount): void;
```

A method to get all items.

```php
/**
 * @return array<array{productId: int, amount: int}>
 */
public function getItems(): array;
```

A method to flush all items.

```php
public function flush(): void;
```

And finally, a method to retrieve all products.

```php
/**
 * @return array<int>
 */
public function getProductIds(): array;
```

Perfect!

Now the implementation can write itself:


```php
<?php

namespace App\Http\Session;

final class ShoppingCartSession
{
    private const KEY = 'cart';

    public function __construct(
        private readonly Store $store,
    ) {}

    public function addProduct(Product $product, int $amount): void
    {
        $this->store->push(self::KEY, [
            'productId' => $product->id,
            'amount' => $amount,
        ]);
    }

    /**
     * @return array<array{productId: int, amount: int}>
     */
    public function getItems(): array
    {
        return $this->store->get(self::KEY, []);
    }

    /**
     * @return array<int>
     */
    public function getProductIds(): array
    {
        return Arr::pluck($this->getItems(), 'productId');
    }

    public function flush(): void
    {
        return $this->store->forget(self::KEY);
    }
}
```

And the controller would look something like this:

```php
public function store(Request $request, Product $product, ShoppingCartSession $cart)
{
    $cart->addProduct($product, $request->amount);
    // ...
```

---

Some key features of using a class are:

- The dependencies are injected. There is no need to worry about facades or requests.
- You expose the methods that will be used by the controllers. As a consequence, you hide the underlying implementation, preventing invalid data from being inserted.
- You never expose the key.

Even though in this example we store the same array-shape structure as we read, we could easily use a ValueObject, and refactor the getItems method to return an array of ProductItem value object instead.

Now, where to locate these classes? I personally suggest `app/Http/Session`. Although they are a storage, the Session is an http-dependent storage (you can’t access the session inside a Command, for instance).

<u>Bonus track</u>: As a next level exercise, I would like to advise to take a look at this [KeyedSession implementation](https://gist.github.com/juampi92/487dd66c5b2507679dd4c76863e6c01c){target=_blank} to avoid repeating the key every time.
