<template>
  <template v-if="id">
    <RoleDetailView :id="id" />
  </template>
</template>

<script setup lang="ts">
const { t } = useI18n();
const route = useRoute()

const { id }: any = route.params

useHead(() => ({
  title: t('pageTitles.app.permissionsPage'),
}))
</script>