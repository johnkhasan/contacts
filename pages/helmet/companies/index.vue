<template>
  <HelmetCompaniesView />
</template>

<script setup lang="ts">
import { useHeadTitleStore } from '@/store/titleStore';

const { setHeadTitle } = useHeadTitleStore();
const { t } = useI18n();

setHeadTitle('camera.companies')
useHead(() => ({
  title: t('pageTitles.helmet.companiesPage'),
}))

</script>