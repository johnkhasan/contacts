<template>
  <CameraAllItemsView v-if="camera_id" :camera_id="camera_id" :videoUrl="data?.videoUrl" />
</template>

<script setup lang="ts">
import { useHeadTitleStore } from '@/store/titleStore';

const route = useRoute();
const camera_id = route.params.camera_id as string;

const { setHeadTitle } = useHeadTitleStore();
const { t } = useI18n();

const { data } = await useApiService().WagonSession.WagonSessionController_findOne(camera_id);
setHeadTitle(data.value?.camera_name || 'Camera Details');
useHead(() => ({
  title: t('pageTitles.camera.cameraDetails', { camera: data.value?.camera_name || 'Camera Details' }),
}))

</script>