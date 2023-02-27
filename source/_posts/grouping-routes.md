---
extends: _layouts.post
section: content
title: When and How to Group Routes in Laravel
date: 2023-02-27
description: This article discusses the problem of route file organization in Laravel applications and presents an alternative approach to route grouping that makes searching for paths easier and more efficient. It also covers the trade-offs and benefits of grouping routes and provides examples of when and how to group routes effectively.
thumbnail_image: /assets/images/5-grouping-routes.jpg
---

The aim of this article is to provide an explanation for why your route files should look less like this:

```php
Route::prefix('playlists')->group(function () {
    Route::prefix('/{playlist}')->group(function () {
        Route::put('/', [PlaylistController::class, 'update']);
        Route::get('/', [PlaylistController::class, 'show']);
            
            Route::prefix('/tracks')->group(function () {
                Route::put('/', [PlaylistTrackController::class, 'update']);
                Route::post('/', [PlaylistTrackController::class, 'store']);
                Route::get('/', [PlaylistTrackController::class, 'index']);
                Route::delete('/', [PlaylistTrackController::class, 'delete']);
            });

        Route::prefix('/followers')->group(function () {
            Route::put('/', [PlaylistFollowerController::class, 'follow']);
            Route::delete('/', [PlaylistFollowerController::class, 'unfollow']);
        });
    });
});

Route::prefix('me')->group(function () {
    Route::get('/playlists', [MePlaylistController::class, 'index']);
});
```

And more like this:

```php
Route::put('/playlists/{playlist}', [PlaylistController::class, 'update']);
Route::get('/playlists/{playlist}', [PlaylistController::class, 'show']);

Route::put('/playlists/{playlist}/tracks', [PlaylistTrackController::class, 'update']);
Route::post('/playlists/{playlist}/tracks', [PlaylistTrackController::class, 'store']);
Route::get('/playlists/{playlist}/tracks', [PlaylistTrackController::class, 'index']);
Route::delete('/playlists/{playlist}/tracks', [PlaylistTrackController::class, 'delete']);

Route::put('/playlists/{playlist}/followers', [PlaylistFollowerController::class, 'follow']);
Route::delete('/playlists/{playlist}/followers', [PlaylistFollowerController::class, 'unfollow']);

Route::get('/me/playlists', [MeFollowerController::class, 'index']);
```

## We search for paths

If you use a text editor you are probably used to searching files using their name. Usually, the file name is enough, but what would you do if your files are all named “index”, “show”, “update”? Then you would have to narrow your search by adding the path of it.

The grouped approach makes searching for a path a complicated task and will make you scan multiple places before you find your match.

It is likely that your routes don’t look exactly like the first example, but they probably have some level of grouping. We will discuss when it is good to group and how to group consciously.

## Namespace grouping

A popular approach to route grouping can be grouping by **domain**. You can take the example of this [Laravel News article](https://laravel-news.com/managing-routes){target=_blank}.

If we adapt what the article mentions to our Spotify API example, we will have something like:

```php
Route::prefix('playlists')->as('playlists:')->middleware(['auth:sanctum'])->group(
    base_path('routes/resources/playlists.php'),
);
 
Route::prefix('albums')->as('albums:')->middleware(['auth:sanctum'])->group(
    base_path('routes/resources/albums.php'),
);
 
Route::prefix('tracks')->as('tracks:')->middleware(['auth:sanctum'])->group(
    base_path('routes/resources/tracks.php'),
);
```

The confusion here comes when using prefixes to group the domain.

Our API has many ways to access the Tracks, and they all depend on the context from the previous menu:

```php
/albums/{album}/tracks
/artists/{artist}/top-tracks
/tracks/{track}
/playlists/{playlist}/tracks
/...
```

The confusion to this comes when you have a `PlaylistTrackController`, does it belong to the Playlist domain or the Track domain? Will you search for it inside the `routes/resources/playlists.php` or `routes/resources/tracks.php`.

Personally, if the controller returns a Track response, then it shouldn't be part of the Playlist, even if the Playlist is the parent resource.

Whether it's by domain or by the root of the path, it will require your team to align on the way you group routes and resources.

## When to group

There are some cases where grouping is useful and almost mandatory.

**Middleware** is one such example, which can be easily overlooked but can have severe consequences. Grouping routes with shared middleware can declutter your definitions and prevent expensive mistakes.

Sometimes, we may need to group items based on **technical considerations** rather than domain-specific reasons. Examples of this include using the `/api` prefix, indicating the version of an API with `/v1`, or specifying the website's locale with `/{locale}`.

## Trade-offs

One advantage of grouping paths is that it helps ensure consistent naming across all routes. If there's a typo in one path, it will likely affect all the others in the same group, making it easier to detect and fix the error compared to having a typo in a long list of 30 routes that share a common prefix.

These days, there are tools available in your IDE that can help you avoid typos, especially if you use English for your routes.
