<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import MyButton from '$lib/components/Button/MyButton.svelte';
	import { ThemeEnum } from '$lib/enums/theme-enum';
	import { t_theme_toggle_dark_mode, t_theme_toggle_light_mode } from '$lib/i18n/messages/t-theme';
	import type { LocaleType } from '$lib/types/locale-type';
	import { MoonIcon, SunIcon } from '@lucide/svelte';

	const locale: LocaleType = $derived(page.data.locale);
	let theme = $state<ThemeEnum>(ThemeEnum.LIGHT);

	if (browser) {
		const savedTheme = localStorage.getItem('theme');
		const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

		if (savedTheme === ThemeEnum.DARK || savedTheme === ThemeEnum.LIGHT) {
			theme = savedTheme;
		} else {
			theme = systemPrefersDark ? ThemeEnum.DARK : ThemeEnum.LIGHT;
		}
	}

	$effect(() => {
		if (browser) {
			document.documentElement.setAttribute('data-theme', theme);
			localStorage.setItem('theme', theme);
		}
	});

	function isDarkMode() {
		return theme === ThemeEnum.DARK;
	}

	function toggleTheme() {
		theme = isDarkMode() ? ThemeEnum.LIGHT : ThemeEnum.DARK;
	}
</script>

<MyButton
	onclick={toggleTheme}
	variant="icon"
	size="icon-md"
	title={isDarkMode() ? t_theme_toggle_light_mode(locale) : t_theme_toggle_dark_mode(locale)}
>
	{#if isDarkMode()}
		<SunIcon class="size-5" />
	{:else}
		<MoonIcon class="size-5" />
	{/if}
</MyButton>
