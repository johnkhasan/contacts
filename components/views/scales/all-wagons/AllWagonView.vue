<template>
  <Modal v-model="openCreateWagonModel" :title="$t('action.create.createNewWagon')">
    <AllWagonCreate @cancel="onCancel" @get="execute" />
  </Modal>

  <div class="flex-1 flex flex-col gap-5 overflow-auto" v-loading="status === 'pending'">
    <AllWagonFilter v-model="filterParams" @create="onCreate" @get="execute" />

    <AllWagonList v-model="filterParams" :data="data!" @get="execute" />
  </div>
</template>

<script setup lang="ts">
import type { WagonFilterParams } from "@/types/wagon";
import type { basePagination } from "@/types/common";

const filterParams = reactive<Partial<WagonFilterParams & basePagination>>({
  wagonNumber: undefined,
  page: 1,
  size: 10
});

useQuerySync(filterParams);

const openCreateWagonModel = ref<boolean>(false);

const { data, execute, status } = await useApiService({ params: filterParams }).Wagons.findWagonsWithPagination()

function onCreate() {
  openCreateWagonModel.value = true;
}

function onCancel() {
  openCreateWagonModel.value = false;
}
</script>
