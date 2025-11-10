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
	};

	const locale: LocaleType = $derived(page.data.locale);
	const { class: className, buttonClass, size = 'md' }: Props = $props();
</script>

<form method="POST" action="/auth?/logout" class={className}>
	<MyButton
		type="submit"
		variant="menu"
		title={t_logout_button_title(locale)}
		aria-label={t_logout_button_title(locale)}
		class={buttonClass}
		{size}
	>
		<LogOutIcon class="size-5" />
		<span class="ml-3"> {t_logout_button_title(locale)}</span>
	</MyButton>
</form>
