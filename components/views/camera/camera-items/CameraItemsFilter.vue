<template>
  <div class="flex justify-between gap-4">
    <Input v-model="model.wagonNumber" :placeholder="$t('wagon.number')" @input="$emit('get')" :icon="IconSearch"
      class="max-w-[250px]" />

    <div class="flex-1 flex items-center justify-end gap-4">
      <AppCheckbox v-model="model.withDefects" @change="$emit('get')" :title="$t('camera.itemsWithDefects')"
        class="max-w-[280px]" />

      <Button color="info" :icon="IconDownload" :title="$t('action.downloadAsExcel')" @click="$emit('export')"
        class="min-w-[120px]" v-can="'get_wagon_session_by_id'" />

      <Button color="info" :icon="IconCameraActivity" :title="$t('action.downloadRecord')" v-if="videoUrl"
        @click="$emit('video')" class="min-w-[120px]" v-can="'get_wagon_session_by_id'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconCameraActivity, IconDownload, IconSearch } from "#components";
import type { CameraItemsFilterParams } from "@/types";

defineEmits(["export", "get", "video"]);
defineProps({
  videoUrl: {
    type: String,
    required: false
  }
})

const model = defineModel<Partial<CameraItemsFilterParams>>({
  default: {}
});

</script>
