<template>
  <WagonView />
</template>

<script setup lang="ts">
import { useHeadTitleStore } from '@/store/titleStore';

const { t } = useI18n();
const { setHeadTitle } = useHeadTitleStore();

setHeadTitle('wagons.title')
useHead(() => ({
  title: t('pageTitles.scales.wagonsPage'),
}))

</script>