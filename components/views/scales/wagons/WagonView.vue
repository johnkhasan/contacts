<template>
  <Modal v-model="openExportModel" :title="$t('wagon.dowloadAsExcel')">
    <WagonExport @cancel="onCancel" />
  </Modal>

  <div class="flex-1 flex flex-col gap-5 overflow-auto" v-loading="status === 'pending'">
    <WagonFilter v-model="filterParams" @export="onExport" @get="execute" />

    <WagonList v-model="filterParams" :data="data!" @get="execute" />
  </div>
</template>

<script setup lang="ts">
import type { WagonFilterParams } from "@/types/wagon";
import type { basePagination } from "@/types/common";
import { useQuerySync } from "@/composables/useQuerySync";

const filterParams = reactive<Partial<WagonFilterParams & basePagination>>({
  wagonNumber: "",
  status: undefined,
  stationCode: undefined,
  fromDate: undefined,
  toDate: undefined,
  page: 1,
  size: 10
});

useQuerySync(filterParams);

const openExportModel = ref(false);

const { data, execute, status } =
  await useApiService({ params: filterParams })
    .Wagon_Scale_Values
    .WagonScaleValueController_findPagination();

function onExport() {
  openExportModel.value = true;
}

function onCancel() {
  openExportModel.value = false;
}
</script>
