<template>
  <div class="flex-1 flex flex-col gap-5 overflow-auto" v-loading="status === 'pending'">
    <ScaleCustomsByBorderFilter v-model="filterParams" @export="onExport" @get="execute" @cancel="onCancel" />

    <ScaleCustomsByBorderList v-model="filterParams" :data="data?.items" @get="execute" />
    <Pagination :total="data?.total ?? 0" v-model:page="filterParams.page" v-model:size="filterParams.size"
      @get="execute" :page-sizes="[12, 24, 48, 96]" />
  </div>
</template>

<script setup lang="ts">
import type { WagonFilterParams } from "@/types/wagon";
import type { basePagination } from "@/types/common";
import { useQuerySync } from "@/composables/useQuerySync";


const filterParams = reactive<Partial<WagonFilterParams & basePagination>>({
  status: undefined,
  stationCode: undefined,
  page: 1,
  size: 12
});

useQuerySync(filterParams);

const openExportModel = ref(false);

const { data, execute, status } = await useApiService({ params: filterParams }).Wagon_Scale_Values.WagonScaleValueController_countByBorder();

function onExport() {
  openExportModel.value = true;
}

function onCancel() {
  openExportModel.value = false;
}
</script>
