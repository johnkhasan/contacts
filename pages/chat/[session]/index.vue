<template>
  <ChatSessionsView :sessionId="sessionId" />
</template>
<script setup lang="ts">
const route = useRoute();
const sessionId = computed(() => route.params.session as string);

</script>