<template>
  <div class="flex-1 flex flex-col gap-5 overflow-auto"
    v-loading="status === 'pending' || pingStatus === 'pending' || loading">
    <template v-if="videoUrl">
      <Modal v-model="videoModal" :title="$t('camera.video')" width="75%">
        <AppVideoPlayer :videoUrl="videoUrl" />
      </Modal>
    </template>

    <template v-if="lastUpdateModal">
      <Modal v-model="lastUpdateModal" :title="$t('camera.cameraState')" width="50%">
        <Table :data="lastPingData?.cameras" :columns="columns" :indexWidth="60">
          <template #isOnline="{ row }">
            <span v-if="row.isOnline" class="text-success-100 font-medium">{{ $t('camera.online') }}</span>
            <span v-else class="text-danger-50 font-medium">{{ $t('camera.offline') }}</span>
          </template>
        </Table>
      </Modal>
    </template>

    <CameraWagonsDetailFilter v-model="filterParams" @get="getData" :lastPingData="lastPingData"
      @viewCameras="viewCamerasMethod" />

    <CameraWagonsDetailList v-if="tableData" v-model="filterParams" :data="tableData" @get="getData" @view="viewMethod"
      @video="openVideo" />
  </div>
</template>

<script setup lang="ts">
import type { basePagination, TableColumn } from "@/types/common";
import type { CameraWagonFilterParams } from "@/types";

const props = defineProps<{
  id: string;
}>();

const loading = ref<boolean>(false);
const router = useRouter();

const videoModal = ref<boolean>(false);
const lastUpdateModal = ref<boolean>(false);
const videoUrl = ref<string | null>(null);

const filterParams = reactive<Partial<CameraWagonFilterParams & basePagination>>({
  stationId: props.id,
  page: 1,
  size: 10,
  fromDate: undefined,
  toDate: undefined,
});

const { t } = useI18n();

useQuerySync(filterParams);

const { data: lastPingData, execute: getLastPing, status: pingStatus } = await useApiService().WagonSession.getLastPingRecords(props.id);
const { data: tableData, execute: getData, status } = await useApiService({ params: filterParams }).WagonSession.WagonSessionController_findAll()

const ping = new EventSource('https://ai-project.das-uty.uz/api/sse/wagon-session-pings');

ping.onmessage = function (event) {
  const eventData = JSON.parse(event.data);
  if (eventData && eventData.data?.type !== 'ping' && eventData.data?.station?.id == props.id) {
    getLastPing();
  }
};

const viewMethod = (row: any) => {
  router.push(`/camera/wagons/${props.id}/${row.id}`);
};

const viewCamerasMethod = () => {
  lastUpdateModal.value = true;
}

const openVideo = (row: any) => {
  videoUrl.value = row.videoUrl;
  videoModal.value = true;
};

onBeforeUnmount(() => {
  ping.close();
});

const columns = computed<TableColumn<{
  ip: string;
  name: string;
  isOnline: boolean;
}>[]>(() => [
  {
    prop: "ip",
    label: t("camera.ipAddress")
  },
  {
    prop: "name",
    label: t("camera.camera_name")
  },
  {
    prop: "isOnline",
    label: t("camera.networkState")
  }
]);
</script>
