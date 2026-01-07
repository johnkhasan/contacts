<template>
  <div class="flex justify-between gap-4">
    <Input v-model="model.cameraName" :placeholder="$t('wagon.search')" @input="$emit('get')" :icon="IconSearch"
      class="max-w-[250px]" />

    <!-- <div class="flex-1 flex items-center justify-end gap-4">
      <Select data-allow-mismatch v-model="model.companyId" @change="$emit('get')"
        :options="companies?.items ? useGenerateOptions(companies?.items) : []" :placeholder="$t('station.choose')"
        :icon="IconMap" class="max-w-[200px]"></Select>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { IconMap, IconSearch } from "#components";
import type { HelmetCamerasParams } from "@/types";

defineEmits(["get"]);

const { data: companies } = await useApiService().Camera.CameraController_countByCompanies();

const model = defineModel<Partial<HelmetCamerasParams>>({
  default: {}
});
</script>
