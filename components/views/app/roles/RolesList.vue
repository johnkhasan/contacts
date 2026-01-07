<template>
  <Table :data="data.items" :columns="columns" :actions="{
    edit: true, view: true, delete: true, width: 200
  }" :page="data.page" :size="data.size"
    :permissions="{ edit: ['update_role'], view: ['view_role'], delete: ['delete_role'] }" :indexWidth="100"
    @edit="$emit('edit', $event)" @view="view" @delete="deleteRole" />

  <Pagination :total="data.total" v-model:page="model.page" v-model:size="model.size" @get="$emit('get')" />
</template>

<script setup lang="ts">
import type { components } from "@/api/apiMethods.types";
import type { basePagination, TableColumn } from "@/types";
import type { WagonFilterParams } from "@/types/wagon";
type ListRolesResponse = components["schemas"]["ListRolesResponse"];
type Role = components["schemas"]["RoleDto"];

const { t } = useI18n();
const router = useRouter();

const model = defineModel<Partial<WagonFilterParams & basePagination>>({
  default: {}
});

const emit = defineEmits<{
  (e: "get"): void;
  (e: "edit", role: Role): void;
}>();

const props = defineProps({
  data: {
    type: Object as () => ListRolesResponse,
    required: true
  },
})

const columns = computed<TableColumn<Role>[]>(() => [
  {
    prop: "name",
    label: t("common.name")
  }
]);

const view = (role: Role) => {
  router.push(`/app/roles/${role.id}`);
};

const deleteRole = async (role: Role) => {
  await useApiService().Role.deleteRole(role.id)
  emit("get");
}
</script>
