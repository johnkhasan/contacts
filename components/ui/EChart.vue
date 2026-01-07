<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import * as echarts from "echarts";

// Props
const props = defineProps({
  option: { type: Object, required: true }
});

const chart = ref(null);
let instance: echarts.ECharts | null = null;

onMounted(() => {
  if (!chart.value) return;

  instance = echarts.init(chart.value);
  instance.setOption(props.option);

  window.addEventListener("resize", handleResize);
});

const handleResize = () => instance?.resize();

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
  instance?.dispose();
});

// If option changes, update chart
watch(
  () => props.option,
  () => {
    instance?.setOption(props.option);
  },
  { deep: true }
);
</script>

<template>
  <div ref="chart" class="w-full h-full"></div>
</template>
