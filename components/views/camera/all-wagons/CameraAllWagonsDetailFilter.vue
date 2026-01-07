<template>
  <div class="flex justify-between gap-4">
    <Input v-model="model.camera_name" :placeholder="$t('wagon.search')" @input="$emit('get')" :icon="IconSearch"
      class="max-w-[250px]" />

    <div class="flex items-center gap-5">
      <DateRangePicker v-model="localValue" type="daterange" class="max-w-[380px]" :icon="Calendar" @change="change"
        size="large" />

      <Select v-model="model.stationId" v-loading="status === 'pending'"
        :options="useGenerateOptions(organization?.items!)" :placeholder="$t('station.choose')" :icon="IconMap"
        class="max-w-[200px]" @change="$emit('get')" :filterable="true" :filter-method="getStations"></Select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconMap, IconSearch } from "#components";
import type { CameraWagonFilterParams } from "@/types";
import { Calendar } from "@element-plus/icons-vue";

const emit = defineEmits(["export", "get"]);

const model = defineModel<Partial<CameraWagonFilterParams>>({
  default: {}
});

const localValue = ref<any>([
  model.value.fromDate ? new Date(model.value.fromDate) : null,
  model.value.toDate ? new Date(model.value.toDate) : null,
]);

const orgFilterParams = reactive({
  type: "station",
  search: "",
  systemsAny: 4
});

const { t } = useI18n();

const { data: organization, status, execute } = await useApiService({ params: orgFilterParams }).Organizations.OrganizationsController_selectOrganizations()

const statusList = [
  { label: t("station.overload"), value: "overload" },
  { label: t("station.clean"), value: "clean" }
];

const getStations = (query: string) => {
  orgFilterParams.search = query;
  execute();
}

const change = () => {
  if (localValue.value) {
    model.value.fromDate = localValue.value[0]
      ? new Date(localValue.value[0]).toISOString()
      : new Date().toISOString();
    model.value.toDate = localValue.value[1]
      ? new Date(localValue.value[1]).toISOString()
      : new Date().toISOString();
  } else {
    model.value.fromDate = undefined;
    model.value.toDate = undefined;
  }
  emit("get");
};
</script>
