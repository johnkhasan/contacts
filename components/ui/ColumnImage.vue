<template>
  <img :src="src" :alt="`${alt}`" class="rounded-md border border-surface-30" />
</template>

<script setup lang="ts">
type Props = {
  src?: string;
  alt?: string | number;
};

defineProps<Props>();
</script>
