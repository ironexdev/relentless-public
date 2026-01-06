<script lang="ts">
	import { Edit3Icon, UploadIcon, Trash2Icon } from '@lucide/svelte';
	import type { LocaleType } from '$lib/types/locale-type';
	import ImageFlipper from '$lib/components/Image/ImageFlipper.svelte';
	import ContentImage from '$lib/components/Image/ContentImage.svelte';
	import ImageEditor from '$lib/components/ImageEditor/ImageEditor.svelte';
	import MyButton from '$lib/components/Button/MyButton.svelte';
	import {
		t_user_profile_image_flip_button,
		t_user_profile_image_upload_picture_hint,
		t_user_profile_image_upload_photo_hint,
		t_user_profile_image_picture_title,
		t_user_profile_image_photo_title,
		t_user_profile_image_change_picture,
		t_user_profile_image_change_photo,
		t_user_profile_image_upload_picture,
		t_user_profile_image_upload_photo,
		t_user_profile_image_remove_picture,
		t_user_profile_image_remove_photo
	} from '$lib/i18n/messages/t-user-profile-image';

	type Props = {
		locale: LocaleType;
		picturePath?: string | null;
		photoPath?: string | null;
		pictureFile?: File | null;
		photoFile?: File | null;
		picturePreviewUrl?: string | null;
		photoPreviewUrl?: string | null;
		pictureFallbackPath?: string;
		photoFallbackPath?: string;
		height?: number;
		width?: number;
		showDropzone?: boolean;
		showEditButton?: boolean;
		onPictureRemove?: () => void;
		onPhotoRemove?: () => void;
		class?: string;
	};

	let {
		locale,
		picturePath = null,
		photoPath = null,
		pictureFile = $bindable(null),
		photoFile = $bindable(null),
		picturePreviewUrl = $bindable(null),
		photoPreviewUrl = $bindable(null),
		pictureFallbackPath = 'user-avatar-placeholder.webp',
		photoFallbackPath = 'user-photo-placeholder.webp',
		height = 200,
		width = 200,
		showDropzone = false,
		showEditButton = false,
		onPictureRemove,
		onPhotoRemove,
		class: className
	}: Props = $props();

	let isFlipped = $state(false);
	let showEditMenu = $state(false);
	let pictureInputElement = $state<HTMLInputElement | null>(null);
	let photoInputElement = $state<HTMLInputElement | null>(null);
	let editMenuRef = $state<HTMLDivElement | null>(null);

	let editorImageUrl = $state<string | null>(null);
	let editorTarget = $state<'picture' | 'photo' | null>(null);

	const pictureDisplayUrl = $derived(picturePreviewUrl ?? picturePath);
	const photoDisplayUrl = $derived(photoPreviewUrl ?? photoPath);
	const hasPicture = $derived(!!pictureDisplayUrl);
	const hasPhoto = $derived(!!photoDisplayUrl);

	function openEditor(file: File, target: 'picture' | 'photo') {
		editorImageUrl = URL.createObjectURL(file);
		editorTarget = target;
	}

	function closeEditor() {
		if (editorImageUrl) {
			URL.revokeObjectURL(editorImageUrl);
		}
		editorImageUrl = null;
		editorTarget = null;
	}

	function handleEditorSave(blob: Blob) {
		const file = new File([blob], `${editorTarget}.webp`, { type: 'image/webp' });
		const previewUrl = URL.createObjectURL(blob);

		if (editorTarget === 'picture') {
			if (picturePreviewUrl) URL.revokeObjectURL(picturePreviewUrl);
			pictureFile = file;
			picturePreviewUrl = previewUrl;
		} else if (editorTarget === 'photo') {
			if (photoPreviewUrl) URL.revokeObjectURL(photoPreviewUrl);
			photoFile = file;
			photoPreviewUrl = previewUrl;
		}

		closeEditor();
	}

	function handlePictureChange(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];
		if (file) {
			openEditor(file, 'picture');
		}
		target.value = '';
	}

	function handlePhotoChange(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];
		if (file) {
			openEditor(file, 'photo');
		}
		target.value = '';
	}

	function handleDropzoneDrop(event: DragEvent) {
		event.preventDefault();
		const file = event.dataTransfer?.files?.[0];
		if (file && file.type.startsWith('image/')) {
			if (isFlipped) {
				openEditor(file, 'photo');
			} else {
				openEditor(file, 'picture');
			}
		}
	}

	function handleDropzoneDragOver(event: DragEvent) {
		event.preventDefault();
	}

	function openFilePicker() {
		if (isFlipped) {
			photoInputElement?.click();
		} else {
			pictureInputElement?.click();
		}
		showEditMenu = false;
	}

	function handleEditClick() {
		showEditMenu = true;
	}

	function handleRemove() {
		if (isFlipped) {
			if (photoPreviewUrl) URL.revokeObjectURL(photoPreviewUrl);
			photoPreviewUrl = null;
			photoFile = null;
			onPhotoRemove?.();
		} else {
			if (picturePreviewUrl) URL.revokeObjectURL(picturePreviewUrl);
			picturePreviewUrl = null;
			pictureFile = null;
			onPictureRemove?.();
		}
		showEditMenu = false;
	}

	function handleClickOutside(event: MouseEvent) {
		if (showEditMenu && editMenuRef && !editMenuRef.contains(event.target as Node)) {
			showEditMenu = false;
		}
	}

	const currentDropzoneHint = $derived(
		isFlipped
			? t_user_profile_image_upload_photo_hint(locale)
			: t_user_profile_image_upload_picture_hint(locale)
	);

	const changeTitle = $derived(
		isFlipped
			? t_user_profile_image_change_photo(locale)
			: t_user_profile_image_change_picture(locale)
	);

	const uploadTitle = $derived(
		isFlipped
			? t_user_profile_image_upload_photo(locale)
			: t_user_profile_image_upload_picture(locale)
	);

	const removeTitle = $derived(
		isFlipped
			? t_user_profile_image_remove_photo(locale)
			: t_user_profile_image_remove_picture(locale)
	);
</script>

<svelte:document onclick={handleClickOutside} />

<div class="flex w-full flex-col items-center gap-6 {className}">
	<input
		bind:this={pictureInputElement}
		type="file"
		name="picture"
		accept="image/*"
		onchange={handlePictureChange}
		class="hidden"
	/>
	<input
		bind:this={photoInputElement}
		type="file"
		name="photo"
		accept="image/*"
		onchange={handlePhotoChange}
		class="hidden"
	/>

	<div class="relative mx-auto" style="height: {height}px; width: {width + 80}px;">
		<ImageFlipper buttonTitle={t_user_profile_image_flip_button(locale)} bind:isFlipped>
			{#snippet frontImage()}
				<ContentImage
					fallbackPath={pictureFallbackPath}
					path={pictureDisplayUrl}
					title={t_user_profile_image_picture_title(locale)}
					{height}
					{width}
					class="rounded-full border-2 border-white object-cover shadow-lg select-none"
				/>
			{/snippet}

			{#snippet backImage()}
				<ContentImage
					fallbackPath={photoFallbackPath}
					path={photoDisplayUrl}
					title={t_user_profile_image_photo_title(locale)}
					{height}
					{width}
					class="rounded-full border-2 border-white object-cover shadow-lg select-none"
				/>
			{/snippet}
		</ImageFlipper>

		{#if showEditButton}
			{#if !showEditMenu}
				<MyButton
					type="button"
					variant="icon"
					size="icon-sm"
					class="absolute inset-y-0 right-0 my-auto text-secondary hover:text-primary"
					title={changeTitle}
					onclick={handleEditClick}
				>
					<Edit3Icon size={20} />
				</MyButton>
			{:else}
				<div
					bind:this={editMenuRef}
					class="absolute inset-y-0 right-0 my-auto flex h-fit flex-col gap-2"
				>
					<MyButton
						type="button"
						variant="icon"
						size="icon-sm"
						class="text-secondary hover:text-primary"
						title={uploadTitle}
						onclick={openFilePicker}
					>
						<UploadIcon size={20} />
					</MyButton>
					<MyButton
						type="button"
						variant="icon"
						size="icon-sm"
						class="text-secondary hover:text-primary"
						title={removeTitle}
						onclick={handleRemove}
					>
						<Trash2Icon size={20} />
					</MyButton>
				</div>
			{/if}
		{/if}
	</div>

	{#if showDropzone}
		<button
			type="button"
			ondrop={handleDropzoneDrop}
			ondragover={handleDropzoneDragOver}
			onclick={openFilePicker}
			class="flex h-[50px] w-full cursor-pointer items-center justify-center gap-2 rounded border-2 border-dashed border-primary text-secondary transition-colors hover:text-primary"
		>
			<UploadIcon
				size={20}
				class={isFlipped ? (hasPhoto ? 'text-primary' : '') : hasPicture ? 'text-primary' : ''}
			/>
			<span>
				{@html currentDropzoneHint}
			</span>
		</button>
	{/if}
</div>

{#if editorImageUrl}
	<ImageEditor {locale} imageUrl={editorImageUrl} onclose={closeEditor} onsave={handleEditorSave} />
{/if}
