<template>
  <div class="flex flex-col gap-4 flex-1" v-loading="status === 'pending'">
    <camera-statistics-filter v-model="filterParams" @get="getData" />
    <camera-stats-cards v-if="data" :data="data" />

    <div class="flex gap-4 flex-1">
      <template v-if="data?.byStation">
        <camera-region-card :data="data.byStation" />
      </template>
      <template v-if="data?.byStation">
        <camera-chart-card :percentage="data.accuracy" />
      </template>
      <!-- <camera-type-chart /> -->

    </div>

    <camera-line-chart />
  </div>
</template>

<script setup lang="ts">
import type { StatisticsFilterParams } from '@/types';

const filterParams = reactive<StatisticsFilterParams>({
  start: undefined,
  end: undefined,
})

const { data, status, execute } = await useApiService({
  params: filterParams
}).WagonSession.WagonSessionController_getStatistics();

const getData = () => {
  execute();
};
</script>
