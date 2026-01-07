<template>
  <div class="flex justify-between gap-4">
    <Input v-model="model.name" :placeholder="$t('station.search')" :icon="IconSearch" class="max-w-[250px]"
      @input="model.page = 1, $emit('get')" />

    <!-- <div class="flex-1 flex items-center justify-end gap-4">
      <Select v-model="model.stationId" :options="[]" :placeholder="$t('all.title')" :icon="IconFilter"
        @change="$emit('get'), model.page = 1" class="max-w-[180px]"></Select>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { IconFilter, IconSearch } from "#components";
import type { basePagination } from "@/types";
import type { WagonFilterParams } from "@/types/wagon";

const emit = defineEmits<{
  (get: "get"): void;
}>();

const model = defineModel<Partial<WagonFilterParams & basePagination>>({
  default: {}
});
</script>
