<template>
  <div class="grid grid-cols-4 gap-4">
    <card v-for="(card, index) in cardInformations" :key="index">
      <template #title>
        {{ card.title }}
      </template>
      <template #total>
        {{ card.total }}
      </template>
      <template #increment>
        <div
          class="border-[2px] py-0.5 px-2 text-white rounded-[26px]"
          :class="
            Number(card.increment) < 0
              ? 'bg-danger-100 border-danger-50'
              : Number(card.increment) < 100
                ? 'bg-warning-100 border-warning-50'
                : 'bg-success-100  border-success-50'
          "
        >
          <span class="font-semibold text-sm">
            {{ card.increment }}
          </span>
        </div>
      </template>
      <template #icon>
        <component :is="card.icon" class="text-info-100" />
      </template>
      <template #comparisonText>
        {{ card.comparisonText }}
      </template>
    </card>
  </div>
</template>

<script setup lang="ts">
const cardInformations = ref([
  {
    title: "Umumiy yuklangan vagonlar",
    total: "1,245",
    increment: "+245",
    icon: "icon-docs",
    comparisonText: "O'tgan oyga nisbatan:"
  },
  {
    title: "Yuk tashish hajmi (tonna)",
    total: "54,320",
    increment: "+27",
    icon: "icon-ship",
    comparisonText: "O'tgan oyga nisbatan:"
  },
  {
    title: "O'rtacha yuk tashish masofasi (km)",
    total: "1,200",
    increment: "+117",
    icon: "icon-distance",
    comparisonText: "O'tgan oyga nisbatan:"
  },
  {
    title: "Yuk tashish vaqti (soat)",
    total: "3,450",
    increment: "-20",
    icon: "icon-time",
    comparisonText: "O'tgan oyga nisbatan:"
  }
]);
</script>
