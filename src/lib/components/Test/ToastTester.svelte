<script lang="ts">
	import { toast } from 'svelte-sonner';

	function showSuccess() {
		toast.success('This is a success message!');
	}

	function showError() {
		toast.error('This is an error message!');
	}

	function showInfo() {
		toast.info('This is an info message!');
	}

	function showWarning() {
		toast.warning('This is a warning message!');
	}

	function showAll() {
		toast.success('Success toast');
		toast.error('Error toast');
		toast.info('Info toast');
		toast.warning('Warning toast');
	}
</script>

<div class="fixed right-4 bottom-4 z-50 flex flex-col gap-2 rounded bg-gray-800 p-4 shadow-lg">
	<p class="mb-2 text-sm font-semibold text-white">Toast Tester</p>
	<button
		onclick={showSuccess}
		class="rounded bg-toast-success px-3 py-1.5 text-sm text-white hover:opacity-90"
	>
		Success
	</button>
	<button
		onclick={showError}
		class="rounded bg-toast-error px-3 py-1.5 text-sm text-white hover:opacity-90"
	>
		Error
	</button>
	<button
		onclick={showInfo}
		class="rounded bg-toast-info px-3 py-1.5 text-sm text-white hover:opacity-90"
	>
		Info
	</button>
	<button
		onclick={showWarning}
		class="rounded bg-toast-warning px-3 py-1.5 text-sm text-white hover:opacity-90"
	>
		Warning
	</button>
	<button
		onclick={showAll}
		class="rounded bg-gray-600 px-3 py-1.5 text-sm text-white hover:opacity-90"
	>
		Show All
	</button>
</div>
