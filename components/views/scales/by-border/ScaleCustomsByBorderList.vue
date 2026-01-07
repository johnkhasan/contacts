<template>
  <div class="flex-1 overflow-y-auto">
    <div class="grid grid-cols-4 gap-5">
      <BorderCard v-for="item in data" :key="item.border.id" :item="item"
        @click="$router.push(`/scales/by-border/${item.border.code}`)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { components } from '@/api/apiMethods.types';

type CustomsScaleCountByBorderItem = components['schemas']['CustomsScaleCountByBorderItem'];

defineProps<{
  data: CustomsScaleCountByBorderItem[] | undefined;
}>();
</script>
