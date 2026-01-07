<template>
  <el-form :model="formData" ref="formDataRef" label-position="top"
    class="flex flex-col gap-1.5 p-4 rounded-2xl bg-surface-40" @submit.prevent
    v-loading="loading || userRolesStatus === 'pending'">
    <el-form-item :label="$t('users.form.role')" prop="role">
      <FormSelect :options="userRoles?.items ? useGenerateRoleSelectOptions(userRoles?.items) : []" :icon="User"
        v-model="formData.roleId" :placeholder="$t('users.form.rolePlaceholder')" />
    </el-form-item>

    <el-form-item :label="$t('users.form.apps')">
      <FormSelect :options="translatedSystemOptions" :icon="IconApps" v-model="systemsAny" :clearable="false" multiple
        :max-collapse-tags="3" :placeholder="$t('users.form.appsPlaceholder')" @change="changeOrgType" />
    </el-form-item>

    <el-form-item :label="$t('users.form.organization')" prop="organizations">
      <FormSelect :options="organizationOptions ? useGenerateOptions(organizationOptions) : []" :icon="OfficeBuilding"
        v-model="formData.organizations" multiple :placeholder="$t('users.form.organizationPlaceholder')"
        :disabled="systemsAny.length < 1" />
    </el-form-item>

    <div class="flex gap-4">
      <Button @click.prevent="$emit('cancel')" :title="$t('action.cancel')" type="reset" variant="outlined"
        class="h-10 grow"></Button>

      <Button @click.prevent="onSubmit" :title="$t('action.save')" :icon="IconCheck" type="submit" color="success"
        class="h-10 grow"></Button>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { IconApps, IconCheck } from '#components';
import type { components } from '@/api/apiMethods.types';
import { useMainStore } from '@/store/main';
import type { UserCreateOrganizationFilters } from '@/types';
import { OfficeBuilding, User } from '@element-plus/icons-vue';
import type { ElForm } from 'element-plus';

type AccountDto = components["schemas"]["AccountDto"];
type AddRoleRequest = components["schemas"]["AddRoleRequest"];

const props = defineProps<{
  isEdit?: boolean;
  editData?: AccountDto | null;
}>();

const mainStore = useMainStore();
const emit = defineEmits(['cancel', 'get']);

const loading = ref<boolean>(false);
const formDataRef = ref<InstanceType<typeof ElForm>>();
const translatedSystemOptions = computed(() => mainStore.translatedSystemOptions);

const systemsAny = ref<number[]>([])

const filterParams = reactive<UserCreateOrganizationFilters>({
  systemsAny: systemsAny.value.reduce((acc, curr) => acc | curr, 0)
})

const { data: organizations, execute: getOrganizations } = useApiService({
  params: filterParams,
}).Organizations.OrganizationsController_selectOrganizations();

const { data: userRoles, status: userRolesStatus } = useApiService().Role.listRoles();

const computedSystemType = computed(() => systemsAny.value.reduce((acc, curr) => acc | curr, 0));
const organizationOptions = computed(() => {
  return organizations.value?.items ? organizations.value?.items : []
})

const formData = reactive<Partial<AddRoleRequest>>({
  organizations: [],
  roleId: undefined,
  systems: undefined
});

function onSubmit() {
  formDataRef.value?.validate((valid) => {
    if (valid) {
      submit();
    }
  });
}

const changeOrgType = () => {
  filterParams.systemsAny = computedSystemType.value;
  formData.systems = computedSystemType.value;
  formData.organizations = []

  getOrganizations();
}

const submit = async () => {
  loading.value = true;

  const postData = {
    roleId: formData.roleId,
    organizations: formData.organizations,
    systems: formData.systems,
  } as AddRoleRequest;

  if (props.editData?.id) {
    await useApiService().Account.addRoleToAccount(props.editData?.id, postData)
  }

  loading.value = false;

  emit('get');
  emit('cancel');
};
</script>