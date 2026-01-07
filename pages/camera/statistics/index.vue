<template>
  <CameraStatisticsView />
</template>

<script setup lang="ts">
import { useHeadTitleStore } from '@/store/titleStore';

const { setHeadTitle } = useHeadTitleStore();
const { t } = useI18n();

setHeadTitle('camera.statistics')
useHead(() => ({
  title: t('pageTitles.camera.statisticsPage'),
}))

</script>