<template>
  <div class="flex flex-col p-2 gap-2 bg-surface-50 border border-surface-30 rounded-lg cursor-pointer">
    <div class="flex flex-col gap-1">
      <div>
        <span class="font-semibold text-primary-color">{{ name }}</span>
      </div>
      <!-- <div class="flex gap-1 items-center">
        <icon-activity class="w-4 h-4 text-primary-color" />
        <div>
          <span class="text-[13px]">{{ date }}</span>
        </div>
      </div> -->
    </div>

    <div class="flex flex-col rounded-lg bg-surface-40 p-2 gap-2 border border-surface-30">
      <!-- <div class="flex items-center justify-between gap-1">
        <div class="flex items-center gap-1">
          <icon-camera-activity class="text-primary-color w-4 h-4" />
          <div>
            <span class="text-[13px]">{{ camera_name }}</span>
          </div>
        </div>

        <button class="py-1 px-2 bg-danger-50 border border-danger-20 text-white rounded">
          Chiqish
        </button>
      </div> -->
      <div class="flex items-center justify-between gap-1">
        <div class="flex flex-col gap-1">
          <div>
            <span class="font-semibold text-[31px] text-primary-color">{{ camera_number }}</span>
          </div>
          <div>
            <span class="text-primary-color text-[13px]">{{ $t('wagon.totalWagons') }}</span>
          </div>
        </div>
        <div class="p-2 border border-surface-30 rounded-lg">
          <icon-wagon-covered class="w-5 h-5 text-primary-color" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string;
  date?: string;
  camera_name?: string;
  camera_number: number;
}>();

</script>