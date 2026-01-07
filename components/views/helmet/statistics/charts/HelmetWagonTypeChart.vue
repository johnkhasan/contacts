<template>
  <div
    class="w-full p-2 flex flex-col gap-2 bg-surface-50 border border-surface-30 shadow-card rounded-lg font-geist max-w-[367px]"
  >
    <div class="flex flex-col gap-1">
      <span class="text-primary-color font-semibold">Eng yaxshi hudud</span>
      <span class="text-primary-100 dark:text-gray-500 text-[13px]"
        >Tasdiqlangan vagonlar hududlar kesimida</span
      >
    </div>

    <div
      class="flex px-2 py-3 rounded-lg bg-surface-40 border border-surface-30 h-full"
    >
      <EChart :option="option" autoresize style="height: 150px; width: 200px" />

      <div class="flex flex-col gap-2 justify-center">
        <template v-for="item in legend" :key="item.label">
          <div class="flex items-center gap-2 cursor-pointer">
            <span
              :style="{ background: item.color }"
              class="w-3 h-3 rounded-full"
            ></span>
            <span
              class="text-[12px] font-medium text-primary-100 dark:text-gray-500"
              >{{ item.label }}</span
            >
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { EChartsOption } from "echarts";

const data = [
  { value: 38, label: "Yopiq vagonlar", color: "#12203A" },
  { value: 26, label: "Platformalar", color: "#4B89FF" },
  { value: 14, label: "Sisternalar", color: "#194BFF" },
  { value: 12, label: "Yarim vagonlar", color: "#B2CEFF" },
  { value: 10, label: "Boshqa turlar", color: "#6AB0FF" }
];

const legend = data;

const option: EChartsOption = {
  series: [
    {
      type: "pie",
      radius: ["60%", "85%"],
      startAngle: 90,
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 20
      },
      label: { show: false },
      data: data.map(x => ({
        value: x.value,
        name: x.label,
        itemStyle: { color: x.color }
      }))
    }
  ]
};
</script>
