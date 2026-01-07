<template>
  <div
    class="w-full p-2 flex flex-col gap-2 bg-surface-50 border border-surface-30 shadow-card rounded-lg font-geist max-w-[271px]"
  >
    <div class="flex flex-col gap-1">
      <span class="text-primary-color font-semibold">Eng yaxshi hudud</span>
      <span class="text-primary-100 dark:text-gray-500 text-[13px]"
        >Tasdiqlangan vagonlar hududlar kesimida</span
      >
    </div>

    <div
      class="flex flex-col px-2 py-3 rounded-lg bg-surface-40 border border-surface-30 h-full"
    >
      <EChart :option="option" autoresize style="height: 120px; width: 100%" />

      <div class="flex items-center justify-center gap-3">
        <div class="flex items-center gap-2 cursor-pointer">
          <span class="w-3 h-3 rounded-full bg-[#4CAF93]"></span>
          <span class="text-sm font-medium text-primary-100 dark:text-gray-500"
            >Tasdiqlangan</span
          >
        </div>

        <div class="flex items-center gap-2 cursor-pointer">
          <span class="w-3 h-3 rounded-full bg-[#111827]"></span>
          <span class="text-sm font-medium text-primary-100 dark:text-gray-500"
            >Barchasi</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { EChartsOption } from "echarts";
const percentage = 65;

const option: EChartsOption = {
  series: [
    {
      type: "gauge",
      startAngle: 180,
      endAngle: 0,
      radius: "150%",
      center: ["50%", "80%"],
      min: 0,
      max: 100,
      progress: {
        show: true,
        width: 30,
        roundCap: true,
        itemStyle: {
          color: "#4CAF93"
        }
      },
      axisLine: {
        lineStyle: {
          width: 30,
          color: [[1, "#D7E1FF"]] // ✔ background arc color (light blue)
        }
      },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { show: false },
      pointer: { show: false },

      detail: {
        valueAnimation: true,
        formatter: `${percentage}%`,
        color: "#4CAF93",
        fontSize: 28,
        offsetCenter: [0, "-20%"] // moves text up
      },

      data: [{ value: percentage }]
    }
  ]
};
</script>
