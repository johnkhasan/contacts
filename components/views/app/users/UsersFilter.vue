<template>
  <div class="flex justify-between gap-4">
    <Input v-model="model.login" :placeholder="$t('users.search')" :icon="IconSearch" @input="$emit('get')"
      class="max-w-[250px]" />

    <div class="flex-1 flex items-center justify-end gap-4" v-can="'create_account'">
      <Button @click="$emit('create')" :title="$t('action.create.createNewUser')" :icon="IconAddSquare"
        color="info"></Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconAddSquare, IconSearch } from "#components";
import type { UsersFilter } from "@/types";

defineEmits(["create", "get"]);

const model = defineModel<Partial<UsersFilter>>({
  default: {}
});
</script>
