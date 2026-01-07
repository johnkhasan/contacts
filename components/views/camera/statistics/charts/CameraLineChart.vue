<template>
  <div
    class="w-full p-2 flex flex-col gap-2 bg-surface-50 border border-surface-30 shadow-card rounded-lg font-geist h-full min-h-[400px]"
    v-loading="intervalStatus === 'pending'">
    <div class="flex flex-col gap-1">
      <span class="text-primary-color font-semibold">{{ t('scales.statistics.wagons_statistics_by_period') }}</span>
    </div>

    <div class="flex gap-2 items-center mb-5 justify-between pr-5">
      <div class="flex items-center gap-2">
        <button v-for="item in tabs" :key="item" @click="changeTab(item)" :class="[
          'px-3 py-1 rounded-xl text-sm font-medium border border-surface-20',
          item === activeTab ? 'bg-surface-30' : 'bg-surface-40 text-primary-100'
        ]">
          {{ t(`camera.cards.${item}`) }}
        </button>
      </div>

      <div>
        <CameraLineChartFilter v-model="filterParams" :activeTab="activeTab" @get="getData" />
      </div>
    </div>

    <div class="flex flex-col px-2 py-3 rounded-lg bg-surface-40 border border-surface-30 h-full">
      <EChart :option="option" autoresize style="width: 100%; height: 100%" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { EChartsOption } from "echarts";

const now = new Date();
const filterParams = ref<Date | undefined>(new Date(now.getFullYear(), 0, 1));
const filter = reactive<{ start?: string; end?: string; timeIntervalCount?: number }>({});

const { data: intervalData, status: intervalStatus, execute: executeInterval } =
  await useApiService({
    params: filter,
    immediate: false
  }).WagonSession.WagonSessionController_getIntervalStatistics();

const tabs = ["daily", "weekly", "monthly", "yearly"] as const;
const activeTab = ref<typeof tabs[number]>("yearly");

const { t } = useI18n();


const xLabels = computed(() => {
  if (!filterParams.value) return [];

  const selected = new Date(filterParams.value);

  if (activeTab.value === "daily") return generateDayHours();
  if (activeTab.value === "weekly") return generateWeekDays(selected);
  if (activeTab.value === "monthly") return generateMonthDays(selected);
  if (activeTab.value === "yearly") return generateMonths();

  return [];
});

const generateDayHours = () => {
  const hours: string[] = [];
  for (let i = 0; i < 24; i++) {
    hours.push(i.toString().padStart(2, "0") + ":00");
  }
  return hours;
};

const generateWeekDays = (selected: Date) => {
  const days: string[] = [];
  const startOfWeek = new Date(selected);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

  for (let i = 0; i < 7; i++) {
    const d = new Date(startOfWeek);
    d.setDate(d.getDate() + i);
    days.push(
      d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short"
      })
    );
  }
  return days;
};

const generateMonthDays = (selected: Date) => {
  const days: string[] = [];
  const year = selected.getFullYear();
  const month = selected.getMonth();
  const totalDays = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= totalDays; day++) {
    const d = new Date(year, month, day);
    days.push(
      d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short"
      })
    );
  }
  return days;
};

const generateMonths = () => {
  return [
    t("months.january"),
    t("months.february"),
    t("months.march"),
    t("months.april"),
    t("months.may"),
    t("months.june"),
    t("months.july"),
    t("months.august"),
    t("months.september"),
    t("months.october"),
    t("months.november"),
    t("months.december")
  ];
};

const getRange = (selected: Date, type: "daily" | "weekly" | "monthly" | "yearly") => {
  const start = new Date(selected);
  const end = new Date(selected);

  if (type === "daily") end.setDate(end.getDate() + 1);
  if (type === "weekly") end.setDate(end.getDate() + 7);
  if (type === "monthly") end.setMonth(end.getMonth() + 1);
  if (type === "yearly") end.setFullYear(end.getFullYear() + 1);

  return {
    start: start.toISOString(),
    end: end.toISOString()
  };
};

const getData = () => {
  if (!filterParams.value) return;

  const selected = new Date(filterParams.value);

  const { start, end } = getRange(selected, activeTab.value);

  filter.start = start;
  filter.end = end;

  if (activeTab.value === "daily") {
    filter.timeIntervalCount = 24;
  } else if (activeTab.value === "monthly") {
    const year = selected.getFullYear();
    const month = selected.getMonth();
    filter.timeIntervalCount = new Date(year, month + 1, 0).getDate();
  } else if (activeTab.value === "yearly") {
    filter.timeIntervalCount = 12;
  }

  executeInterval();
};

const changeTab = (item: "daily" | "weekly" | "monthly" | "yearly") => {
  activeTab.value = item
  getData();
}

const option = computed<EChartsOption>(() => {
  return {
    grid: {
      top: 30,
      right: 0,
      left: 0,
      bottom: 45
    },

    tooltip: {
      trigger: "axis",
      backgroundColor: "#FFFFFF",
      borderColor: "#E4E9F2",
      borderWidth: 1,
      padding: 10,
      textStyle: { color: "#1B1F33", fontSize: 14 },
      formatter: (params: any) => {
        let result = `<span style="font-weight: bold;">${params[0].axisValue}</span><br/>`;

        params.forEach((item: any) => {
          result += `
            <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${item.color};"></span>
            ${item.seriesName}: <strong>${item.data}</strong><br/>
          `;
        });

        return result;
      }
    },

    xAxis: {
      type: "category",
      boundaryGap: false,
      data: xLabels.value,
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
      axisLabel: { color: "#AAB3C1", fontSize: 13 },
      splitLine: { show: true, lineStyle: { color: "rgba(170, 179, 193, 0.25)" } }
    },

    series: [
      {
        type: "line",
        smooth: true,
        symbol: "none",
        name: t("scales.statistics.total_count"),
        data: intervalData.value?.intervals.map((x) => x.enterUndetectedVagonCount),
        lineStyle: { width: 4, color: "#5A78FF" },
        areaStyle: { color: "rgba(90, 120, 255, 0.20)" }
      },
      {
        type: "line",
        smooth: true,
        symbol: "none",
        name: t("scales.statistics.extra_weighted_wagons"),
        data: intervalData.value?.intervals.map((x) => x.exitedTrainCount),
        lineStyle: { width: 4, color: "#FA6298" },
        areaStyle: { color: "rgba(250, 98, 152, 0.2)" }
      }
    ]
  };
});

onMounted(() => getData());
</script>
