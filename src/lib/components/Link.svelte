<script lang="ts">
	export let href: string;
	export let className: string = '';
</script>

<a {href} class={className}>
	<slot />
</a>

<style>
	a {
		color: var(--link);
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}
</style>

