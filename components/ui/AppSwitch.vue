<template>
  <div
    class="flex p-0.5 rounded-lg border border-surface-30 cursor-pointer"
    @click="model = !model"
  >
    <div
      class="rounded-lg p-2 transition-all border border-transparent"
      :class="!model && 'bg-primary-800 !border-primary-700'"
    >
      <IconApps />
    </div>
    <div
      class="rounded-lg p-2 transition-all border border-transparent"
      :class="model && 'bg-primary-800 !border-primary-700'"
    >
      <IconNoteList />
    </div>
  </div>
</template>

<script setup lang="ts">
const model = defineModel<boolean>({
  default: false
});

defineEmits(["get"]);
</script>
