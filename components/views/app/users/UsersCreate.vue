<template>
  <el-form :model="formData" ref="formDataRef" :rules="formDataRules" label-position="top"
    class="flex flex-col gap-1.5 p-4 rounded-2xl bg-surface-40" v-loading="loading" @submit.prevent>
    <el-form-item :label="$t('users.form.pin')" v-if="!isEdit">
      <div class="flex items-center gap-3 flex-1">
        <FormInput class="!w-full !flex-1" :prefix-icon="IconUserProfile" v-model="serachUserData.pin"
          :placeholder="$t('users.form.pinPlaceholder')" @keydown.enter.prevent.stop="searchUser" />
        <button type="button" class="bg-info-100 p-2 rounded-md text-white" @click.prevent="searchUser">
          <IconFind />
        </button>
      </div>
    </el-form-item>

    <template v-if="userData">
      <div class="flex flex-col gap-2">
        <div class="text-primary-color">
          <span>{{ $t('users.form.userInfo') }}</span>
        </div>

        <div class="flex items-center gap-8 border bg-surface-50 border-surface-20 rounded-lg px-4 py-3">
          <img :src="userData.photo" alt="User Avatar"
            class="w-[72px] h-[72px] rounded-full border border-surface-20 object-cover" />
          <div class="flex flex-col gap-1 max-w-[65%]">
            <div class="flex gap-1 font-bold text-primary-color text-lg">
              <span>
                {{ userData.firstName }}
                {{ userData.lastName }}
                {{ userData.middleName }}
              </span>
            </div>
            <div>
              <span class="text-primary-500 text-xs">
                {{ userData.postName }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-if="userData">
      <el-form-item :label="$t('users.form.login')" prop="login" v-if="!props.isEdit">
        <FormInput :prefix-icon="IconCoinNumber" v-model="formData.login" :disabled="!userData"
          :placeholder="$t('users.form.loginPlaceholder')" />
      </el-form-item>

      <el-form-item :label="$t('users.form.password')" prop="password" v-if="!props.isEdit">
        <FormInput :prefix-icon="IconAlignDown" v-model="formData.password" :disabled="!userData"
          :placeholder="$t('users.form.passwordPlaceholder')" type="password" show-password />
      </el-form-item>

      <el-form-item :label="$t('users.form.role')" prop="role">
        <FormSelect :options="roleOptions" :icon="User" :disabled="!userData" v-model="formData.role.id"
          :placeholder="$t('users.form.rolePlaceholder')" @change="changeUserRole" />
      </el-form-item>

      <el-form-item :label="$t('users.form.apps')">
        <FormSelect :options="translatedSystemOptions" :icon="IconApps" v-model="systemsAny"
          :disabled="disableEditSelections" @change="changeOrgType" :clearable="false" multiple :max-collapse-tags="3"
          :placeholder="$t('users.form.appsPlaceholder')" />
      </el-form-item>

      <el-form-item :label="$t('users.form.organization')" prop="organizations">
        <FormSelect :options="organizationOptions ? useGenerateOptions(organizationOptions) : []" :icon="OfficeBuilding"
          :disabled="disableEditSelections" v-model="formData.role.organizations" multiple
          :placeholder="$t('users.form.organizationPlaceholder')" />
      </el-form-item>
    </template>

    <div class="flex gap-4">
      <Button @click.prevent="$emit('cancel')" :title="$t('action.cancel')" type="reset" variant="outlined"
        class="h-10 grow"></Button>

      <Button @click.prevent="onSubmit" :title="$t('action.save')" :icon="IconCheck" type="submit" color="success"
        class="h-10 grow"></Button>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { IconCoinNumber, IconAlignDown, IconCheck, IconApps, IconUserProfile } from "#components";
import type { components } from "@/api/apiMethods.types";
import { useMainStore } from "@/store/main";
import type { UserCreateOrganizationFilters } from "@/types";
import { OfficeBuilding, User } from "@element-plus/icons-vue";
import type { ElForm } from "element-plus";

type AccountDto = components["schemas"]["AccountDto"];
type AccountRoleDto = components["schemas"]["AccountRoleDto"];
type CreateAccount = components["schemas"]["CreateAccountRequest"];
type FindByPinRequest = components["schemas"]["FindByPinRequest"];
type UpdateRoleRequest = components["schemas"]["UpdateRoleRequest"];
type SelectOption = {
  label: string
  value: number
}

const serachUserData = reactive<FindByPinRequest>({
  pin: ""
});

const emit = defineEmits(["cancel", "get"]);

const mainStore = useMainStore();

const props = defineProps<{
  isEdit?: boolean;
  editData?: AccountDto | null;
}>();

const formDataRef = ref<InstanceType<typeof ElForm>>();
const loading = ref<boolean>(false);
const error = ref<{ message: string } | null>(null);

const translatedSystemOptions = computed(() => mainStore.translatedSystemOptions);

const systemsAny = ref<number[]>([])
const computedSystemType = computed(() => systemsAny.value.reduce((acc, curr) => acc | curr, 0));

const disableEditSelections = computed(() => {
  if (props.isEdit) {
    return !Boolean(formData.role.id)
  }
  else {
    return !userData
  }
});

const organizationOptions = computed(() => {
  return organizations.value?.items ? organizations.value?.items : []
})

const filterParams = reactive<UserCreateOrganizationFilters>({
  systemsAny: systemsAny.value.reduce((acc, curr) => acc | curr, 0)
})

const { data: userData, execute: getUserData, error: userDataError } = await useApiService({ immediate: false }).Profile.ProfileController_getProfileByPin(serachUserData)

const { data: userRoles } = await useApiService().Role.listRoles();
const { data: organizations, execute: getOrganizations } = await useApiService({
  params: filterParams,
  immediate: false
}).Organizations.OrganizationsController_selectOrganizations();

const formDataRules = {
  login: [{ required: true, message: "", trigger: "blur" }],
  password: [{ required: true, message: "", trigger: "blur" }]
};

const roleOptions = computed(() => {
  if (props.isEdit && props.editData) {
    const roles = props.editData.roles?.map((item: AccountRoleDto) => {
      return {
        id: item.id,
        name: item.role.name
      }
    }) || []
    return props.editData.roles ? useGenerateRoleSelectOptions(roles) : []
  }
  return userRoles.value?.items ? useGenerateRoleSelectOptions(userRoles.value.items) : []
})

function onSubmit() {
  formDataRef.value?.validate((valid) => {
    if (valid) {
      submit();
    }
  });
}

const formData = reactive<CreateAccount>({
  login: "",
  password: "",
  role: {
    id: null as unknown as number,
    organizations: [],
    systems: 0
  },
});

const changeOrgType = () => {
  filterParams.systemsAny = computedSystemType.value;
  formData.role.systems = computedSystemType.value;
  formData.role.organizations = []

  getOrganizations();
}

const selectedRoleReletionId = computed(() => {
  if (props.isEdit && props.editData) {
    const selectedRole = props.editData.roles?.find(role => role.id === formData.role.id);
    return selectedRole ? selectedRole.role.id : null;
  }
  return null;
});

async function searchUser() {
  if (!serachUserData.pin) return;
  loading.value = true;

  await getUserData()

  if (!userDataError.value && userData.value) {
    formData.login = userData.value.pin;
  }

  loading.value = false;
}

const submit = async () => {
  loading.value = true;
  if (props.isEdit && props.editData?.id && selectedRoleReletionId.value) {
    const postData = {
      organizations: formData.role.organizations,
      systems: formData.role.systems,
    } as UpdateRoleRequest

    const { error: resError } = await useApiService().Account.AccountController_updateRole(props.editData?.id, selectedRoleReletionId.value, postData)
    error.value = resError.value;
  } else {
    const { error: resError } = await useApiService().Account.createAccount({
      ...formData, profileId: userData.value?.id
    })
    error.value = resError.value;
  }
  if (error.value?.message) {
    loading.value = false;
  } else {
    emit("get");
    emit("cancel");
  }
};

function expandSystemsToList(systems: number, options: SelectOption[]): number[] {
  return options
    .map(o => o.value)
    .filter(v => (systems & v) === v)
}

function changeUserRole() {
  const selectedRole = props.editData?.roles?.find(role => role.id === formData.role.id);
  if (selectedRole?.systems !== undefined && selectedRole?.id) {
    systemsAny.value = expandSystemsToList(selectedRole?.systems, translatedSystemOptions.value);
    formData.role.organizations = selectedRole?.organizations.map(org => org.id) || [];
    // @ts-ignore
    formData.role.roleId = selectedRole.role.id

    filterParams.systemsAny = systemsAny.value.reduce((acc, curr) => acc | curr, 0);
    getOrganizations();
  } else {
    systemsAny.value = [];
    formData.role.organizations = [];
  }

}

onMounted(() => {
  if (props.isEdit && props.editData && props.editData.profile) {
    formData.login = props.editData.login;
    formData.profileId = props.editData.profile.id;
    userData.value = props.editData.profile
  }
});
</script>
