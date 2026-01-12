<template>
  <div class="p-1 rounded-xl flex items-center gap-1 w-full sm:w-auto bg-[#F2F4F7]">
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      @click="updateValue(option.value)"
      class="flex-1 flex items-center justify-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ease-in-out border-2 border-transparent outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
      :class="[
        modelValue === option.value
          ? 'bg-white shadow text-gray-900'
          : 'text-gray-500 hover:bg-gray-200/50',
        color === 'blue' ? 'focus-visible:ring-blue-500' : 'focus-visible:ring-primary-color'
      ]"
    >
      <!-- Icon Wrapper -->
      <div
        class="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 shrink-0"
        :class="[
          getIconClasses(option.value === modelValue)
        ]"
      >
        <component :is="option.icon" class="w-5 h-5" />
      </div>

      <!-- Label -->
      <span class="font-bold text-sm whitespace-nowrap">
        {{ option.label }}
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue';

export interface SegmentedRadioOption {
  label: string;
  value: string | number;
  icon: Component;
}

interface Props {
  options: SegmentedRadioOption[];
  modelValue: string | number;
  color?: 'blue' | 'primary';
}

const props = withDefaults(defineProps<Props>(), {
  color: 'blue'
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();

const updateValue = (value: string | number) => {
  emit('update:modelValue', value);
};

const getIconClasses = (isSelected: boolean) => {
  if (props.color === 'blue') {
    return isSelected
      ? 'bg-blue-600 text-white'
      : 'bg-blue-50 text-blue-600';
  }
  // Primary color fallback
  return isSelected
    ? 'bg-primary-color text-white'
    : 'bg-primary-100 text-primary-color';
};
</script>

<style scoped>
/* Ensure the primary color variables are available if using primary mode */
.bg-primary-color {
  background-color: var(--primary-color);
}
.text-primary-color {
  color: var(--primary-color);
}
.bg-primary-100 {
  background-color: var(--primary-100);
}
</style>
