<template>
  <div class="grid grid-cols-4 gap-4">
    <helmet-card class="cursor-pointer" v-for="item in data.items" :key="item.organization.id" :station="item"
      :icon="IconAlertTriangle" @click="viewMethod(item)" />
  </div>
</template>

<script setup lang="ts">
import { IconAlertTriangle } from "#components";
import type { components } from "@/api/apiMethods.types";

type CountCameraByCompaniesResponse = components["schemas"]["CountCameraByCompaniesResponse"];
type CountCameraByCompaniesItem = components["schemas"]["CountCameraByCompaniesItem"];

const router = useRouter();

defineProps<{
  data: CountCameraByCompaniesResponse;
}>();

const viewMethod = (row: CountCameraByCompaniesItem) => {
  router.push(`/helmet/companies/${row.organization.id}`);
};

</script>
