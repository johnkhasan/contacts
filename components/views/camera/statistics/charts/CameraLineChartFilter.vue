<template>
  <div class="flex items-center justify-end gap-4">
    <!-- <Select v-model="model.stationCode" :icon="OfficeBuilding"
      :options="stations?.items ? useGenerateOptions(stations?.items, 'code') : []" clearable
      :placeholder="$t('scales.statistics.select_station')" :loading="status === 'pending'" size="large"
      class="max-w-[250px]" @change="$emit('get')" /> -->
    <DateRangePicker v-model="localValue" class="max-w-[280px]" :icon="Calendar" @change="change" size="large"
      :type="type" :placeholder="$t('camera.cards.select_date_range')" />
  </div>
</template>

<script setup lang="ts">
import { Calendar } from '@element-plus/icons-vue';

// const mainStore = useMainStore();
// const systemType = computed(() => mainStore.systemType)

const type = computed(() => {
  if (props.activeTab === 'daily') return 'date';
  if (props.activeTab === 'weekly') return 'week';
  if (props.activeTab === 'monthly') return 'month';
  if (props.activeTab === 'yearly') return 'year';
  return 'week';
});

const model = defineModel(<any>{
  type: [Object, String],
  required: true,
});

const props = defineProps<{
  activeTab: string;
}>();

const localValue = ref<any>(model.value);

// const { data: stations, status } = await useApiService({
//   params: {
//     type: "station",
//     systemsAll: systemType.value.vision
//   }
// }).Organizations.OrganizationsController_selectOrganizations();

const emit = defineEmits<{
  (get: "get"): void;
}>();

const change = () => {
  model.value = localValue.value;
  emit("get");
};

</script>