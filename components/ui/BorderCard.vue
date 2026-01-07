<template>
  <div class="border rounded-lg shadow-md bg-surface-50 border-surface-20 flex flex-col gap-2 cursor-pointer">
    <div class="flex p-4 justify-between bg-surface-30 rounded-t-lg">
      <span class="font-semibold">{{ $t('scales.BorderNumber') }}: {{ item.border.code }}</span>
    </div>

    <div class="flex p-4 flex-col gap-1">
      <div class="flex justify-between items-center">
        <span class="text-sm font-semibold">{{ $t('scales.export') }}</span>
        <span class="text-sm font-bold text-green-500">{{ item.exportCount }}</span>
      </div>

      <div class="flex justify-between items-center">
        <span class="text-sm font-semibold">{{ $t('scales.import') }}</span>
        <span class="text-sm font-bold text-red-500">{{ item.importCount }}</span>
      </div>

      <div class="flex justify-between items-center border-t pt-4">
        <span class="text-sm font-semibold">{{ $t('scales.total') }}</span>
        <span class="text-sm font-bold">{{ item.totalCount }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  }
});
</script>
