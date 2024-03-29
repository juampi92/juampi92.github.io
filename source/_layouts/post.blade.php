@extends('_layouts.main')

@php
    $page->type = 'article';
@endphp

@section('meta')
    <link rel="canonical" href="{{ $page->getUrl() }}/" />
@endsection

@section('body')
    <h1 class="text-3xl sm:text-5xl font-normal">{{ $page->title }}</h1>

    <p class="mt-0 mb-12 text-gray-400">{{ date('F j, Y', $page->date) }}</p>

    @if ($page->categories)
        @foreach ($page->categories as $i => $category)
            <a
                href="{{ '/blog/categories/' . $category }}"
                title="View posts in {{ $category }}"
                class="inline-block bg-gray-300 hover:bg-blue-200 leading-loose tracking-wide text-gray-800 uppercase text-xs font-semibold rounded mr-4 px-3 pt-px"
            >{{ $category }}</a>
        @endforeach
    @endif

    <div class="border-b border-blue-200 mb-10 pb-3" v-pre>
        @yield('content')
    </div>

    <div class="border-blue-200 mb-10 pb-4 pt-1 text-center">
        <p>
            Have you found this helpful?
            <br> Follow me on <a title="Twitter" href="https://twitter.com/Juampi_92" target="_blank">
                <svg class="w-4 h-4 inline" viewBox="0 0 16 16" width="16" height="16"><g transform="matrix(0.6666666666666666,0,0,0.6666666666666666,0,0)"><path d="M23.32,6.44c0.212-0.177,0.241-0.492,0.065-0.704c-0.068-0.082-0.161-0.14-0.265-0.166l-0.79-0.2 c-0.268-0.067-0.431-0.339-0.364-0.606C21.974,4.731,21.986,4.7,22,4.67l0.44-0.89c0.12-0.249,0.015-0.548-0.233-0.668 C22.099,3.06,21.976,3.049,21.86,3.08l-2,0.56c-0.151,0.044-0.314,0.014-0.44-0.08c-0.865-0.649-1.918-1-3-1c-2.761,0-5,2.239-5,5 l0,0v0.36c0.001,0.127-0.094,0.235-0.22,0.25C8.39,8.5,5.7,7.07,2.8,3.73c-0.128-0.142-0.325-0.2-0.51-0.15 C2.124,3.656,2.013,3.817,2,4C1.599,5.645,1.761,7.377,2.46,8.92c0.062,0.123,0.013,0.274-0.11,0.336 C2.303,9.279,2.251,9.288,2.2,9.28L1.08,9.06C0.807,9.016,0.551,9.202,0.507,9.474C0.498,9.533,0.499,9.592,0.51,9.65 c0.175,1.555,1.047,2.945,2.37,3.78c0.124,0.06,0.176,0.21,0.116,0.334c-0.025,0.051-0.065,0.092-0.116,0.116l-0.53,0.21 c-0.256,0.103-0.381,0.394-0.278,0.65c0.005,0.014,0.011,0.027,0.018,0.04c0.595,1.302,1.791,2.229,3.2,2.48 c0.13,0.047,0.197,0.191,0.15,0.32c-0.025,0.07-0.08,0.124-0.15,0.15C3.93,18.292,2.471,18.575,1,18.56 c-0.276-0.055-0.545,0.124-0.6,0.4s0.124,0.545,0.4,0.6l0,0c2.548,1.208,5.321,1.866,8.14,1.93c2.479,0.038,4.915-0.658,7-2 c3.484-2.326,5.571-6.241,5.56-10.43V8.19c0.001-0.147,0.067-0.286,0.18-0.38L23.32,6.44z" stroke="none" fill="currentColor" stroke-width="0" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>
            </a> for more.
        </p>
    </div>

    <nav class="flex justify-between text-sm md:text-base">
        <div>
            @if ($next = $page->getNext())
                <a href="{{ $next->getUrl() }}/" title="Older Post: {{ $next->title }}">
                    &LeftArrow; {{ $next->title }}
                </a>
            @endif
        </div>

        <div>
            @if ($previous = $page->getPrevious())
                <a href="{{ $previous->getUrl() }}/" title="Newer Post: {{ $previous->title }}">
                    {{ $previous->title }} &RightArrow;
                </a>
            @endif
        </div>
    </nav>
@endsection
