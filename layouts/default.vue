<template>
  <div class="flex dark:bg-surface-50 max-w-[2780px] mx-auto shadow-md">
    <AppSidebar />
    <div class="w-screen h-screen py-4 pr-4 max-w-[calc(100vw-260px)]">
      <div
        class="w-full h-full flex flex-col gap-6 p-4 rounded-2xl overflow-y-auto bg-surface-40 border border-surface-30"
      >
        <AppNavbar />
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Layout logic here
</script>
