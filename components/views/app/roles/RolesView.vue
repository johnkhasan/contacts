<template>
  <template v-if="openCreateWagonModel">
    <Modal v-model="openCreateWagonModel" :title="$t('action.create.createNewRole')">
      <RolesCreate @cancel="onCancel" @get="execute" :isEdit="isEdit" :editData="editData" />
    </Modal>
  </template>

  <div class="flex-1 flex flex-col gap-5 overflow-auto" v-loading="status === 'pending'">
    <RolesFilter v-model="filterParams" @create="onCreate" @get="execute" />

    <template v-if="data">
      <RolesList v-model="filterParams" :data="data" @get="execute" @edit="onEdit" />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { basePagination } from "@/types/common";
import type { components } from "@/api/apiMethods.types";
import type { RolesFilter } from "@/types";

type Role = components["schemas"]["RoleDto"];

const filterParams = reactive<Partial<RolesFilter & basePagination>>({
  page: 1,
  size: 10
});

useQuerySync(filterParams);

const openCreateWagonModel = ref<boolean>(false);
const isEdit = ref<boolean>(false);
const editData = ref<Role | null>(null);

const { data, execute, status } = await useApiService({ params: filterParams }).Role.listRoles()

function onCreate() {
  isEdit.value = false;
  editData.value = null;
  openCreateWagonModel.value = true;
}

function onCancel() {
  isEdit.value = false;
  editData.value = null;
  openCreateWagonModel.value = false;
}

function onEdit(user: Role) {
  isEdit.value = true;
  editData.value = user;
  openCreateWagonModel.value = true;
}
</script>
