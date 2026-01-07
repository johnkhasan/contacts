<template>
  <ByBorderDetailView v-if="code" :code="code" />
</template>

<script setup lang="ts">
import { useHeadTitleStore } from '@/store/titleStore';

const route = useRoute();
const code = computed(() => route.params.code as string);

const { setHeadTitle } = useHeadTitleStore();
const { t } = useI18n();

setHeadTitle('scales.customsByBorder')
useHead(() => ({
  title: t('pageTitles.scales.customsByBorderPage'),
}))

</script>