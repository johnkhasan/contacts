<template>
  <div class="grid grid-cols-4 gap-4">
    <station-scale-card v-for="(station, index) in data" :key="station.station.id"
      :id="station.station.id ? station.station.id : index"
      :station="station.station.name ? useGetTranslation(station.station.name) : '-'" :code="station.station.code"
      :wagonValue="Number(station.allCount)" :increment="Number(station.extraCount)" class="cursor-pointer" />
  </div>
</template>

<script setup lang="ts">
import type { components } from '@/api/apiMethods.types';

type StationDto = components['schemas']['CountByStationItem'];

defineProps<{
  data: StationDto[] | undefined;
}>();
</script>
