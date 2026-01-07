<template>
  <CameraAllWagonsDetailView />
</template>

<script setup lang="ts">
import { useHeadTitleStore } from '@/store/titleStore';

const { setHeadTitle } = useHeadTitleStore();
const { t } = useI18n();

setHeadTitle('allWagons.title');
useHead(() => ({
  title: t('pageTitles.camera.allWagonsPage'),
}))

</script>