<template>
  <div
    class="w-full p-2 flex flex-col gap-2 bg-surface-50 border border-surface-30 shadow-card rounded-lg font-geist"
  >
    <div class="flex flex-col gap-1">
      <span class="text-primary-color font-semibold">Eng yaxshi hudud</span>
      <span class="text-primary-100 dark:text-gray-500 text-[13px]"
        >Tasdiqlangan vagonlar hududlar kesimida</span
      >
    </div>

    <div
      class="flex flex-col px-2 py-5 rounded-lg bg-surface-40 border border-surface-30"
    >
      <div
        class="flex flex-col"
        v-for="(item, index) in cardInformations"
        :key="index"
      >
        <div class="flex gap-2 items-center">
          <div
            class="border-[2px] border-yellow-600 bg-yellow-500 rounded-full p-2"
          >
            <icon-stars class="text-white" />
          </div>

          <div class="flex flex-col flex-1">
            <span class="text-primary-color font-semibold">{{
              item.title
            }}</span>
            <span class="text-primary-100 text-[13px]"
              >Vagonlar: {{ item.total }}</span
            >
          </div>

          <div
            class="border-[2px] border-yellow-600 bg-yellow-500 rounded-md px-2 py-0.5"
          >
            <span class="text-white font-semibold">{{ item.increment }}</span>
          </div>
        </div>
        <div
          class="w-full h-[1px] bg-surface-30 my-1"
          v-if="index + 1 !== cardInformations.length"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const cardInformations = ref([
  {
    title: "Toshkent hududi",
    total: 620,
    increment: 42
  },
  {
    title: "Samarqand hududi",
    total: 540,
    increment: 35
  },
  {
    title: "Buxoro hududi",
    total: 480,
    increment: 28
  }
]);
</script>
