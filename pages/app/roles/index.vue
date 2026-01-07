<template>
  <RolesView />
</template>

<script setup lang="ts">
import { useHeadTitleStore } from '@/store/titleStore';

const { setHeadTitle } = useHeadTitleStore();
const { t } = useI18n();

setHeadTitle('app.roles')
useHead(() => ({
  title: t('pageTitles.app.rolesPage'),
}))

</script>