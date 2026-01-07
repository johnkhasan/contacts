<template>
  <div class="flex justify-between gap-4">
    <Input v-model="model.wagonNumber" :placeholder="$t('wagon.search')" @input="model.page = 1, $emit('get')"
      :icon="IconSearch" class="max-w-[250px]" />

    <div class="flex-1 flex items-center justify-end gap-4">
      <Select v-model="model.status" :options="statusList" :placeholder="$t('all.title')" :icon="IconFilter"
        class="max-w-[180px]" @change="model.page = 1, $emit('get')"></Select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconFilter, IconSearch } from "#components";
import type { basePagination } from "@/types";
import type { WagonFilterParams } from "@/types/wagon";

defineEmits(["export", "get"]);

const model = defineModel<Partial<WagonFilterParams & basePagination>>({
  default: {}
});

const { t } = useI18n();

const statusList = computed(() => [
  { label: t("station.overload"), value: "overload" },
  { label: t("station.clean"), value: "clean" }
])

</script>
