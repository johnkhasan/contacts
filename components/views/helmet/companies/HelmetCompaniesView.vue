<template>
  <div class="flex flex-col h-full gap-4">
    <HelmetCompaniesFilter v-model="filterParams" v-model:view="isTableView" :options="data?.items" @get="execute" />
    <template v-if="!isTableView">
      <HelmetCompaniesList v-loading="status === 'pending'" v-if="data" :data="data" />
    </template>
    <template v-else>
      <HelmetCompaniesTable v-loading="status === 'pending'" v-if="data" :data="data" />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { basePagination, HelmetCompaniesParams } from '@/types';

const isTableView = ref<boolean>(false);

const filterParams = reactive<HelmetCompaniesParams & basePagination>({
  name: "",
  stationId: undefined,
  page: 1,
  size: 10
});

useQuerySync(filterParams);

const { data, status, execute } = await useApiService().Camera.CameraController_countByCompanies();
</script>