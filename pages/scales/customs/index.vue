<template>
  <ScaleCustomsView />
</template>

<script setup lang="ts">
import { useHeadTitleStore } from '@/store/titleStore';

const { setHeadTitle } = useHeadTitleStore();
const { t } = useI18n();

setHeadTitle('scales.customs')
useHead(() => ({
  title: t('pageTitles.scales.customsPage'),
}))

</script>