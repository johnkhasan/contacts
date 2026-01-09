<template>
  <div class="flex w-full h-full p-4 bg-surface-40 rounded-2xl border border-surface-30 shadow-auth-login font-geist">
    <div class="flex flex-1 items-center justify-center px-10">
      <div
        class="flex w-full flex-col gap-8 bg-surface-40 rounded-xl border border-surface-20 p-6 shadow-auth-login max-w-[600px]"
        v-loading="loading">
        <div class="flex justify-end gap-4">
          <AppThemeSelect />
          <AppLangSelect />
        </div>

        <div class="flex flex-col gap-8">
          <div class="flex flex-col gap-1">
            <div>
              <span class="text-primary-color font-bold text-[30px]">{{ $t('auth.login') }}</span>
            </div>
            <div>
              <span class="text-primary-300">{{ $t('auth.description') }}</span>
            </div>
          </div>

          <el-form :rules="formRules" ref="formRef" :model="form" v-if="!isUserSelectsRole">
            <el-form-item :label="$t('auth.username')" label-position="top" prop="login">
              <FormInput v-model="form.login" :prefix-icon="IconUserProfile" class="w-full"
                :placeholder="$t('auth.username')" />
            </el-form-item>

            <el-form-item :label="$t('auth.password')" label-position="top" prop="password">
              <FormInput v-model="form.password" :prefix-icon="IconLockOpen" class="w-full"
                :placeholder="$t('auth.password')" type="password" show-password />
            </el-form-item>

            <button @click.prevent="submit"
              class="w-full py-2 px-4 rounded-lg mt-[22px] h-10 bg-info-100 text-white font-bold text-sm">
              {{ $t('auth.login') }}
            </button>
          </el-form>

          <!-- <el-form :rules="selectRoleFormRules" ref="selectRoleFormRef" :model="selectRoleFormData"
            v-else-if="isUserSelectsRole && !isUserHaveOneRole">
            <el-form-item :label="$t('auth.username')" label-position="top" prop="accountRoleId">
              <el-select v-model="selectRoleFormData.accountRoleId" :placeholder="$t('auth.selectRole')" class="w-full">
                <el-option v-for="role in userRolesList" :key="role.id" :label="role.role.name" :value="role.id" />
              </el-select>
            </el-form-item>

            <button @click.prevent="confirmRole"
              class="w-full py-2 px-4 rounded-lg mt-[22px] h-10 bg-info-100 text-white font-bold text-sm">
              {{ $t('auth.login') }}
            </button>
          </el-form> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { IconUserProfile, IconLockOpen } from "#components";

import Cookies from "js-cookie";

import type { LoginForm, selectRoleForm } from "@/types";

import { ElNotification, type ElForm, type FormRules } from "element-plus";

import type { components } from "@/api/apiMethods.types"

import { SystemType } from "@/store/main";

import { platformRoutes } from "@/constants";

import { usePermissionStore } from '@/store/permissionsStore'



// AccountRoleDto

type AccountRoleDto = components['schemas']['AccountRoleDto']



const router = useRouter();

const permissionStore = usePermissionStore()

const { setUserInfo, setPermissions } = permissionStore



const formRef = ref<InstanceType<typeof ElForm> | null>(null);

const selectRoleFormRef = ref<InstanceType<typeof ElForm> | null>(null);



const isUserSelectsRole = ref<boolean>(false);

const isUserHaveOneRole = ref<boolean>(false);

const loading = ref<boolean>(false);

const formRules: FormRules = {

  login: [

    { required: true, message: "", trigger: "blur" }

  ],

  password: [

    { required: true, message: "", trigger: "blur" }

  ]

};



const selectRoleFormRules: FormRules = {

  accountRoleId: [

    { required: true, message: "", trigger: "change" }

  ],

  tempToken: [

    { required: true, message: "", trigger: "blur" }

  ]

};

const userRolesList = ref<AccountRoleDto[]>([])



const form = reactive<LoginForm>({

  login: "",

  password: ""

});



const selectRoleFormData = reactive<selectRoleForm>({

  accountRoleId: null as unknown as number,

  tempToken: ""

});



const submit = async () => {

  if (!formRef.value) return;



  await formRef.value.validate();

  loading.value = true;

  const { data: anyData, error } = await useApiService().Auth.login(form)



  userRolesList.value = anyData.value?.accountRoles || [];

  selectRoleFormData.tempToken = anyData.value?.tempToken || "";



  if (error.value) {

    isUserSelectsRole.value = false

    ElNotification.error({

      title: 'Error',

      message: error.value.data.message,

    });

  } else {

    if (anyData.value?.accountRoles.length === 1) {

      isUserHaveOneRole.value = true

      isUserSelectsRole.value = false



      const { data: tokens } = await useApiService().Auth.selectRole({

        accountRoleId: anyData.value?.accountRoles[0].id,

        tempToken: anyData.value?.tempToken

      })



      if (tokens.value?.access && tokens.value?.refresh) {

        Cookies.set("access_token", tokens.value?.access, { expires: 7 });

        Cookies.set("refresh_token", tokens.value?.refresh, { expires: 7 });

        Cookies.set("systems", String(tokens.value?.systems), { expires: 7 });



        const { data: userData } = await useApiService({}).Account.AccountController_getMe()

        if (userData.value) {

          setUserInfo(userData.value)

          setPermissions(userData.value.accountRole?.role?.permissions || [])

        }

        router.push(getFirstAllowedRoute(tokens.value.systems));

      }

    } else {

      isUserSelectsRole.value = true

      isUserHaveOneRole.value = false

    }

  }

  loading.value = false;

};



const confirmRole = async () => {

  if (!selectRoleFormRef.value) return;



  try {

    await selectRoleFormRef.value.validate();



    const { data: tokens, error } = await useApiService().Auth.selectRole({

      accountRoleId: selectRoleFormData.accountRoleId,

      tempToken: selectRoleFormData.tempToken

    })

    if (tokens.value?.access && tokens.value?.refresh) {

      Cookies.set("access_token", tokens.value?.access, { expires: 7 });

      Cookies.set("refresh_token", tokens.value?.refresh, { expires: 7 });

      Cookies.set("systems", String(tokens.value?.systems), { expires: 7 });



      const { data: userData } = await useApiService({}).Account.AccountController_getMe()

      if (userData.value) {

        setUserInfo(userData.value)

        setPermissions(userData.value.accountRole?.role?.permissions || [])

      }

      router.push(getFirstAllowedRoute(tokens.value.systems));

    }

  } catch (error) {



  }

};



const hasPermission = (systems: number, required: SystemType) =>

  (systems & required) === required;



const getFirstAllowedRoute = (systems: number) => {

  const route = platformRoutes.find(r =>

    hasPermission(systems, r.permission)

  );

  return route?.route ?? "/";

};

</script>

<style>
.el-input__wrapper,
.el-select__wrapper {
  @apply !py-1.5 !px-2 !flex h-10 !bg-surface-50
}

.el-input__prefix-inner {
  @apply !border-r border-surface-20 !flex !justify-center !items-center
}

.el-input__icon {
  @apply !w-5 !h-5 !text-primary-color !mr-2
}

.el-icon svg {
  @apply w-5 h-5
}

.el-input__inner {
  @apply !grow !text-sm !bg-transparent !outline-none placeholder:text-primary-500 text-primary-color
}
</style>