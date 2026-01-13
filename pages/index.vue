<template>
  <div class="flex flex-col items-center justify-center h-full gap-5">
    <h1 class="text-4xl font-bold">Welcome to Nuxt Template</h1>
    <p class="text-lg text-gray-500">
      This is a clean template ready for your project.
    </p>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

useHead({
  title: "Dashboard"
});
</script>
