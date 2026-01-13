<template>
  <div class="flex dark:bg-surface-50 max-w-[2780px] mx-auto shadow-md" v-loading="fetchStatus === 'pending'">
    <AppSidebar />
    <div class="w-screen h-screen py-4 pr-4 max-w-[calc(100vw-260px)]">
      <div
        class="w-full h-full flex flex-col gap-6 p-4 rounded-2xl overflow-y-auto bg-surface-40 border border-surface-30">
        <AppNavbar />

        <NuxtPage />

        <AppFooter />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePermissionStore } from '@/store/permissionsStore'

const permissionStore = usePermissionStore()
const { setUserInfo, setPermissions } = permissionStore

const { data: userData, execute: fetchUserData, status: fetchStatus } =
  useApiService({ immediate: false }).Account.AccountController_getMe()

onMounted(async () => {
  await fetchUserData()
  if (userData.value) {
    setUserInfo(userData.value)
    setPermissions(userData.value.accountRole?.role?.permissions || [])
  }
})
</script>
