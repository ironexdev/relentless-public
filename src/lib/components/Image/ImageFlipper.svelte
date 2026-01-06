<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ArrowRightLeftIcon } from '@lucide/svelte';
	import MyButton from '$lib/components/Button/MyButton.svelte';

	type Props = {
		frontImage: Snippet;
		backImage: Snippet;
		buttonTitle: string;
		isFlipped?: boolean;
		onFlip?: (flipped: boolean) => void;
	};

	let {
		frontImage,
		backImage,
		buttonTitle,
		isFlipped = $bindable(false),
		onFlip
	}: Props = $props();

	let rotation = $state(0);

	function handleFlip() {
		if (isFlipped) {
			rotation = 0;
			isFlipped = false;
		} else {
			rotation = -180;
			isFlipped = true;
		}
		onFlip?.(isFlipped);
	}
</script>

<div class="perspective relative flex h-full w-full justify-center">
	<MyButton
		type="button"
		variant="icon"
		size="icon-sm"
		class="absolute inset-y-0 left-0 my-auto text-secondary hover:text-primary"
		title={buttonTitle}
		onclick={handleFlip}
	>
		<ArrowRightLeftIcon size={20} />
	</MyButton>

	<button
		type="button"
		class="relative h-full w-[calc(100%-80px)] cursor-pointer"
		onclick={handleFlip}
		aria-label={buttonTitle}
	>
		<div
			class="preserve-3d relative h-full w-full transition-transform duration-300"
			style="transform: rotate3d(0,1,0,{rotation}deg);"
		>
			<div class="absolute inset-0 flex items-center justify-center backface-hidden">
				{@render frontImage()}
			</div>
			<div class="absolute inset-0 flex rotate-y-180 items-center justify-center backface-hidden">
				{@render backImage()}
			</div>
		</div>
	</button>
</div>

<style>
	.perspective {
		perspective: 1000px;
	}

	.preserve-3d {
		transform-style: preserve-3d;
	}

	.backface-hidden {
		backface-visibility: hidden;
	}

	.rotate-y-180 {
		transform: rotateY(180deg);
	}
</style>
