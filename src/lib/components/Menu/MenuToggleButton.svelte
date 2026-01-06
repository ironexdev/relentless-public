<script lang="ts">
	import { page } from '$app/state';
	import MyButton from '$lib/components/Button/MyButton.svelte';
	import { t_menu_toggle } from '$lib/i18n/messages/t-menu';
	import { toggleMenu } from '$lib/state/menu-state.svelte';
	import type { LocaleType } from '$lib/types/locale-type';
	import { MenuIcon } from '@lucide/svelte';

	type Props = {
		class?: string;
	};

	const { class: className }: Props = $props();
	const locale: LocaleType = $derived(page.data.locale);
</script>

<MyButton
	variant="icon"
	size="icon-md"
	onclick={() => toggleMenu()}
	data-testid="menu-open"
	title={t_menu_toggle(locale)}
	class={`text-[#52525B] ${className}`}
>
	<MenuIcon />
</MyButton>
