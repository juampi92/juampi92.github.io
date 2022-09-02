---
title: Home
description: My thoughts on web development.
pagination:
    collection: posts
    perPage: 10
---
@extends('_layouts.main')

@section('body')

    @if($pagination->currentPage === 1)
        <h1 class="text-3xl">Hi 👋🏼</h1>
        <p>
            I'm <b>Juan Pablo Barreto</b>, a PHP developer from Argentina living in <b>Amsterdam</b>.
            <br>I currently work @ <a href="https://www.studocu.com/" target="_blank">Studocu</a> as a Staff Engineer.</p>
        <p>
            You can check out my open source contributions in <a title="Github" href="https://github.com/juampi92" target="_blank">Github</a>, and you can contact me on <a title="Twitter" href="https://twitter.com/Juampi_92" target="_blank">Twitter</a>.
        </p>
        <hr/>
    @endif

    @foreach ($pagination->items as $post)
        @include('_components.post-preview-inline')

        @if ($post != $pagination->items->last())
            <hr class="border-b my-6">
        @endif
    @endforeach

    @if ($pagination->pages->count() > 1)
        <nav class="flex text-base my-8">
            @if ($previous = $pagination->previous)
                <a
                        href="{{ $previous }}"
                        title="Previous Page"
                        class="bg-gray-200 hover:bg-gray-400 rounded mr-3 px-5 py-3"
                >&LeftArrow;</a>
            @endif

            @foreach ($pagination->pages as $pageNumber => $path)
                <a
                        href="{{ $path }}"
                        title="Go to Page {{ $pageNumber }}"
                        class="bg-gray-200 hover:bg-gray-400 rounded mr-3 px-5 py-3 {{ $pagination->currentPage == $pageNumber ? 'text-gray-600' : 'text-blue-700' }}"
                >{{ $pageNumber }}</a>
            @endforeach

            @if ($next = $pagination->next)
                <a
                        href="{{ $next }}"
                        title="Next Page"
                        class="bg-gray-200 hover:bg-gray-400 rounded mr-3 px-5 py-3"
                >&RightArrow;</a>
            @endif
        </nav>
    @endif
@stop
