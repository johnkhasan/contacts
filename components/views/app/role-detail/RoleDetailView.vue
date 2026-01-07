<template>
  <div class="flex-1 flex flex-col gap-5 overflow-auto" v-loading="status === 'pending' || roleStatus === 'pending'">
    <div
      class="flex justify-between items-center px-5 py-3 rounded-lg shadow-card border border-surface-30 bg-surface-50">
      <span class="text-2xl font-semibold text-primary-color">
        {{ roleData?.name }}
      </span>

      <div class="flex items-center gap-5" v-can="'update_role_permissions'">
        <Button @click="savePermission" :title="$t('action.save')" :icon="Check" type="submit" color="success"
          class="h-10 grow"></Button>
      </div>
    </div>
    <div class="flex gap-5 flex-1">
      <div class="flex h-full flex-col rounded-lg shadow-card border border-surface-30 bg-surface-50 py-4 px-5">
        <div v-for="(item, index) in groups" :key="index"
          class="px-4 py-3 border-b border-b-surface-30 transition-all font-semibold cursor-pointer hover:bg-surface-40"
          @click="activeGroup = item">
          {{ useGetTranslation(item.name) }}
        </div>
      </div>

      <div
        class="flex flex-1 h-full rounded-lg border border-surface-30 bg-surface-50 py-3 px-5 flex-col gap-5 shadow-card"
        v-if="activeGroup">
        <div
          class="flex px-5 py-3 rounded-md bg-surface-40 border border-surface-30 shadow-card justify-between items-center">
          <span class="text-primary-color font-semibold text-lg">
            {{ useGetTranslation(activeGroup?.name) }}
          </span>
          <el-switch v-model="activeGroup.isActive" @change="groupChange(activeGroup)" />
        </div>

        <div class="overflow-y-auto flex-1">
          <div class="grid grid-cols-2 gap-5">
            <div class="rounded-lg border border-surface-30 bg-surface-50 py-3 px-5 flex-col shadow-card"
              v-for="(item, index) in activeGroup.permissions" :key="index">
              <div class="flex items-center justify-between">
                <span class="text-primary-color font-medium">
                  {{ useGetTranslation(item.name) }}
                </span>
                <el-switch v-model="item.isActive" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconDownload } from "#components";
import type { components } from "@/api/apiMethods.types";
import { Check } from "@element-plus/icons-vue";

type PermissionGroupDto = components["schemas"]["PermissionGroupDto"];
type PermissionDto = components["schemas"]["PermissionDto"];

interface LocalPermission extends PermissionDto {
  isActive: boolean;
}

interface LocalPermissionGroup {
  key: PermissionGroupDto["key"];
  name: PermissionGroupDto["name"];
  isActive: boolean;
  permissions: LocalPermission[];
}

const props = defineProps<{
  id: string;
}>();

const { data, execute, status } = await useApiService({ immediate: false }).Permissions.getAllPermissions();
const { data: roleData, execute: roleExecute, status: roleStatus } =
  await useApiService({ immediate: false }).Role.getRole(props.id);

const groups = ref<LocalPermissionGroup[]>([]);
const activeGroup = ref<LocalPermissionGroup | null>(null);

const selectedPermissions = computed(() =>
  groups.value.flatMap((g) => g.permissions).filter((p) => p.isActive)
);

function groupChange(group: LocalPermissionGroup) {
  group.permissions.forEach((p) => {
    p.isActive = group.isActive;
  });
}

function buildLocalPermissions() {
  if (!data.value || !roleData.value) return;

  const rolePermissionKeys = new Set(
    (roleData.value.permissions || []).map((p: PermissionDto) => p.key)
  );

  groups.value = (data.value.groups || []).map((group: PermissionGroupDto) => {
    const localPermissions: LocalPermission[] = (group.permissions || []).map(
      (perm: PermissionDto) => {
        const isActive = rolePermissionKeys.has(perm.key);
        return {
          ...perm,
          isActive,
        };
      }
    );

    const groupIsActive = localPermissions.some((p) => p.isActive);

    return {
      ...group,
      isActive: groupIsActive,
      permissions: localPermissions,
    };
  });

  activeGroup.value = groups.value[0] ?? null;
}

function savePermission() {
  const permissions = selectedPermissions.value.map((p) => p.key)
  useApiService().Role.updateRolePermissions(props.id, { permissions })
}

onMounted(async () => {
  await execute();
  await roleExecute();

  buildLocalPermissions();
});
</script>
