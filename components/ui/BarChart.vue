<template>
  <div class="w-full h-64">
    <EChart :option="option" autoresize />
  </div>
</template>

<script setup lang="ts">
const option = {
  title: {
    text: "Sales Report"
  },
  tooltip: {},
  xAxis: {
    type: "category",
    data: ["Jan", "Feb", "Mar", "Apr", "May"]
  },
  yAxis: {
    type: "value"
  },
  series: [
    {
      name: "Sales",
      type: "bar",
      data: [120, 200, 150, 80, 70],
      itemStyle: {
        borderRadius: [6, 6, 0, 0]
      }
    }
  ]
};
</script>
