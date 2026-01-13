<template>
  <div
    class="w-screen h-screen flex flex-col gap-4 justify-center items-center"
  >
    <h1 class="text-4xl font-bold">404 - Page Not Found</h1>
    <p class="text-gray-500">The page you are looking for does not exist.</p>
    <button
      @click="$router.push('/')"
      class="px-4 py-2 bg-blue-500 text-white rounded"
    >
      Go Home
    </button>
  </div>
</template>

<script setup lang="ts">
// Simple error page
</script>
