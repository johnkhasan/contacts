<template>
  <div class="p-2 flex flex-col gap-2 bg-surface-50 border border-surface-30 shadow-card rounded-lg font-geist flex-1">
    <div class="flex flex-col gap-1">
      <span class="text-primary-color font-semibold">{{ $t('scales.statistics.best_region') }}</span>
      <span class="text-primary-100 dark:text-gray-500 text-[13px]">
        {{ $t('scales.statistics.confirmed_wagons_by_region') }}
      </span>
    </div>

    <div
      class="flex flex-col px-2 py-5 rounded-lg bg-surface-40 border border-surface-30 overflow-y-auto max-h-[280px]">
      <div class="flex flex-col" v-for="(item, index) in data" :key="index">
        <div class="flex gap-2 items-center">
          <div class="border-[2px] rounded-full p-2"
            :class="index % 2 === 0 ? 'border-yellow-600 bg-yellow-500' : 'bg-gray-200 border-gray-100'">
            <icon-stars class="text-white" />
          </div>

          <div class="flex flex-col flex-1">
            <span class="text-primary-color font-semibold">
              {{ useGetTranslation(item.station?.name) }}
            </span>
            <span class="text-primary-100 dark:text-gray-500 text-[13px]">
              {{ $t('wagons.title') }}: {{ item.trainCount }}
            </span>
          </div>

          <div class="border-[2px] rounded-md px-2 py-0.5"
            :class="index % 2 === 0 ? 'border-yellow-600 bg-yellow-500' : 'bg-gray-200 border-gray-100'">
            <span class="text-white font-semibold">{{ item.vagonCount }}</span>
          </div>
        </div>
        <div class="w-full h-[1px] bg-surface-30 my-1" v-if="index + 1 !== data?.length"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { components } from '@/api/apiMethods.types';

type VisionStatisticsByStationItem = components['schemas']['VisionStatisticsByStationItem'];

const props = defineProps({
  data: {
    type: Object as () => VisionStatisticsByStationItem[],
    required: false,
  },
});
</script>
