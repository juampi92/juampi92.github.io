---
extends: _layouts.post
section: content
title: Testing your SEO with PHP & Pest
date: 2022-09-01
description: Just like any other test suite, SEO tests will give your team confidence in your HTML structure and will prevent expensive mistakes.
thumbnail_image: /assets/images/1-test-seo-code-preview.jpg
---

SEO testing is a practice that can prevent unwanted changes in search engines.
If you are interested in knowing why, in this [medium article](https://medium.com/studocu-techblog/the-importance-of-testing-your-seo-9056e8f47ef7){target=_blank} I explain the importance of it, and the possible consequences of not doing so.

This article will focus on testing a PHP project using the utility package [test-seo](https://github.com/juampi92/test-seo){target=_blank}.

> Note: The examples in this post are made using [Pest](https://pestphp.com/){target=_blank} with Laravel, but none of these are required for the package to work.

![TestSEO Code Preview](/assets/images/1-test-seo-code-preview.jpg)

## Setup

To install the package, run:

```bash
composer require juampi92/test-seo --dev
```

> It is assumed PHPUnit and Pest are already installed in your project.

## Testing the landing page

The first step to a successful landing page, is a 200 status code, so we'll start with that.

```php
test('landing page SEO tags', function () {
    $response = get('/')->assertStatus(200);
});
```

To use this package, you will have to instantiate the TestSEO using the HTML response:

```php
test('landing page SEO tags', function () {
    $response = get('/')->assertStatus(200);

    // And now we generate the TestSEO object with the html response:
    $seo = new TestSEO($response->getContent());
});
```

For the landing page, we would like to test that the title is `My Blog`, the canonical url is self-referencing, and the robots are correct.

```php
test('landing page SEO tags', function () {
    // ...
    $seo = new TestSEO($response->getContent());
    
    expect($seo->data)
        ->title()->toBe('My Blog')
        ->canonical()->toEqual(route('home'))
        ->robots()->index()->toBeTrue()
        ->robots()->follow()->toBeTrue();
});
```

## Snapshot testing

To do snapshot testing, first we need to install spatie's snapshot package:

```bash
composer require spatie/pest-plugin-snapshots --dev
```

Now we only have to assert that the TestSEO matches the snapshot.

```php
use function Spatie\Snapshots\{assertMatchesJsonSnapshot};

test('landing page SEO tags', function () {
    // ...
    $seo = new TestSEO($response->getContent());
    
    assertMatchesJsonSnapshot(json_encode($seo));
});
```

The TestSEO implements the [jsonSerialize()](https://www.php.net/manual/en/jsonserializable.jsonserialize.php){target=_blank} method to be compared against the JSON snapshot.

By default, it will use a simple structure serializer that includes the title, description, robots, etc. If you would like to make your custom Serializer, you can follow the following steps:

```php
use Juampi92\TestSEO\SEOData;
use Juampi92\TestSEO\SnapshotFormatters\SnapshotSerializer;

class MySerializer implements SnapshotSerializer
{
    public function toArray(SEOData $data): array
    {
        return [
            'title' => $data->title(),
            'description' => $data->description(),
            'robots' => (string) $data->robots(),
            'canonical' => $data->canonical(),
            'pagination' => [
                'prev' => $data->prev(),
                'next' => $data->next(),
            ],
        ];
    }
}
```

To use this formatter, you simply have to pass it as TestSEO's second parameter:

```php
test('landing page SEO tags', function () {
    // ...
    $seo = new TestSEO($response->getContent(), new MySerializer());
    
    $json = json_encode($seo);
});
```

### What about seeded data?

When testing dynamic pages, you will have to seed data in order to test the page. Seeded data usually uses random attributes which will make every seed unique. Generating unique attributes each time will never match the previous attribute stored in the snapshot.

**How do we solve this problem?** We don't fake.

When testing SEO pages, we will control our attributes. If we want to test how a title gets cropped in the `<title/>` tag, we will seed always the same long title.

```php
test('article page SEO tags', function () {
    $article = Article::factory()->create([
        'title' => 'This is a very long title, and I would like to see it cropped',
    ]);

    $response = get(RouteHelper::article($article))->assertStatus(200);
    $seo = new TestSEO($response->getContent(), new MySerializer());
    
    expect($seo->data)
        ->title()->toBe('This is a very long title, and I would like to see it... - My Blog');

    $json = json_encode($seo);
    // {
    //    "title": "This is a very long title, and I would like to see it... - My Blog",
    //    ...
    // }
});
```

Now we have a new issue: unique IDs. It is very likely that you will get different IDs on each run, and if you use IDs in URLs, the snapshots won't match.

The easiest solution to his problem is to replace the unique IDs with a generic placeholder, and that's what the default serializer is doing.

```bash
/article/this-is-a-very-long-title/15
```
Gets replaced to:
```bash
/article/this-is-a-very-long-title/{id}
```

Now, any seeded article will match the snapshot.

> In the case where replacing numbers for {id} is not sufficient, snapshot testing may not be the best approach.

## Most common assertions

Search engines have made it clear that breaking certain rules can lead to a negative ranking.
In order to test them easier, this package includes assertions for some of these rules:

### Never have more than one H1

Search engines pay a lot of attention to the H1, and that's also why they do not like it when you use more than one per page.
This package comes with a method:

```php
$seo->assertThereIsOnlyOneH1();
```

### All images have `alt` attribute

This is also a good SEO practice: Images should have an "alternative" tag with a meaningful text.

```php
$seo->assertAllImagesHaveAltText();
```

## Conclusion

If your website relies on search engines, you will do whatever you can to please them, and that includes not messing up.
Having a decent SEO coverage can give your team the confidence to refactor pages and now worry about modifying the SEO structure by accident.

Checkout the package to see all its features, and Pull-Request are welcome!

[https://github.com/juampi92/test-seo](https://github.com/juampi92/test-seo#test-seo){target=_blank}
