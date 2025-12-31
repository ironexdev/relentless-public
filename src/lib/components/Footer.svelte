<script lang="ts">
	import LogoutButton from '$lib/components/Auth/LogoutButton.svelte';
	import NavLink from '$lib/components/Link/NavLink.svelte';
	import Menu from '$lib/components/Menu/Menu.svelte';
	import MenuToggleButton from '$lib/components/Menu/MenuToggleButton.svelte';
	import { t_footer_login_button } from '$lib/i18n/messages/t-footer.ts';
	import { t_footer_registration_button } from '$lib/i18n/messages/t-footer.ts';
	import type { LocaleType } from '$lib/types/locale-type';
	import { UserRoundCheckIcon, UserRoundPlusIcon } from '@lucide/svelte';
	import { page } from '$app/state';

	type Props = {
		class?: string;
	};

	const { class: className = 'ntw-footer' }: Props = $props();
	const user = $derived(page.data.user);
	const locale: LocaleType = $derived(page.data.locale);
</script>

<footer class={className}>
	<div class="mx-auto flex size-full max-w-[640px] items-center gap-5">
		<MenuToggleButton />
		<div class="ml-auto flex items-center">
			{#if user}
				<div
					class="absolute inset-x-0 bottom-5 mx-auto size-[120px] rounded-full border-2 border-white sm:size-[160px]"
				>
					<img class="size-full rounded-full" src="/media/user-photo.webp" />
				</div>
				<LogoutButton variant="icon" />
			{:else}
				<div class="flex items-center justify-center gap-2.5">
					<NavLink
						href="/login"
						class="flex items-center gap-3 rounded-full hover:bg-quaternary"
						activeClass="bg-quaternary"
						title={t_footer_login_button(locale)}
						size="sm"
					>
						<UserRoundCheckIcon class="size-5" />
						<span class="hidden lg:block">{t_footer_login_button(locale)}</span>
					</NavLink>
					<NavLink
						href="/create-account"
						class="flex items-center gap-3 rounded-full hover:bg-quaternary"
						activeClass="bg-quaternary"
						title={t_footer_registration_button(locale)}
						size="sm"
					>
						<UserRoundPlusIcon class="size-5" />
						<span class="hidden lg:block">{t_footer_registration_button(locale)}</span>
					</NavLink>
				</div>
			{/if}
		</div>
	</div>
	<Menu />
</footer>
