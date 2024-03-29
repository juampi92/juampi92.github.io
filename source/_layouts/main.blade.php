<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta http-equiv="x-ua-compatible" content="ie=edge">

        <meta property="og:title" content="{{ $page->title ? $page->title . ' - ' : '' }}{{ $page->siteName }}"/>
        <meta name="twitter:title" content="{{ $page->title ? $page->title . ' - ' : '' }}{{ $page->siteName }}">

        <meta property="og:type" content="{{ $page->type ?? 'website' }}" />
        <meta property="og:url" content="{{ $page->getUrl() }}/"/>

        <meta name="description" content="{{ $page->description ?? $page->siteDescription }}">
        <meta property="og:description" content="{{ $page->description ?? $page->siteDescription }}" />

        <meta name="twitter:card" content="article">
        @if($page->thumbnail_image)
            <meta name="image" content="{{ $page->baseUrl }}{{ $page->thumbnail_image }}" />
            <meta property="og:image" content="{{ $page->baseUrl }}{{ $page->thumbnail_image }}" />
            <meta name="twitter:image" content="{{ $page->baseUrl }}{{ $page->thumbnail_image }}" />
            <meta name="twitter:card" content="summary_large_image"/>
        @endif

        <meta name="twitter:creator" content="@juampi_92"/>

        <title>{{ $page->title ?  $page->title . ' | ' : '' }}{{ $page->siteName }}</title>

        <link rel="home" href="{{ $page->baseUrl }}">

        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png">
        <link rel="manifest" href="/favicon/site.webmanifest">

        <link href="/blog/feed.atom" type="application/atom+xml" rel="alternate" title="{{ $page->siteName }} Atom Feed">

        @if ($page->production)
            <!-- Global site tag (gtag.js) - Google Analytics -->
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-FKJEWDM5N9"></script>
            <script>
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-FKJEWDM5N9');
            </script>
        @endif

        <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:300,300i,400,400i,700,700i,800,800i" rel="stylesheet">
        @yield('meta')

        <link rel="stylesheet" href="{{ mix('css/main.css', 'assets/build') }}">
    </head>

    <body class="flex flex-col justify-between min-h-screen text-gray-800 leading-normal font-sans">
        <header class="flex items-center shadow bg-white border-b h-18 py-4" role="banner">
            <div class="container flex items-center max-w-8xl mx-auto px-4 lg:px-8">
                <div class="flex items-center">
                    <a href="/" title="{{ $page->siteName }} home" class="inline-flex items-center">
                        <h1 class="text-lg md:text-2xl text-blue-800 font-normal hover:text-blue-600 my-0">{{ $page->siteName }}</h1>
                    </a>
                </div>

                <div class="flex flex-1 justify-end items-center">
                    @include('_nav.menu')
                    @include('_nav.menu-toggle')
                </div>
            </div>
        </header>

        @include('_nav.menu-responsive')

        <main role="main" class="flex-auto w-full container max-w-4xl mx-auto py-8 px-10">
            @yield('body')
        </main>

        <footer class="bg-white text-center text-sm mt-6 py-4 border-t-2 border-t-gray-300" role="contentinfo">
            <ul class="flex flex-col md:flex-row justify-center list-none">
                <li class="md:mr-2">
                    &copy; Juan Pablo Barreto {{ date('Y') }}.
                </li>

                <li>
                    Built with <a href="http://jigsaw.tighten.co" title="Jigsaw by Tighten">Jigsaw</a>
                    and <a href="https://tailwindcss.com" title="Tailwind CSS, a utility-first CSS framework">Tailwind CSS</a>;
                    hosted by <a href="https://pages.github.com/">GitHub Pages</a>.
                </li>
            </ul>
        </footer>

        <script src="{{ mix('js/main.js', 'assets/build') }}"></script>

        @stack('scripts')
    </body>
</html>
