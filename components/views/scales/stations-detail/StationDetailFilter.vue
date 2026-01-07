<template>
  <div class="flex justify-between gap-4">
    <Input v-model="model.wagonNumber" :placeholder="$t('wagon.number')" :icon="IconSearch" class="max-w-[250px]"
      @input="getData" />

    <div class="flex-1 flex items-center justify-end gap-4">
      <Select v-model="model.status" :options="options" :placeholder="$t('all.title')" :icon="IconFilter"
        class="max-w-[180px]" @change="getData" />
      <Button @click="$emit('export')" v-can="'get_wagon_scale_pdf'" :title="$t('action.downloadAsExcel')"
        :icon="IconFileDown" color="success" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconFileDown, IconFilter, IconSearch } from "#components";
import type { basePagination, StationFilterParams } from "@/types";

const { t } = useI18n();

const emit = defineEmits(["export", "get"]);


const model = defineModel<Partial<StationFilterParams & basePagination>>({
  default: {}
});

const options = computed<{ label: string, value: string }[]>(() => [
  { label: t('station.overload'), value: "overload" },
  { label: t('station.clean'), value: "clean" }
]);

const getData = () => {
  model.value.page = 1
  emit("get");
};
</script>
