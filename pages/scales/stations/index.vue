<template>
  <StationView />
</template>

<script setup lang="ts">
import { useHeadTitleStore } from '@/store/titleStore';

const { t } = useI18n();
const { setHeadTitle } = useHeadTitleStore();

setHeadTitle('station.plural')
useHead(() => ({
  title: t('pageTitles.scales.stationsPage'),
}))

</script>