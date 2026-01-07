<template>
  <ScaleCustomsByBorderView />
</template>

<script setup lang="ts">
import { useHeadTitleStore } from '@/store/titleStore';

const { setHeadTitle } = useHeadTitleStore();
const { t } = useI18n();

setHeadTitle('scales.customsByBorder')
useHead(() => ({
  title: t('pageTitles.scales.customsByBorderPage'),
}))

</script>