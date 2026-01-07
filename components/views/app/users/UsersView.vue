<template>
  <template v-if="openCreateWagonModel">
    <Modal v-model="openCreateWagonModel" :title="$t('action.create.createNewUser')">
      <UsersCreate @cancel="onCancel" @get="execute" :isEdit="isEdit" :editData="editData" />
    </Modal>
  </template>

  <template v-if="openUserRoleAssignModel">
    <Modal v-model="openUserRoleAssignModel" :title="$t('action.assign.roleToUser')">
      <UsersRoleAssign @cancel="closeAssignRoleModal" @get="execute" :editData="editData" />
    </Modal>
  </template>

  <div class="flex-1 flex flex-col gap-5 overflow-auto" v-loading="status === 'pending'">
    <UsersFilter v-model="filterParams" @create="onCreate" @get="execute" />

    <UsersList v-model="filterParams" :data="data!" @get="execute" @edit="onEdit" @assignRole="onAssignRole" />
  </div>
</template>

<script setup lang="ts">
import type { basePagination } from "@/types/common";
import type { components } from "@/api/apiMethods.types";
import type { UsersFilter } from "@/types";

type User = components["schemas"]["AccountDto"];

const filterParams = reactive<Partial<UsersFilter & basePagination>>({
  page: 1,
  size: 10,
  login: ""
});

useQuerySync(filterParams);

const openCreateWagonModel = ref<boolean>(false);
const openUserRoleAssignModel = ref<boolean>(false);

const isEdit = ref<boolean>(false);
const editData = ref<User | null>(null);

const { data, execute, status } = await useApiService({ params: filterParams }).Account.listAccounts()

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

function onEdit(user: User) {
  isEdit.value = true;
  editData.value = user;
  openCreateWagonModel.value = true;
}

function onAssignRole(user: User) {
  editData.value = user;
  openUserRoleAssignModel.value = true;
}

function closeAssignRoleModal() {
  editData.value = null;
  openUserRoleAssignModel.value = false;
}
</script>
