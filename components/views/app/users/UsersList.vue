<template>
  <Table :data="data?.items" :columns="columns" :actions="{
    edit: true, delete: true, assign: true, width: 200
  }" :page="data?.page" :size="data?.size" @edit="$emit('edit', $event)" @delete="deleteUser"
    @assign="$emit('assignRole', $event)"
    :permissions="{ edit: ['update_account'], delete: ['delete_account'], assign: ['delete_account'] }">
    <!-- #FIX need a fix assign permission -->
    <template #profile="{ row }">
      <div class="flex items-center gap-4">
        <div v-if="row.profile?.photo">
          <el-image :src="row.profile.photo" :preview-src-list="[
            row.profile.photo
          ]" fit="cover" class="w-[64px] h-[64px] cursor-pointer rounded-md" :preview-teleported="true"
            closeOnPressEscape hideOnClickModal />
        </div>
        <div class="flex flex-col">
          <span class="font-bold text-base">
            {{ row.profile?.firstName }} {{ row.profile?.lastName }}
          </span>
          <span>
            {{ row.profile?.postName }}
          </span>
        </div>
      </div>
    </template>

    <template #roles="{ row }">
      <div class="flex flex-wrap gap-2">
        <Tag v-for="role in row.roles" :key="role.role.id" :title="role.role.name" color="info" />
      </div>
    </template>
  </Table>
  <Pagination :total="data?.total" v-model:page="model.page" v-model:size="model.size" @get="$emit('get')" />
</template>

<script setup lang="ts">
import type { components } from "@/api/apiMethods.types";
import type { basePagination, TableColumn } from "@/types";
import type { WagonFilterParams } from "@/types/wagon";
type ListAccountsResponse = components["schemas"]["ListAccountsResponse"];
type User = components["schemas"]["AccountDto"];

const { t } = useI18n();

const model = defineModel<Partial<WagonFilterParams & basePagination>>({
  default: {}
});

const emit = defineEmits<{
  (e: "get"): void;
  (e: "edit", user: User): void;
  (e: "assignRole", user: User): void;
}>();

const props = defineProps({
  data: {
    type: Object as () => ListAccountsResponse,
    required: true
  },
})

const columns = computed<TableColumn<User>[]>(() => [
  {
    prop: "login",
    label: t("users.login"),
    width: 200,
  },
  {
    prop: "profile",
    label: t("users.profile"),
  },
  {
    prop: "roles",
    label: t("users.roles"),
    width: 500,
  }
]);

const deleteUser = async (user: User) => {
  const { error } = await useApiService().Account.deleteAccountById(user.id);
  if (!error.value) {
    emit("get");
  }
};
</script>
