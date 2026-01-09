<template>
  <div
    class="h-[58px] flex items-center justify-between gap-4 p-4 bg-surface-50 border-b border-surface-30"
  >
    <div class="flex items-center gap-2">
      <span class="font-bold text-lg">{{ pageTitle }}</span>
    </div>
    <div class="flex items-center gap-4">
      <button
        @click="toggleTheme"
        class="p-2 rounded-lg hover:bg-surface-30 transition-colors"
      >
        <span v-if="isDark">🌞</span>
        <span v-else>🌙</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const pageTitle = computed(() => route.meta.title || "Dashboard");
const { isDark, toggleTheme } = useTheme();
</script>
