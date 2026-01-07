<template>
  <Table :data="data?.items" :columns="columns" :actions="{
    download: true
  }" :page="data?.page" :size="data?.size" :permissions="{ download: ['get_wagon_scale_pdf'] }"
    @download="downloadMethod">
    <template #img="{ row }">
      <el-image v-if="row?.imageUrls" :src="row.imageUrls[0]" :preview-src-list="row.imageUrls" fit="fill"
        class="w-[120px] h-[64px] cursor-pointer rounded-md" :preview-teleported="true" closeOnPressEscape
        hideOnClickModal />
    </template>

    <template #numberImg="{ row }">
      <el-image v-if="row?.numberUrl" :src="row.numberUrl" :preview-src-list="[row.numberUrl]" fit="fill"
        class="w-[120px] h-[34px] cursor-pointer rounded-md" :preview-teleported="true" closeOnPressEscape
        hideOnClickModal />
    </template>

    <template #time="{ row }">
      <div class="font-semibold text-primary-color">
        {{ useFormatDateTime(row.createdDate) }}
      </div>
    </template>

    <template #wagonNumber="{ row }">
      <Tag :color="row.isWagonNumber ? 'surface' : 'danger'" :title="row.wagonNumber" />
    </template>

    <template #wagonNormTon="{ row }">
      <Tag :title="$t('n.ton', Number(row.wagonNormTon) / 1000)" color="surface" />
    </template>

    <template #station="{ row }">
      <Tag :title="useGetTranslation(row.station?.name)" color="surface" />
    </template>

    <template #scaleNumber="{ row }">
      <Tag :title="$t('n.ton', Number(row.scaleNumber) / 1000)" color="info" />
    </template>

    <template #wagonExtraTon="{ row }">
      <Tag
        :title="(Number(row.wagonNormTon) - Number(row.scaleNumber) > 0 ? '-' : '+') + $t('n.ton', Math.abs(Number(row.wagonNormTon) - Number(row.scaleNumber)) / 1000)"
        :color="Number(row.wagonNormTon) - Number(row.scaleNumber) < 0 ? 'danger' : 'success'" />
    </template>
  </Table>

  <Pagination :total="data?.total" v-model:page="model.page" v-model:size="model.size" @get="$emit('get')" />
</template>

<script setup lang="ts">
import type { components } from "@/api/apiMethods.types";
import type { basePagination, TableColumn } from "@/types";
import type { WagonFilterParams } from "@/types/wagon";
type WagonScalesDto = components["schemas"]["ScaleValueListResponseDto"];
type WagonScaleValueDto = components['schemas']['WagonScaleValueDto'];

const { t, locale } = useI18n();
const model = defineModel<Partial<WagonFilterParams & basePagination>>({
  default: {}
});

defineEmits<{
  (e: "get"): void;
}>();

const props = defineProps({
  data: {
    type: Object as () => WagonScalesDto,
    required: true
  },
})

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
  {
    prop: "img",
    label: t("wagon.image"),
    custom: true
  },
  {
    prop: "numberImg",
    label: t("wagon.numberImage"),
    custom: true
  },
  {
    prop: "station",
    label: t("camera.station")
  },
  {
    prop: "wagonNumber",
    label: t("wagon.number"),
    custom: true
  },
  {
    prop: "time",
    label: t("wagon.time"),
    custom: true
  },
  {
    prop: "wagonNormTon",
    label: t("wagon.capacity")
  },
  {
    prop: "scaleNumber",
    label: t("wagon.measured")
  },
  {
    prop: "wagonExtraTon",
    label: t("wagon.cargoWeight")
  }
]);
</script>
