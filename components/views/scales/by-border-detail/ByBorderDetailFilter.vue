<template>
  <div class="flex justify-between gap-4">
    <Input v-model="model.sostavNumber" :placeholder="$t('scales.sostavNumber')" @input="$emit('get')"
      :icon="IconSearch" class="max-w-[250px]" />
  </div>
</template>

<script setup lang="ts">
import { IconSearch } from "#components";
import type { WagonFilterParams } from "@/types/wagon";

defineEmits(["export", "get"]);


const model = defineModel<Partial<WagonFilterParams>>({
  default: {}
});

const { t } = useI18n();
</script>
