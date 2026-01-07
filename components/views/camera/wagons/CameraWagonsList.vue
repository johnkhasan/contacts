<template>
  <div class="flex-1">
    <div class="overflow-y-auto w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-start justify-start">
      <CameraWagonCard v-for="(item, index) in data?.items" :key="index" :name="useGetTranslation(item.station.name)"
        :camera_number="item.count" class="w-full" @click="$router.push(`/camera/wagons/${item.station.id}`)" />
    </div>
  </div>

  <Pagination :total="data.total" v-model:page="model.page" :page-sizes="[12, 24, 48, 96]" v-model:size="model.size"
    @get="$emit('get')" />
</template>

<script setup lang="ts">
import type { components } from '@/api/apiMethods.types';
import type { basePagination } from '@/types';


type VisionCountByStationsResponse = components["schemas"]["VisionCountByStationsResponse"];

const model = defineModel<Partial<basePagination>>({
  default: {}
});

defineEmits<{
  (e: "get"): void;
}>();

const props = defineProps({
  data: {
    type: Object as () => VisionCountByStationsResponse,
    required: true
  },
})
</script>
