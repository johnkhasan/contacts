<template>
  <Table :data="data?.items" :columns="columns" :page="data?.page" :size="data?.size">

    <template #createdAt="{ row }">
      <div class="font-semibold text-primary-color">
        {{ useFormatDateTime(row.createdAt) }}
      </div>
    </template>

    <template #goodGrossWeightInTons="{ row }">
      <Tag
        :title="Number(row.goodGrossWeightInTons) < Number(row.wagonNormalWeight) ? `+${row.goodGrossWeightInTons}` : row.goodGrossWeightInTons"
        :color="Number(row.goodGrossWeightInTons) < Number(row.wagonNormalWeight) ? 'success' : 'danger'" />
    </template>

    <template #extraWeight="{ row }">
      <Tag :title="Number((Number(row.wagonNormalWeight) - Number(row.goodGrossWeightInTons)).toFixed(2)) > 0
        ? '+' + (Number(row.wagonNormalWeight) - Number(row.goodGrossWeightInTons)).toFixed(2)
        : (Number(row.wagonNormalWeight) - Number(row.goodGrossWeightInTons)).toFixed(2)
        " :color="Number(row.wagonNormalWeight) - Number(row.goodGrossWeightInTons) ? 'success' : 'danger'" />
    </template>

    <template #type="{ row }">
      {{ $t(row.type === 'import' ? 'scales.import' : 'scales.export') }}
    </template>

    <template #extraWeightLabel="{ row }">
      <Tag v-if="row.extraWeightLabel" :title="row.extraWeightLabel"
        :color="Number(row.extraWeightLabel) < 0 ? 'success' : 'danger'" />

      <Tag v-else :title="$t('table.empty')" color="danger" />
    </template>
  </Table>

  <Pagination :total="data?.total" v-model:page="model.page" v-model:size="model.size" @get="$emit('get')" />
</template>

<script setup lang="ts">
import type { components } from "@/api/apiMethods.types";
import type { basePagination, TableColumn } from "@/types";
import type { WagonFilterParams } from "@/types/wagon";
type ListCustomScaleResponse = components["schemas"]["ListCustomScaleResponse"];
type CustomWagonScaleDto = components['schemas']['CustomWagonScaleDto'];

const { t } = useI18n();
const model = defineModel<Partial<WagonFilterParams & basePagination>>({
  default: {}
});

defineEmits<{
  (e: "get"): void;
}>();

const props = defineProps({
  data: {
    type: Object as () => ListCustomScaleResponse,
    required: true
  },
})


const columns = computed<TableColumn<CustomWagonScaleDto>[]>(() => [
  {
    prop: "wagonNumber",
    label: t("customs.wagonNumber"),
  },
  {
    prop: "createdAt",
    label: t("customs.weighingTime"),
  },
  {
    prop: "type",
    label: t("common.type"),
  },
  {
    prop: "scaleWeightInTons",
    label: t("customs.scaleWeightInTons"),
  },
  {
    prop: "goodGrossWeightInTons",
    label: t("customs.goodGrossWeightInTons"),
  },
  {
    prop: "extraWeightLabel",
    label: t("customs.extraWeight"),
  },
  {
    prop: "wagonNormalWeight",
    label: t("customs.wagonNormalWeight"),
  },
]);
</script>
