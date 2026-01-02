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
	<div class="contents" use:portal>
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
				'pointer-events-auto fixed inset-x-0 top-[15vh] bottom-0 z-modal mx-auto w-full origin-bottom [transform:translate3d(0,100%,0)] rounded-t-[32px] border border-b-0 border-primary bg-tertiary transition-transform duration-xs ease-in-out outline-none',
				showModal && '[transform:translate3d(0,0,0)]',
				className
			)}
			role="dialog"
			aria-modal="true"
			tabindex="-1"
		>
			{#if header}
				<div class="header-based-h w-full shrink-0">
					{@render header()}
				</div>
			{/if}

			<div class="w-full flex-1 overflow-y-auto">
				{@render children()}
			</div>
		</div>
	</div>
{/if}
