<template>
  <div class="flex-1 flex flex-col gap-5 overflow-auto" v-loading="status === 'pending'">
    <CameraAllWagonsDetailFilter v-model="filterParams" @get="execute" />

    <CameraAllWagonsDetailList v-model="filterParams" :data="data!" @get="execute" @view="viewMethod" />
  </div>
</template>

<script setup lang="ts">
import type { basePagination } from "@/types/common";
import type { CameraWagonFilterParams } from "@/types";

const router = useRouter();

const filterParams = reactive<Partial<CameraWagonFilterParams & basePagination>>({
  page: 1,
  size: 10,
  fromDate: undefined,
  toDate: undefined,
});

useQuerySync(filterParams);

const { data, execute, status } = await useApiService({ params: filterParams }).WagonSession.WagonSessionController_findAll()

const viewMethod = (row: any) => {
  router.push(`/camera/all-wagons/${row.id}`);
};
</script>
