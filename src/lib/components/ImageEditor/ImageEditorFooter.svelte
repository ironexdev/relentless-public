<script lang="ts">
	import {
		CheckIcon,
		EyeIcon,
		EyeOffIcon,
		FlipHorizontal2Icon,
		FlipVertical2Icon,
		RotateCwIcon
	} from '@lucide/svelte';
	import type { LocaleType } from '$lib/types/locale-type';
	import ImageEditorButton from '$lib/components/ImageEditor/ImageEditorButton.svelte';
	import {
		t_image_editor_preview_button,
		t_image_editor_preview_label,
		t_image_editor_center_x_button,
		t_image_editor_center_x_label,
		t_image_editor_center_y_button,
		t_image_editor_center_y_label,
		t_image_editor_rotate_button,
		t_image_editor_rotate_label,
		t_image_editor_save_button,
		t_image_editor_save_label
	} from '$lib/i18n/messages/t-image-editor';

	type Props = {
		locale: LocaleType;
		gridVisible: boolean;
		isLoading: boolean;
		onpreview: () => void;
		oncenterx: () => void;
		oncentery: () => void;
		onrotate: () => void;
		onsave: () => void;
	};

	let { locale, gridVisible, isLoading, onpreview, oncenterx, oncentery, onrotate, onsave }: Props =
		$props();
</script>

<div class="absolute bottom-0 flex h-20 w-full items-center justify-center bg-tertiary">
	<div class="relative flex h-full w-full max-w-[600px] items-center justify-around">
		<ImageEditorButton
			title={t_image_editor_preview_button(locale)}
			icon={gridVisible ? EyeOffIcon : EyeIcon}
			onclick={onpreview}
			label={t_image_editor_preview_label(locale)}
			disabled={isLoading}
		/>
		<ImageEditorButton
			title={t_image_editor_center_x_button(locale)}
			icon={FlipHorizontal2Icon}
			onclick={oncenterx}
			label={t_image_editor_center_x_label(locale)}
			disabled={isLoading}
		/>
		<ImageEditorButton
			title={t_image_editor_center_y_button(locale)}
			icon={FlipVertical2Icon}
			onclick={oncentery}
			label={t_image_editor_center_y_label(locale)}
			disabled={isLoading}
		/>
		<ImageEditorButton
			title={t_image_editor_rotate_button(locale)}
			icon={RotateCwIcon}
			onclick={onrotate}
			label={t_image_editor_rotate_label(locale)}
			disabled={isLoading}
		/>
		<ImageEditorButton
			title={t_image_editor_save_button(locale)}
			icon={CheckIcon}
			onclick={onsave}
			label={t_image_editor_save_label(locale)}
			disabled={isLoading}
		/>
	</div>
</div>
