<div class="flex flex-col mb-4">
    <h2 class="text-3xl mt-0">
        <a
            href="{{ $post->getUrl() }}/"
            title="Read more - {{ $post->title }}"
            class="font-normal"
        >{{ $post->title }}</a>
        <p class="text-gray-500 font-thin my-2 text-sm">
            {{ $post->getDate()->format('F j, Y') }}
        </p>
    </h2>

    <p class="mb-4 mt-0">{{ $post->description }}</p>

    <a
        href="{{ $post->getUrl() }}/"
        title="Read more - {{ $post->title }}"
        class="uppercase font-semibold tracking-wide mb-2"
    >Read</a>
</div>
