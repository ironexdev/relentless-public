<script lang="ts">
	import { InfoIcon, XIcon } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';
	import type { LocaleType } from '$lib/types/locale-type';
	import MyButton from '$lib/components/Button/MyButton.svelte';
	import {
		t_image_editor_title,
		t_image_editor_close_button,
		t_image_editor_info_toast
	} from '$lib/i18n/messages/t-image-editor';

	type Props = {
		locale: LocaleType;
		onclose: () => void;
	};

	let { locale, onclose }: Props = $props();

	function handleInfoClick() {
		toast.info(t_image_editor_info_toast(locale));
	}
</script>

<div
	class="absolute inset-x-0 top-0 z-10 mx-auto flex h-20 w-full items-center justify-center bg-tertiary px-4"
>
	<div class="relative flex h-full w-full max-w-[1440px] items-center justify-around">
		<MyButton
			type="button"
			variant="icon"
			size="icon-sm"
			title={t_image_editor_info_toast(locale)}
			onclick={handleInfoClick}
			class="text-secondary hover:text-primary"
		>
			<InfoIcon size={20} />
		</MyButton>

		<h3 class="text-lg text-primary sm:text-xl">
			{t_image_editor_title(locale)}
		</h3>

		<MyButton
			type="button"
			variant="icon"
			size="icon-sm"
			title={t_image_editor_close_button(locale)}
			onclick={onclose}
			class="text-secondary hover:text-primary"
		>
			<XIcon size={24} />
		</MyButton>
	</div>
</div>
