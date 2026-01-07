<template>
  <Table :data="data.items" :columns="columns" :page="data.page" :size="data.size" :indexWidth="100">
    <template #cargoRise="{ row }">
      <Tag v-if="row.cargoRise" :title="$t('n.ton', Number(row.cargoRise) / 1000)" color="surface" />
      <Tag v-else :title="$t('table.empty')" color="danger" />
    </template>

    <template #konteyner="{ row }">
      <Tag v-if="row.konteyner" :title="$t('n.ton', Number(row.konteyner) / 1000)" color="surface" />
      <Tag v-else :title="$t('table.empty')" color="danger" />
    </template>

    <template #hasWagonSession="{ row }">
      <div class="flex justify-start">
        <div class="font-semibold px-2 py-1 rounded-md flex justify-center items-center w-8 h-8"
          :class="row.hasWagonSession ? 'bg-success-100' : 'bg-danger-50'">
          <el-icon v-if="row.hasWagonSession">
            <Check class="text-white" />
          </el-icon>
          <el-icon v-else>
            <Close class="text-white" />
          </el-icon>
        </div>
      </div>
    </template>
  </Table>

  <Pagination :total="data.total" v-model:page="model.page" v-model:size="model.size" @get="$emit('get')" />
</template>

<script setup lang="ts">
import type { components } from "@/api/apiMethods.types";
import type { basePagination, TableColumn } from "@/types";
import type { WagonFilterParams } from "@/types/wagon";
import { Check, Close } from "@element-plus/icons-vue";
type WagonListResponse = components["schemas"]["WagonListResponse"];
type WagonDto = components["schemas"]["WagonDto"];

const { t } = useI18n();

const model = defineModel<Partial<WagonFilterParams & basePagination>>({
  default: {}
});

defineEmits<{
  (e: "get"): void;
}>();

const props = defineProps({
  data: {
    type: Object as () => WagonListResponse,
    required: true
  },
})

const columns = computed<TableColumn<WagonDto>[]>(() => [
  {
    prop: "wagonNumber",
    label: t("allWagons.form.number")
  },
  {
    prop: "cargoRise",
    label: t("allWagons.loadCapacity")
  },
  {
    prop: "konteyner",
    label: t("allWagons.wagonWeight")
  },
  {
    prop: "hasWagonSession",
    label: t("allWagons.checkStatus")
  }
]);
// 196161
</script>
