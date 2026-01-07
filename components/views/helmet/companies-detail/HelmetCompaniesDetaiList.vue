<template>
  <Table :data="data.items" :columns="columns">
    <template #cameraName="{ row }">
      <Tag :title="row.cameraName" color="surface" />
    </template>

    <template #company="{ row }">
      {{ useGetTranslation(row.company?.name) }}
    </template>

    <template #time="{ row }">
      <Tag :title="useFormatDateTime(row.time)" color="surface" />
    </template>

    <template #definedImage="{ row }">
      <el-image :src="`https://ai-project.das-uty.uz/${row.definedImage}`" :preview-src-list="[
        `https://ai-project.das-uty.uz/${row.definedImage}`
      ]" fit="contain" class="cursor-pointer rounded-md w-20 h-20 bg-surface-20" :preview-teleported="true"
        closeOnPressEscape hideOnClickModal />
    </template>

    <template #fullPicture="{ row }">
      <el-image :src="`https://ai-project.das-uty.uz/${row.fullPicture}`" :preview-src-list="[
        `https://ai-project.das-uty.uz/${row.fullPicture}`
      ]" fit="contain" class="cursor-pointer rounded-md w-40 h-20 bg-surface-20" :preview-teleported="true"
        closeOnPressEscape hideOnClickModal />
    </template>
  </Table>

  <Pagination :total="data?.total" v-model:page="model.page" v-model:size="model.size" @get="$emit('get')" />
</template>

<script setup lang="ts">
import type { components } from '@/api/apiMethods.types';
import type { basePagination, TableColumn } from '@/types';

type HelmetCamerasResponse = components['schemas']['ListCamerasResponse'];
type CameraDto = components['schemas']['CameraDto'];

const { t } = useI18n();

const model = defineModel<Partial<HelmetCamerasResponse & basePagination>>({
  default: {}
});

defineEmits<{
  (e: 'get'): void;
}>();

defineProps<{
  data: HelmetCamerasResponse;
}>();

const columns = computed<TableColumn<CameraDto>[]>(() => [
  { prop: "cameraName", label: t("helmet.cameraName") },
  { prop: "companyName", label: t("helmet.companyName") },
  { prop: "company", label: t("helmet.company") },
  { prop: "time", label: t("helmet.time") },
  { prop: "definedImage", label: t("helmet.definedImage"), width: 280 },
  { prop: "fullPicture", label: t("helmet.fullPicture"), width: 280 }
])
</script>
