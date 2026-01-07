<template>
  <div class="flex justify-between gap-4">
    <Input v-model="model.code" :placeholder="$t('camera.stationCode')" :icon="IconSearch" class="max-w-[280px]"
      @input="$emit('get')" />

    <div class="flex-1 flex items-center justify-end gap-4">
      <!-- <AppSwitch /> -->
      <!-- <Select
        v-model="model.stationId"
        :options="[]"
        :placeholder="$t('station.choose')"
        :icon="IconMap"
        class="max-w-[200px]"
      ></Select> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconSearch } from "#components";
import type { basePagination, CameraListFilterParams } from "@/types";

defineEmits(["get"]);

const model = defineModel<Partial<CameraListFilterParams & basePagination>>({
  default: {}
});
</script>
