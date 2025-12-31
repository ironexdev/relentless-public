<script lang="ts">
	import { page } from '$app/state';
	import MyButton from '$lib/components/Button/MyButton.svelte';
	import { t_logout_button_title } from '$lib/i18n/messages/t-logout';
	import type { LocaleType } from '$lib/types/locale-type';
	import { LogOutIcon } from '@lucide/svelte';

	type Props = {
		class?: string;
		buttonClass?: string;
		size?: 'sm' | 'md';
		variant?: 'icon' | 'primary';
	};

	const locale: LocaleType = $derived(page.data.locale);
	const { class: className, buttonClass, size = 'md', variant = 'primary' }: Props = $props();
</script>

<form method="POST" action="/auth?/logout" class={className}>
	<MyButton
		type="submit"
		variant={variant === 'icon' ? 'icon' : 'menu'}
		title={t_logout_button_title(locale)}
		aria-label={t_logout_button_title(locale)}
		class={buttonClass}
		size={variant === 'icon' ? (size === 'sm' ? 'icon-sm' : 'icon-md') : size}
	>
		<LogOutIcon class="size-5" />
		{#if variant === 'primary'}
			<span class="ml-3"> {t_logout_button_title(locale)}</span>
		{/if}
	</MyButton>
</form>
