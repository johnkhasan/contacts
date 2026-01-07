<template>
  <Modal v-model="openExportModel" :title="$t('wagon.dowloadAsExcel')">
    <ByBorderDetailImportExport @cancel="onCancel" />
  </Modal>
  <div class="flex-1 flex flex-col gap-5 overflow-auto" v-loading="status === 'pending'">
    <ByBorderDetailImportFilter v-model="filterParams" :tab="tab" @export="onExport" @get="execute" />

    <ByBorderDetailImportList v-model="filterParams" :data="data!" @get="execute" />
  </div>
</template>

<script setup lang="ts">
import type { WagonFilterParams } from "@/types/wagon";
import type { basePagination } from "@/types/common";
import { useQuerySync } from "@/composables/useQuerySync";

const props = defineProps({
  code: {
    type: String,
    required: true
  },
  tab: {
    type: Object as () => { active: "import" | "export", sostavNumber?: string },
    required: true
  }
})

const filterParams = reactive<Partial<WagonFilterParams & basePagination>>({
  wagonNumber: "",
  status: undefined,
  stationCode: undefined,
  sostavNumber: props.tab.sostavNumber,
  type: "import",
  page: 1,
  size: 10,
  borderCustomsCode: props.code
});

useQuerySync(filterParams);

const openExportModel = ref(false);

const { data, execute, status } = await useApiService({ params: filterParams }).Wagon_Scale_Values.WagonScaleValueController_listCustomScales();

function onExport() {
  openExportModel.value = true;
}

function onCancel() {
  openExportModel.value = false;
}
</script>
