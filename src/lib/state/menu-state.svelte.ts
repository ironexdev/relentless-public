export const menuState = $state({
	isOpen: false
});

export function toggleMenu() {
	menuState.isOpen = !menuState.isOpen;
}

export function closeMenu() {
	menuState.isOpen = false;
}
