<template>
  <div class="flex justify-between gap-4">
    <Input v-model="model.name" @input="$emit('get')" :placeholder="$t('wagon.search')" :icon="IconSearch"
      class="max-w-[250px]" />
    <AppSwitch v-model="view" />

    <div class="flex-1 flex items-center justify-end gap-4">
      <!-- <Select v-model="model.stationId" :options="[]" :placeholder="$t('station.choose')" :icon="IconMap"
        class="max-w-[200px]"></Select> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconMap, IconSearch } from "#components";
import type { WagonFilterParams } from "@/types/wagon";

defineEmits(["get"]);

const model = defineModel<Partial<WagonFilterParams>>({
  default: {}
});

const view = defineModel<boolean>('view', {
  default: false
});
</script>
