---
extends: _layouts.post
section: content
title: Dev-only Laravel config
date: 2023-01-20
description: Bloated configuration files in Laravel applications is an issue, particularly when using third-party packages. This post suggests disabling developer-only configuration files on production to keep configuration files lightweight and optimized.
thumbnail_image: /assets/images/4-dev-only-config.jpg
---

## Introduction

A key feature of Laravel is the way configuration files are handled. Configuration files are used to store and access a wide range of settings and parameters relevant for the application. As well as storing data like database connection strings or third-party service’s keys, they can also include application-specific data such as the title, authentication information, and other configuration settings.

## A Growing Problem

Configuration files can easily become bloated and grow out of hand. This is especially true when working with third-party packages. Many third-party packages also use configuration files to configure their settings.

Unfortunately, some of these packages are only meant to run on a development or CI/CD environment, but they will still introduce big configuration files into every production request.

Packages like [enlightn](https://github.com/enlightn/enlightn/blob/master/config/enlightn.php){target=_blank}, [debugbar](https://github.com/barryvdh/laravel-debugbar/blob/master/config/debugbar.php){target=_blank}, [laravel telescope](https://github.com/laravel/telescope/blob/4.x/config/telescope.php){target=_blank} are usually not used in production, yet they still contain a big configuration file that will be shipped to your production application.

## A Possible Solution

My suggestion to handle this problem is to disable these developer-only configuration files on production. By ignoring certain configuration files, production can keep their configuration files lightweight and optimized.

`config/debugbar.php`

```php
<?php

if (env('APP_ENV', 'production') === 'production') {
    return [
        'enabled' => false,
    ];
}

return [

    /*
    |--------------------------------------------------------------------------
    | Debugbar Settings
```

## Disclaimer

1) We can’t use `app()->environment(...)` inside config files because this method internally uses the config. Instead, we can use `env('APP_ENV')`

2) In third-party packages we can’t return an empty array `[]` because Laravel will use the package’s default configuration if no local configuration is found. Having at least one property will override this behavior and still keep a slim configuration for production.

3) Having a different configuration for production can cause unexpected and untested results, so it is very important you are confident the code will fall back correctly.
