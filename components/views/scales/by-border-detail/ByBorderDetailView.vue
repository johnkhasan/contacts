<template>
  <el-tabs type="border-card" v-model="tab.active">
    <el-tab-pane :label="$t('scales.import')" name="import">
      <div class="flex flex-col flex-1 gap-5">
        <ByBorderDetailFilter v-if="!tab.sostavNumber" v-model="filterParams" @get="execute" />
        <template v-if="!tab.sostavNumber">
          <div class="flex flex-col gap-5 flex-1 justify-between">
            <div class="grid grid-cols-4 gap-5 overflow-y-auto">
              <BorderGroupCard v-for="(item, index) in data?.items" :item="item" :key="index"
                @click="tab.sostavNumber = item.sostavNumber" />
            </div>
            <template v-if="!data?.items?.length">
              <div class="flex justify-center items-center flex-1">
                <el-empty />
              </div>
            </template>
            <Pagination class="mb-5" :total="data?.total ?? 0" v-model:page="filterParams.page"
              v-model:size="filterParams.size" @get="execute" :page-sizes="[12, 24, 48, 96]" />
          </div>
        </template>
        <template v-else>
          <ByBorderDetailImportView v-if="code && tab.active === 'import'" :code="code" :tab="tab" />
        </template>
      </div>
    </el-tab-pane>
    <el-tab-pane :label="$t('scales.export')" name="export">
      <ByBorderDetailExportView v-if="code && tab.active === 'export'" :code="code" />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { useQuerySync } from "@/composables/useQuerySync";
import type { basePagination } from "@/types";

const props = defineProps({
  code: {
    type: String,
    required: true
  }
})

const filterParams = reactive<Partial<basePagination & { borderCode: string, sostavNumber?: string }>>({
  page: 1,
  size: 12,
  borderCode: props.code
});

const { data, execute } = useApiService({
  params: filterParams
}).Wagon_Scale_Values.WagonScaleValueController_countBySostav();

const tab = reactive<{ active: "import" | "export", sostavNumber?: string }>({
  active: "import",
  sostavNumber: undefined
});
useQuerySync(tab);
useQuerySync(filterParams);

// const tabChange = () => {
//   console.log("tab changed", tab.active);
// }
</script>

<style>
.el-tabs {
  @apply !flex-1 !h-auto overflow-y-auto
}

.el-tabs__content {
  @apply overflow-y-auto
}

.el-tab-pane {
  @apply h-full flex
}
</style>