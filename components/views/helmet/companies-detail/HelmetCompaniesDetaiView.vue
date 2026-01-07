<template>
  <div class="flex-1 flex flex-col gap-5 overflow-auto" v-loading="status === 'pending'">
    <HelmetCompaniesDetaiFilter v-model="filterParams" @get="execute" />

    <HelmetCompaniesDetaiList v-model="filterParams" v-if="data" :data="data" @get="execute" />
  </div>
</template>

<script setup lang="ts">
import type { basePagination, HelmetCamerasParams } from '@/types';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const filterParams = reactive<Partial<HelmetCamerasParams & basePagination>>({
  page: 1,
  size: 10,
  companyId: props.id,
  fromDate: undefined,
  toDate: undefined,
});

useQuerySync(filterParams);

const { data, execute, status } = await useApiService({ params: filterParams }).Camera.CameraController_list();
</script>