<script lang="ts">
	import '../app.css';
	import { ToastEnum } from '$lib/enums/toast-enum';
	import { XIcon } from '@lucide/svelte';
	import type { Snippet } from 'svelte';
	import { Toaster, toast } from 'svelte-sonner';
	import { page } from '$app/state';
	import Announcement from '$lib/components/Announcement.svelte';
	import type { LocaleType } from '$lib/types/locale-type';
	import { t_announcement_activate_profile } from '$lib/i18n/messages/t-announcement.ts';
	import { TOAST_DURATION } from '$lib/config.ts';

	const { children }: { children: Snippet } = $props();
	const locale: LocaleType = $derived(page.data.locale);
	const user = $derived(page.data.user);
	const announcementMessage = $derived(user ? t_announcement_activate_profile(locale) : undefined);

	$effect(() => {
		if (page.data.toast?.type === ToastEnum.SUCCESS) {
			toast.success(page.data.toast.message);
		} else if (page.data.toast?.type === ToastEnum.ERROR) {
			toast.error(page.data.toast.message);
		}
	});
</script>

<svelte:head>
	<link rel="icon" href="/favicon/favicon.svg" />
	<link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
	<link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
	<link rel="shortcut icon" href="/favicon/favicon.ico" />
	<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
	<meta name="apple-mobile-web-app-title" content="MyWebSited" />
	<link rel="manifest" href="/site.webmanifest" />
</svelte:head>

{#snippet closeIconSnippet()}
	<XIcon class="size-5 cursor-pointer" />
{/snippet}

<div class="ntw-wrapper">
	<Announcement message={announcementMessage} />
	{@render children()}
</div>

<Toaster
	gap={10}
	duration={TOAST_DURATION}
	position="top-center"
	class="ml-0 gap-3"
	closeButton={true}
	closeIcon={closeIconSnippet}
	toastOptions={{
		unstyled: true,
		classes: {
			toast: 'text-white border-none w-[320px] rounded p-2.5 flex items-center gap-2.5',
			success: 'bg-toast-success',
			error: 'bg-toast-error',
			warning: 'bg-toast-warning',
			info: 'bg-toast-info',
			icon: 'order-first',
			closeButton: 'order-last ml-auto'
		}
	}}
/>
