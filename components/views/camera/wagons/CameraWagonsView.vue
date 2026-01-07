<template>
  <div class="flex-1 flex flex-col gap-5 overflow-auto" v-loading="status === 'pending'">
    <CameraWagonsFilter v-model="filterParams" @get="execute" />

    <CameraWagonsList v-if="data" v-model="filterParams" :data="data" @get="execute" />
  </div>
</template>

<script setup lang="ts">
import type { basePagination } from "@/types/common";
import type { CameraListFilterParams } from "@/types";

const filterParams = reactive<Partial<CameraListFilterParams & basePagination>>({
  code: undefined,
  page: 1,
  size: 12
});

useQuerySync(filterParams);

const { data, execute, status } = useApiService({ params: filterParams }).WagonSession.WagonSessionController_countByStations()

</script>