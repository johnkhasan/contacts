<template>
  <div class="flex flex-col gap-2 rounded-lg p-2 bg-surface-50 border border-surface-30 card-shadow justify-between">
    <div class="flex flex-col gap-1">
      <span class="text-primary-color font-semibold">{{
        useGetTranslation(station.organization.name)
        }}</span>
      <div class="flex items-center gap-1">
        <icon-camera-activity class="w-4 h-4 text-primary-100 dark:text-[#E6E8EE]" />
        <div>
          <span class="text-primary-300 text-[13px]">{{ $t('helmet.cameraNumber') }}: {{ station.cameraCount }}</span>
        </div>
      </div>
    </div>

    <div class="border border-surface-30 bg-surface-40 rounded-lg p-2 flex flex-col gap-2">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-1">
          <icon-user-activity class="text-primary-100 dark:text-[#E6E8EE] w-4 h-4" />
          <span class="text-primary-300 text-[13px]">{{ $t('helmet.ruleStatus') }}</span>
        </div>

        <button :class="[
          'py-1 px-2 rounded text-white',
          station.recordCount < 0 && 'bg-success-100 border-success-50',
          0 < station.recordCount && station.recordCount < 10 && 'bg-warning-100 border-warning-50',
          station.recordCount > 10 && 'bg-danger-100 border-danger-50'
        ]">
          {{ station.recordCount < 0 ? $t(`common.status.good`) : (0 < station.recordCount && station.recordCount < 10 ?
            $t(`common.status.average`) : (station.recordCount > 10 ? $t(`common.status.bad`) : '')) }}
        </button>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex flex-col gap-1">
          <span class="text-[31px] font-semibold text-primary-color">{{
            station.recordCount
            }}</span>
          <span class="text-primary-300 text-[13px]">{{ $t('helmet.violation') }}</span>
        </div>

        <div class="p-2 rounded-lg border border-surface-30">
          <component :is="icon" class="text-primary-color w-5 h-5" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { components } from '@/api/apiMethods.types';

type CardItem = components["schemas"]["CountCameraByCompaniesItem"];


defineProps({
  station: {
    type: Object as () => CardItem,
    required: true
  },
  icon: {
    type: Object,
    required: true
  }
});
</script>
