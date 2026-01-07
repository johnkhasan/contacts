<template>
  <Modal v-model="openExportModel" :title="$t('wagon.dowloadAsExcel')">
    <StationDetailExport @cancel="onCancel" :stationCode="props.code" />
  </Modal>

  <div class="flex-1 flex flex-col gap-5 overflow-auto" v-loading="status === 'pending'">
    <StationDetailFilter v-model="filterParams" @export="onExport" @get="execute" />

    <StationDetailList :data="data?.items" />
    <Pagination :total="Number(data?.total)" v-model:page="filterParams.page" v-model:size="filterParams.size"
      @change="execute" />
  </div>
</template>

<script setup lang="ts">
import type { basePagination, StationFilterParams } from '@/types';

const props = defineProps<{
  code: string;
}>();

const filterParams = reactive<Partial<StationFilterParams & basePagination>>({
  status: undefined,
  wagonNumber: undefined,
  stationCode: props.code,
  page: 1,
  size: 10
});

useQuerySync(filterParams);

const { data, execute, status } = useApiService({ params: filterParams }).Wagon_Scale_Values.WagonScaleValueController_findPagination()

const openExportModel = ref<boolean>(false);

function onExport() {
  openExportModel.value = true;
}

function onCancel() {
  openExportModel.value = false;
}

</script>