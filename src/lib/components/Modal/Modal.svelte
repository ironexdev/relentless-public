<script lang="ts">
	import { portal } from '$lib/actions/portal';
	import { browser } from '$app/environment';
	import type { Snippet } from 'svelte';
	import * as UtilsService from '$lib/utils/string-utils.ts';
	import { t_modal_close } from '$lib/i18n/messages/t-modal.ts';
	import type { LocaleType } from '$lib/types/locale-type.ts';
	import { page } from '$app/state';

	type Props = {
		showModal: boolean;
		closeOnOverlayClick?: boolean;
		className?: string;
		children: Snippet;
		header?: Snippet;
		onClose?: () => void;
	};

	const locale: LocaleType = $derived(page.data.locale);

	let {
		showModal = $bindable(),
		closeOnOverlayClick = true,
		className = '',
		children,
		header,
		onClose
	}: Props = $props();

	const mounted = $derived(browser);

	function close() {
		showModal = false;
		onClose?.();
	}

	$effect(() => {
		const handleKeyPress = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				close();
			}
		};

		if (showModal) {
			document.body.style.overflow = 'hidden';
			document.addEventListener('keydown', handleKeyPress);
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.removeEventListener('keydown', handleKeyPress);
			document.body.style.overflow = '';
		};
	});

	function handleOverlayKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			close();
		}
	}
</script>

{#if mounted}
	<div class={UtilsService.cn('contents', !showModal && 'pointer-events-none')} use:portal>
		<button
			type="button"
			aria-label={t_modal_close(locale)}
			class={UtilsService.cn(
				'invisible fixed inset-0 z-modal-overlay w-full cursor-pointer bg-overlay opacity-0 transition-all duration-xs ease-in-out',
				showModal && 'visible opacity-100'
			)}
			onclick={() => closeOnOverlayClick && close()}
			onkeydown={handleOverlayKeydown}
		></button>

		<div
			class={UtilsService.cn(
				'fixed inset-x-4 top-1/2 z-modal mx-auto h-[90vh] max-h-[640px] w-[90vw] max-w-[600px] -translate-y-1/2 rounded-[20px]' +
					' translate-y-[calc(-50%+16px)] scale-95 border-primary bg-tertiary opacity-0 outline-none' +
					' inset-x-0',
				showModal
					? 'pointer-events-auto translate-y-[-50%] scale-100 opacity-100 transition-all duration-xs ease-out'
					: 'pointer-events-none',
				className
			)}
			role="dialog"
			aria-modal="true"
			tabindex="-1"
		>
			{#if header}
				<div class="h-20 w-full shrink-0">
					{@render header()}
				</div>
			{/if}

			<div class="w-full flex-1 overflow-y-auto">
				{@render children()}
			</div>
		</div>
	</div>
{/if}
