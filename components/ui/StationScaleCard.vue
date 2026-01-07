<template>
  <div class="bg-surface-50 p-2 rounded-lg flex flex-col gap-2 border border-surface-30"
    @click="$router.push(`/scales/stations/${code}?id=${id}`)">
    <div class="flex flex-col gap-1">
      <span class="text-black font-semibold">{{ station }}</span>
      <span class="text-gray-500 text-[13px] capitalize">{{ $t('camera.station') }}: {{ code }}</span>
    </div>

    <div class="bg-surface-40 rounded-lg border border-surface-30 p-2 flex justify-between items-center">
      <div class="flex flex-col gap-1">
        <span class="text-primary-color">{{ $t('camera.wagonAllCount') }}</span>
        <div class="flex gap-2 items-center">
          <span class="text-black text-[31px] font-semibold">{{
            wagonValue
          }}</span>
          <div class="border-[2px] px-2 py-0.5 rounded-[26px] bg-danger-100 border-danger-50">
            <span class="text-white text-sm font-medium">{{ increment > 0 ? "+" : "" }}{{ increment }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  id: {
    type: [String, Number],
    required: true
  },
  station: String,
  code: String,
  wagonValue: Number,
  increment: {
    type: Number,
    default: 0,
    required: true
  }
});
</script>
