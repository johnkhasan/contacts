<template>
  <div
    class="w-full p-2 flex flex-col gap-2 bg-surface-50 border border-surface-30 shadow-card rounded-lg font-geist h-full"
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
      <EChart :option="option" autoresize style="width: 100%; height: 100%" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { EChartsOption } from "echarts";

const weeks = ["1-hafta", "2-hafta", "3-hafta", "4-hafta"];
const datapoints = [100, 200, 300, 100];

const option: EChartsOption = {
  grid: {
    top: 30,
    right: 0,
    left: 0,
    bottom: 45
  },

  xAxis: {
    type: "category",
    boundaryGap: false,
    data: weeks,
    axisTick: { show: false },
    axisLine: { show: false },
    axisLabel: {
      color: "#1B1F33",
      fontSize: 14,
      padding: [10, 0, 0, 0]
    }
  },

  yAxis: {
    type: "value",
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      color: "#AAB3C1",
      fontSize: 13
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: "rgba(170, 179, 193, 0.25)"
      }
    }
  },

  series: [
    {
      type: "line",
      smooth: true,
      symbol: "none",
      data: datapoints,
      lineStyle: {
        width: 4,
        color: "#5A78FF"
      },
      areaStyle: {
        color: "rgba(90, 120, 255, 0.20)"
      }
    }
  ]
};
</script>
