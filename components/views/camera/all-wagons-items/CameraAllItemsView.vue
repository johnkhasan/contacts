<template>
  <Modal v-if="editData" v-model="openCameraItemModal" :width="600" :editData="editData"
    :title="$t('wagon.dowloadAsExcel')">
    <CameraAllItemsEdit :edit-data="editData" @cancel="onCancel" :camera_id="camera_id" @get="execute" />
  </Modal>

  <div class="flex-1 flex flex-col gap-5 overflow-auto" v-loading="status === 'pending'">
    <CameraAllItemsFilter v-model="filterParams" @get="execute" @export="exportExcell" @downloadRecord="downloadRecord"
      :videoUrl="videoUrl" />

    <CameraAllItemsList v-model="filterParams" :data="data!" @get="execute" @edit="editMethod" />
  </div>
</template>

<script setup lang="ts">
import type { basePagination } from "@/types/common";
import type { CameraItemsFilterParams } from "@/types";
import type { components } from "@/api/apiMethods.types";

type WagonSessionItemDto = components["schemas"]["WagonSessionItemDto"];

const props = defineProps<{
  camera_id: string;
  videoUrl?: string;
}>();

const openCameraItemModal = ref<boolean>(false);
const editData = ref<WagonSessionItemDto | null>(null);

const filterParams = reactive<Partial<CameraItemsFilterParams & basePagination>>({
  wagonNumber: "",
  withDefects: false,
  page: 1,
  size: 10
});

useQuerySync(filterParams);

const { data, execute, status } = await useApiService({ params: filterParams }).WagonSession.WagonSessionController_getWagonItems(props.camera_id);

const editMethod = (row: WagonSessionItemDto) => {
  editData.value = row;
  openCameraItemModal.value = true;
};

function onCancel() {
  openCameraItemModal.value = false;
  editData.value = null;
}

const exportExcell = async () => {
  const { data, error } = await useApiService({
    responseType: "blob"
  }).WagonSession.WagonSessionController_exportExcel(props.camera_id);

  if (error.value) {
    console.error(error.value);
    return;
  }

  const blob = data.value;

  // @ts-ignore
  const fileURL = URL.createObjectURL(blob);
  window.open(fileURL, "_blank");
}


const downloadRecord = () => {
  if (props.videoUrl) {
    const videoUrl = props.videoUrl;
    window.open(videoUrl, "_blank");
  }
};

</script>
