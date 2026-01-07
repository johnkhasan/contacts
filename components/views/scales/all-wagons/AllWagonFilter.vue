<template>
  <div class="flex justify-between gap-4">
    <Input v-model="model.wagonNumber" @input="model.page = 1, $emit('get')" :placeholder="$t('wagon.search')"
      :icon="IconSearch" class="max-w-[250px]" />

    <div class="flex-1 flex items-center justify-end gap-4">
      <Select v-model="status" :options="statusList" :placeholder="$t('all.title')" :icon="IconFilter"
        class="max-w-[240px]" @change="changeStatus"></Select>

      <Select v-model="hasData" :options="hasDataList" :placeholder="$t('all.title')" :icon="IconFilter"
        class="max-w-[320px]" @change="changeData"></Select>

      <Button v-can="'create_wagon'" @click="$emit('create')" :title="$t('action.create.createNewWagon')"
        :icon="IconAddSquare" color="info"></Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconAddSquare, IconFilter, IconSearch } from "#components";
import type { basePagination } from "@/types";
import type { WagonFilterParams } from "@/types/wagon";

const { t } = useI18n();

const emit = defineEmits(["create", "get"]);

const model = defineModel<Partial<WagonFilterParams & basePagination>>({
  default: {}
});

const status = ref<string | undefined>(undefined);
const hasData = ref<string | undefined>(undefined);

const statusList = computed(() => [
  { label: t("allWagons.confirmed"), value: "has_wagon_session" },
  { label: t("allWagons.unconfirmed"), value: "no_wagon_session" }
])

const hasDataList = computed(() => [
  { label: t("allWagons.hasWagonInformations"), value: "has_data" },
  { label: t("allWagons.noWagonInformations"), value: "no_data" }
])

const changeStatus = () => {
  if (status.value === "has_wagon_session") {
    model.value.hasWagonSession = true;
  } else if (status.value === "no_wagon_session") {
    model.value.hasWagonSession = false;
  } else {
    model.value.hasWagonSession = undefined;
  }
  model.value.page = 1;
  emit("get");
};

const changeData = () => {
  if (hasData.value === "has_data") {
    model.value.hasData = true;
  } else if (hasData.value === "no_data") {
    model.value.hasData = false;
  } else {
    model.value.hasData = undefined;
  }
  model.value.page = 1;
  emit("get");
};

</script>
