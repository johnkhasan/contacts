<template>
  <div class="flex justify-between gap-4">
    <Input v-model="model.borderCustomsCode" :placeholder="$t('scales.BorderNumber')" @input="$emit('get')"
      :icon="IconSearch" class="max-w-[250px]" />
  </div>
</template>

<script setup lang="ts">
import { IconSearch } from "#components";
import { useMainStore } from "@/store/main";
import type { WagonFilterParams } from "@/types/wagon";

defineEmits(["export", "get"]);

const mainStore = useMainStore();
const systemType = computed(() => mainStore.systemType)

const model = defineModel<Partial<WagonFilterParams>>({
  default: {}
});

const { t } = useI18n();

const statusList = computed(() => [
  { label: t("station.overload"), value: "overload" },
  { label: t("station.clean"), value: "clean" }
])

</script>
