<template>
  <div class="grid grid-cols-3 gap-4">
    <card v-for="(card, index) in cardInformations" :key="index" :hasIcon="false">
      <template #title>
        {{ card.title }}
      </template>
      <template #total>
        <div class="flex gap-3 items-center py-2 px-2">
          <div class="text-base border px-2 py-1 rounded-md border-surface-20 bg-surface-30 flex items-center gap-2">
            <icon-wagon />
            <span>{{ card.total }}</span>
          </div>
          <div
            class="text-base border px-2 py-1 rounded-md border-success-50 bg-success-100 text-white flex items-center gap-2">
            <icon-wagon />
            <span>{{ card.wagons }}</span>
          </div>
          <div
            class="text-base border px-2 py-1 rounded-md border-danger-100 bg-danger-50 text-white flex items-center gap-2">
            <icon-wagon />
            <span>{{ card.undetected }}</span>
          </div>
        </div>
      </template>
      <template #icon>
        <component :is="card.icon" class="text-info-100" />
      </template>
    </card>
  </div>
</template>

<script setup lang="ts">
import type { components } from '@/api/apiMethods.types';

type VisionStatisticsResponse = components["schemas"]["VisionStatisticsResponse"];

const { t } = useI18n();
const props = defineProps({
  data: {
    type: Object as () => VisionStatisticsResponse,
    required: true
  }
})

const cardInformations = computed(() => [
  {
    title: t("camera.cards.totalTrains"),
    total: props.data.trainCount,
    icon: "icon-docs",
    wagons: props.data.vagonCount,
    undetected: props.data.undetectedVagonCount,
  },
  {
    title: t("camera.cards.totalEnteredTrains"),
    total: props.data.enteredTrainCount,
    icon: "icon-docs",
    wagons: props.data.enteredVagonCount,
    undetected: props.data.enteredUndetectedVagonCount,
  },
  {
    title: t("camera.cards.totalExitedTrains"),
    total: props.data.exitedTrainCount,
    icon: "icon-docs",
    wagons: props.data.exitedVagonCount,
    undetected: props.data.exitedUndetectedVagonCount,
  },
])
</script>
