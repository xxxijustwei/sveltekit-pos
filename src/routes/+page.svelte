<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button/index.js';

	const openWindow = (url: string) => {
		window.open(url, '_blank');
	};
</script>

<div class="flex h-screen flex-col items-center justify-center gap-4">
	<h1>Welcome to Svelte-POS</h1>
	<Button
		class="bg-blue-700 text-white hover:bg-blue-800"
		variant="outline"
		onclick={() => goto('/pos/cashier')}
	>
		Go to POS
	</Button>
	<Button
		class="bg-blue-700 text-white hover:bg-blue-800"
		variant="outline"
		onclick={() => openWindow('/pos/display')}
	>
		Go to POS Display
	</Button>
	<Button
		class="bg-blue-700 text-white hover:bg-blue-800"
		variant="outline"
		onclick={() => goto('/page-db')}
	>
		Go to DB
	</Button>
</div>
