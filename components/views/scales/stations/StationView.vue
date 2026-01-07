<template>
  <div class="flex flex-col flex-1 gap-4 overflow-y-auto" v-loading="status === 'pending'">
    <StationFilter v-model="filterParams" @get="execute" />

    <div class="overflow-auto lg:h-[calc(100vh-260px)]">
      <StationList :data="data?.items" />
    </div>
    <pagination v-if="data?.total" :total="data?.total" v-model:page="filterParams.page" :page-sizes="[12, 24, 48, 96]"
      :current-page="filterParams.page" v-model:size="filterParams.size" @change="execute" />
  </div>
</template>

<script setup lang="ts">
const filterParams = reactive({
  name: "",
  page: 1,
  size: 12
});

useQuerySync(filterParams);

const { data, execute, status } = useApiService({ params: filterParams }).Wagon_Scale_Values.WagonScaleValueController_countByStations()
</script>
