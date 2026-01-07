<template>
  <div class="flex justify-between gap-4">

    <div class="flex items-center gap-4">
      <Input v-model="model.camera_name" :placeholder="$t('wagon.search')" @input="$emit('get')" :icon="IconSearch"
        class="max-w-[250px]" />
      <div class="bg-slate-50 px-3 py-1.5 rounded-md text-success-100 border border-success-100">
        <span class="w-max block">{{ $t('camera.lastPing') }}: {{ useFormatDateTime(lastPingData?.pingedAt) }}</span>
      </div>

      <Button @click="$emit('viewCameras')" :title="$t('camera.camerasState')" :icon="IconCameraActivity"
        color="success"></Button>
    </div>

    <div class="flex-1 flex items-center justify-end gap-4">
      <DateRangePicker v-model="localValue" type="daterange" class="max-w-[380px]" :icon="Calendar" @change="change"
        size="large" />


      <!-- <Select v-model="model.stationCode" v-loading="status === 'pending'"
        :options="useGenerateOptions(organization?.items!, 'code')" :placeholder="$t('station.choose')" :icon="IconMap"
        class="max-w-[200px]" @change="$emit('get')" :filterable="true" :filter-method="getStations"></Select>

      <Select v-model="model.status" :options="statusList" :placeholder="$t('all.title')" :icon="IconFilter"
        class="max-w-[180px]" @change="$emit('get')"></Select> -->

    </div>
  </div>
</template>

<script setup lang="ts">
import { IconCameraActivity, IconSearch } from "#components";
import type { CameraWagonFilterParams } from "@/types";
import { Calendar } from "@element-plus/icons-vue";

const emit = defineEmits(["export", "get", "viewCameras"]);

const model = defineModel<Partial<CameraWagonFilterParams>>({
  default: {}
});

const props = defineProps<{
  lastPingData: any;
}>();

const localValue = ref<any>([
  model.value.fromDate ? new Date(model.value.fromDate) : null,
  model.value.toDate ? new Date(model.value.toDate) : null,
]);

const change = () => {
  if (localValue.value) {
    model.value.fromDate = localValue.value[0]
      ? new Date(localValue.value[0]).toISOString()
      : new Date().toISOString();
    model.value.toDate = localValue.value[1]
      ? new Date(localValue.value[1]).toISOString()
      : new Date().toISOString();
  } else {
    model.value.fromDate = undefined;
    model.value.toDate = undefined;
  }
  emit("get");
};
</script>
