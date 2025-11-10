// Requires css
export function buttonRippleAnimation(button: HTMLElement, event: PointerEvent): Promise<void> {
	const rect = button.getBoundingClientRect();

	const size = Math.max(rect.width, rect.height);

	const x = event.clientX - rect.left;

	const y = event.clientY - rect.top;

	const ripple = document.createElement('span');

	ripple.style.width = ripple.style.height = `${size}px`;

	ripple.style.left = `${x}px`;

	ripple.style.top = `${y}px`;

	ripple.classList.add('ripple');

	button.appendChild(ripple);

	return new Promise((resolve) => {
		ripple.addEventListener('animationend', () => {
			ripple.remove();
			resolve();
		});
	});
}

export function buttonScaleAnimation(button: HTMLElement) {
	button.style.transition = 'transform 100ms ease-out';
	button.style.transform = 'scale(0.95)';

	const release = () => {
		button.style.transform = 'scale(1)';

		const onTransitionEnd = () => {
			button.style.transition = '';
			button.style.transform = '';
			button.removeEventListener('transitionend', onTransitionEnd);
		};
		button.addEventListener('transitionend', onTransitionEnd);

		button.removeEventListener('pointerup', release);
		button.removeEventListener('pointerleave', release);
	};

	button.addEventListener('pointerup', release);
	button.addEventListener('pointerleave', release);
}

export function buttonAnimation(event: PointerEvent): Promise<void> {
	const button = event.currentTarget as HTMLElement;
	buttonScaleAnimation(button);
	return buttonRippleAnimation(button, event);
}
