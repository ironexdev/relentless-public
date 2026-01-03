<script lang="ts">
	import Cropper, { type CropArea } from 'svelte-easy-crop';
	import { toast } from 'svelte-sonner';
	import { LoaderCircleIcon } from '@lucide/svelte';
	import type { LocaleType } from '$lib/types/locale-type';
	import { USER_IMAGE_SIZE } from '$lib/config';
	import { ImageProcessingService } from '$lib/services/image-processing-service';
	import {
		t_image_editor_loading,
		t_image_editor_saving,
		t_image_editor_client_error
	} from '$lib/i18n/messages/t-image-editor';
	import ImageEditorHeader from '$lib/components/ImageEditor/ImageEditorHeader.svelte';
	import ImageEditorFooter from '$lib/components/ImageEditor/ImageEditorFooter.svelte';

	type Props = {
		locale: LocaleType;
		imageUrl: string;
		onclose: () => void;
		onsave: (blob: Blob) => void;
	};

	let { locale, imageUrl, onclose, onsave }: Props = $props();

	const aspectRatio = 1;
	const cropShape = 'round' as const;
	const minImageHeight = 900;
	const minImageWidth = 720;
	const minZoom = 1;
	const zoomStep = 0.1;

	let crop = $state({ x: 0, y: 0 });
	let zoom = $state(1);
	let rotation = $state(0);
	let maxZoom = $state(3);
	let gridVisible = $state(true);
	let loading = $state<string | false>(false);
	let croppedAreaPixels = $state<CropArea | null>(null);
	let editorVisible = $state(false);

	$effect(() => {
		loading = t_image_editor_loading(locale);
		const timer = setTimeout(() => {
			editorVisible = true;
			loading = false;
		}, 300);

		return () => clearTimeout(timer);
	});

	$effect(() => {
		if (imageUrl) {
			const img = new Image();
			img.onload = () => {
				handleMediaLoaded({ width: img.naturalWidth, height: img.naturalHeight });
			};
			img.src = imageUrl;
		}
	});

	function handleCropComplete(event: { percent: CropArea; pixels: CropArea }) {
		croppedAreaPixels = event.pixels;
	}

	function handleMediaLoaded(mediaSize: { width: number; height: number }) {
		const { width: imageWidth, height: imageHeight } = mediaSize;
		const maxZoomWidth = imageWidth / minImageWidth;
		const maxZoomHeight = imageHeight / minImageHeight;
		const calculatedMaxZoom = Math.min(maxZoomWidth, maxZoomHeight);

		crop = { x: 0, y: 0 };
		maxZoom = Math.max(calculatedMaxZoom, minZoom);
	}

	function handlePreview() {
		gridVisible = !gridVisible;
	}

	function handleCenterX() {
		crop = { ...crop, x: 0 };
	}

	function handleCenterY() {
		crop = { ...crop, y: 0 };
	}

	function handleRotate() {
		rotation = (rotation + 90) % 360;
	}

	async function handleSave() {
		if (!imageUrl || !croppedAreaPixels) {
			toast.error(t_image_editor_client_error(locale));
			return;
		}

		loading = t_image_editor_saving(locale);

		try {
			const blob = await ImageProcessingService.getCroppedImg(
				imageUrl,
				croppedAreaPixels,
				rotation,
				USER_IMAGE_SIZE
			);

			if (!blob) {
				toast.error(t_image_editor_client_error(locale));
				loading = false;
				return;
			}

			onsave(blob);
		} catch {
			toast.error(t_image_editor_client_error(locale));
		}

		loading = false;
	}

	function handleClose() {
		editorVisible = false;
		setTimeout(() => {
			onclose();
		}, 300);
	}
</script>

<div
	class="fixed inset-0 z-modal mx-auto h-screen w-screen bg-black transition-transform duration-xs ease-in-out {editorVisible
		? 'translate-y-0'
		: 'translate-y-full'}"
>
	<ImageEditorHeader {locale} onclose={handleClose} />

	<div class="relative mx-auto h-full w-[960px] max-w-full">
		<div
			class="absolute inset-x-0 top-[50px] bottom-[80px] m-auto aspect-square max-h-[calc(100%-130px)]"
		>
			{#if loading}
				<div
					class="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-primary/90"
				>
					<LoaderCircleIcon class="animate-spin text-primary" size={32} />
					<span class="text-sm text-secondary">{loading}</span>
				</div>
			{/if}

			<div
				class="relative m-auto aspect-square max-h-full max-w-full transition-opacity duration-xs {editorVisible
					? 'opacity-100'
					: 'opacity-0'}"
			>
				<Cropper
					image={imageUrl}
					bind:crop
					bind:zoom
					aspect={aspectRatio}
					{cropShape}
					{minZoom}
					{maxZoom}
					showGrid={gridVisible}
					restrictPosition={true}
					oncropcomplete={handleCropComplete}
				/>
			</div>

			{#if gridVisible && maxZoom - zoomStep >= minZoom}
				<div
					class="absolute inset-x-0 bottom-[20px] z-10 mx-auto flex w-[200px] justify-center px-5"
				>
					<input
						type="range"
						bind:value={zoom}
						min={minZoom}
						max={maxZoom}
						step={zoomStep}
						aria-label="Zoom"
						class="zoom-range accent-primary w-full"
					/>
				</div>
			{/if}
		</div>
	</div>

	<ImageEditorFooter
		{locale}
		{gridVisible}
		isLoading={!!loading}
		onpreview={handlePreview}
		oncenterx={handleCenterX}
		oncentery={handleCenterY}
		onrotate={handleRotate}
		onsave={handleSave}
	/>
</div>

<style>
	.zoom-range {
		-webkit-appearance: none;
		appearance: none;
		background: transparent;
		cursor: pointer;
	}

	.zoom-range::-webkit-slider-runnable-track {
		height: 4px;
		border-radius: 2px;
		background: var(--color-tertiary, #444);
	}

	.zoom-range::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: var(--color-primary, #fff);
		margin-top: -6px;
	}

	.zoom-range::-moz-range-track {
		height: 4px;
		border-radius: 2px;
		background: var(--color-tertiary, #444);
	}

	.zoom-range::-moz-range-thumb {
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: var(--color-primary, #fff);
		border: none;
	}
</style>
