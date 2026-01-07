<template>
  <StatisticsView />
</template>

<script setup lang="ts">
import { useHeadTitleStore } from '@/store/titleStore';

const { t } = useI18n();
const { setHeadTitle } = useHeadTitleStore();

setHeadTitle('statistic.title')
useHead(() => ({
  title: t('pageTitles.scales.statisticsPage'),
}))

</script>
