<template>
  <Table :data="data?.items" :columns="columns" :actions="{
    view: true, video: true, download: true, width: 200
  }" :page="data?.page" :size="data?.size"
    :permissions="{ view: ['get_wagon_session_by_id'], video: ['get_wagon_session_by_id'], download: ['get_wagon_session_by_id'] }"
    :indexWidth="60" @view="viewMethod" @video="viewVideo" @download="exportExcell">
    <template #station="{ row }">
      <div>
        {{ useGetTranslation(row.station?.name) }} - {{ row.station?.code }}
      </div>
    </template>

    <template #wagonEnteredAt="{ row }">
      <div>
        <Tag :title="useFormatDateTime(row.wagonEnteredAt)" color="surface" />
      </div>
    </template>

    <template #direction="{ row }">
      <div v-if="row.direction">
        <Tag :title="$t(`camera.${row.direction}`)" :color="row.direction === 'enter' ? 'success' : 'danger'" />
      </div>
      <div v-else>
        <Tag :title="`-`" color="surface" />
      </div>
    </template>

    <template #wagonAllCount="{ row }">
      <div class="flex justify-start">
        <div class="flex items-center gap-1 bg-surface-30 px-2 py-1 rounded-md">
          <span>{{ row.wagonAllCount }}</span>
          <span>/</span>
          <span class="text-success-100">{{ row.wagonAllCount - row.undetectedWagonCount }}</span>
          <span>/</span>
          <span class="text-danger-50">{{ row.undetectedWagonCount }}</span>
        </div>
      </div>
    </template>
  </Table>

  <Pagination :total="data?.total" v-model:page="model.page" v-model:size="model.size" @get="$emit('get')" />
</template>

<script setup lang="ts">
import type { components } from "@/api/apiMethods.types";
import type { basePagination, CameraWagonFilterParams, TableColumn } from "@/types";
type ListWagonSessionResponse = components["schemas"]["ListWagonSessionResponse"];
type WagonSessionDto = components["schemas"]["WagonSessionDto"];

const { t } = useI18n();

const model = defineModel<Partial<CameraWagonFilterParams & basePagination>>({
  default: {}
});

const emit = defineEmits<{
  (e: "get"): void;
  (e: "view", row: WagonSessionDto): void;
}>();

const props = defineProps({
  data: {
    type: Object as () => ListWagonSessionResponse,
    required: true
  },
})

const viewMethod = (row: WagonSessionDto) => {
  emit("view", row);
};

const viewVideo = (row: WagonSessionDto) => {
  if (row.videoUrl) {
    const videoUrl = row.videoUrl;
    window.open(videoUrl, "_blank");
  }
};

const exportExcell = async (row: WagonSessionDto) => {
  const { data, error } = await useApiService({
    responseType: "blob"
  }).WagonSession.WagonSessionController_exportExcel(row.id);

  if (error.value) {
    console.error(error.value);
    return;
  }

  const blob = data.value;

  // @ts-ignore
  const fileURL = URL.createObjectURL(blob);
  window.open(fileURL, "_blank");
}


const columns = computed<TableColumn<WagonSessionDto>[]>(() => [
  {
    prop: "station",
    label: t("camera.station")
  },
  {
    prop: "wagonEnteredAt",
    label: t("common.time")
  },
  {
    prop: "wagonAllCount",
    label: t("camera.totalWagonsNumber")
  },
  {
    prop: "direction",
    label: t("camera.wagonsDirection"),
    width: 200,
  }
]);
</script>
