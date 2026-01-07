<template>
  <div class="flex justify-between gap-4">
    <Input v-model="model.wagonNumber" :placeholder="$t('wagon.search')" @input="model.page = 1, $emit('get')"
      :icon="IconSearch" class="max-w-[250px]" />

    <div class="flex-1 flex items-center justify-end gap-4">
      <DateRangePicker v-model="localValue" class="max-w-[360px]" :icon="Calendar" @change="change" size="large"
        type="daterange" :placeholder="$t('camera.cards.select_date_range')" />

      <Select v-model="model.stationCode" v-loading="status === 'pending'"
        :options="organization?.items ? useGenerateOptions(organization?.items, 'code') : []"
        :placeholder="$t('station.choose')" :icon="IconMap" class="max-w-[200px]" @change="model.page = 1, $emit('get')"
        :filterable="true" :filter-method="getStations"></Select>

      <Select v-model="model.status" :options="statusList" :placeholder="$t('all.title')" :icon="IconFilter"
        class="max-w-[180px]" @change="model.page = 1, $emit('get')"></Select>
      <Button @click="$emit('export')" :title="$t('action.downloadAsExcel')" :icon="IconFileDown" color="success"
        v-can="'get_wagon_scale_pdf'"></Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconFileDown, IconFilter, IconMap, IconSearch } from "#components";
import { useMainStore } from "@/store/main";
import type { basePagination } from "@/types";
import type { WagonFilterParams } from "@/types/wagon";
import { Calendar } from "@element-plus/icons-vue";

const emit = defineEmits(["export", "get"]);

const mainStore = useMainStore();
const systemType = computed(() => mainStore.systemType)

const model = defineModel<Partial<WagonFilterParams & basePagination>>({
  default: {}
});
const localValue = ref<any>(model.value);

const orgFilterParams = reactive({
  type: "station",
  search: "",
  systemsAll: systemType.value.scale
});

const { t } = useI18n();

const { data: organization, status, execute } = await useApiService({ params: orgFilterParams }).Organizations.OrganizationsController_selectOrganizations()

const statusList = computed(() => [
  { label: t("station.overload"), value: "overload" },
  { label: t("station.clean"), value: "clean" }
])

const getStations = (query: string) => {
  orgFilterParams.search = query;
  execute();
}

const change = () => {
  model.value.fromDate = localValue.value && localValue.value[0]
    ? new Date(localValue.value[0]).toISOString()
    : undefined;
  model.value.toDate = localValue.value && localValue.value[1]
    ? new Date(localValue.value[1]).toISOString()
    : undefined;

  model.value.page = 1
  emit("get");
};

onMounted(() => {
  if (model.value.fromDate && model.value.toDate) {
    localValue.value = [
      new Date(model.value.fromDate),
      new Date(model.value.toDate)
    ];
  }
});
</script>