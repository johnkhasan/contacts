<template>
  <div class="flex justify-between gap-4">
    <Input v-model="model.search" :placeholder="$t('wagon.search')" :icon="IconSearch" class="max-w-[250px]" />

    <div class="flex-1 flex items-center justify-end gap-4" v-can="'create_role'">
      <Button @click="$emit('create')" :title="$t('action.create.createNewRole')" :icon="IconAddSquare"
        color="info"></Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconAddSquare, IconSearch } from "#components";
import type { RolesFilter } from "@/types";

defineEmits(["create"]);

const model = defineModel<Partial<RolesFilter>>({
  default: {}
});
</script>
