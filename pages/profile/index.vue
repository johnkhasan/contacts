<template>
  <ProfileView />
</template>

<script setup lang="ts">
import { useHeadTitleStore } from '@/store/titleStore';

const { setHeadTitle } = useHeadTitleStore();
setHeadTitle('users.profile');
</script>