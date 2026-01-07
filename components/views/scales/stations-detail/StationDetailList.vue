<template>
  <Table :data="data" :columns="columns" :actions="{ download: true, width: 120 }"
    :permissions="{ download: ['get_wagon_scale_pdf'] }" @download="downloadMethod">
    <template #wagonAttachId="{ row }">
      <el-image v-if="row?.imageUrls" :src="row.imageUrls[0]" :preview-src-list="row.imageUrls" fit="fill"
        class="w-[120px] h-[60px] cursor-pointer rounded-md" :preview-teleported="true" closeOnPressEscape
        hideOnClickModal />
    </template>

    <template #wagonNumberAttachId="{ row }">
      <el-image v-if="row?.numberUrl" :src="row.numberUrl" :preview-src-list="[row.numberUrl]" fit="fill"
        class="w-[120px] h-[34px] cursor-pointer rounded-md" :preview-teleported="true" closeOnPressEscape
        hideOnClickModal />
    </template>

    <template #wagonNumber="{ row }">
      <Tag :color="row.isWagonNumber ? 'surface' : 'danger'" :title="row.wagonNumber" />
    </template>

    <template #createdDate="{ row }">
      <Tag color="surface" :title="useFormatDateTime(row.createdDate)" />
    </template>

    <template #wagonNormTon="{ row }">
      <Tag color="surface" :title="$t('n.ton', Number(row.wagonNormTon) / 1000)" />
    </template>

    <template #scaleNumber="{ row }">
      <Tag color="info" :title="$t('n.ton', Number(row.scaleNumber) / 1000)" />
    </template>

    <template #wagonExtraTon="{ row }">
      <Tag :color="Number(row.wagonExtraTon) > 0 ? 'danger' : 'success'"
        :title="(Number(row.wagonNormTon) - Number(row.scaleNumber) > 0 ? '-' : '+') + $t('n.ton', Math.abs(Number(row.wagonNormTon) - Number(row.scaleNumber)) / 1000)" />
    </template>

  </Table>
</template>

<script setup lang="ts">
import type { components } from '@/api/apiMethods.types';
import type { TableColumn } from '@/types';

type WagonScaleValueDto = components['schemas']['WagonScaleValueDto'];

const { t, locale } = useI18n();

defineProps<{
  data: WagonScaleValueDto[] | undefined;
}>();

const downloadMethod = async (row: WagonScaleValueDto) => {
  const { data, error } = await useApiService({
    responseType: "blob",
    key: Date.now().toString(),
    headers: {
      "accept-language": locale.value
    },
  }).Wagon_Scale_Values.WagonScaleValueController_generatePdf(row.id);

  if (error.value) {
    console.error(error.value);
    return;
  }

  const blob = data.value;

  // @ts-ignore
  const fileURL = URL.createObjectURL(blob);
  window.open(fileURL, "_blank");
}

const columns = computed<TableColumn<WagonScaleValueDto>[]>(() => [
  { prop: "wagonAttachId", label: t("common.photo"), width: 180, custom: true },
  { prop: "wagonNumberAttachId", label: t("common.numberPhoto"), width: 180, custom: true },
  { prop: "wagonNumber", label: t("common.wagonNumber") },
  { prop: "createdDate", label: t("common.weighedAt"), width: 300 },
  { prop: "wagonNormTon", label: t("common.loadNorm"), width: 200 },
  { prop: "scaleNumber", label: t("common.measuredWeight"), width: 200 },
  { prop: "wagonExtraTon", label: t("common.loadInWagon"), width: 200 },
])
</script>
