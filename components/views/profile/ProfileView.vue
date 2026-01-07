<template>
  <div class="bg-surface-50 border border-surface-30 rounded-xl flex items-start justify-between p-6">
    <div class="flex gap-6 items-center">
      <div>
        <img :src="userInfo?.accountRole.account.profile?.photo" :alt="userInfo?.accountRole.account.profile?.photo"
          class="w-[120px] h-[120px] rounded-full border border-gray-300 object-cover" />
      </div>

      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <span class="text-gray-800 dark:text-white font-semibold text-xl">
            {{ userInfo?.accountRole.account.profile?.lastName }}
            {{ userInfo?.accountRole.account.profile?.firstName }}
            {{ userInfo?.accountRole.account.profile?.middleName }}
          </span>
          <div class="flex gap-1">
            <span class="text-gray-600 dark:text-gray-400">{{ $t('common.login') }}:</span>
            <span class="font-semibold text-[#2563EB]">{{ userInfo?.accountRole.account.login }}</span>
            <IconCopyLeft class="text-[#2563EB] ml-2 cursor-pointer"
              @click="copyToClipboard(userInfo?.accountRole.account.login)" />
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <span class="text-gray-800 dark:text-white font-semibold text-xl max-w-[600px]">
            {{ userInfo?.accountRole.account.profile?.postName }}
          </span>
          <div class="flex gap-1">
            <span class="text-gray-600 dark:text-gray-400">{{ $t('users.form.role') }}:</span>
            <span class="font-semibold text-[#2563EB]">{{ userInfo?.accountRole.role.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <button class="border border-[#2563EB] flex gap-2.5 items-center py-2 px-3 rounded-md h-10">
        <IconLock class="w-5 h-5 text-[#2563EB]" />
        <span class="text-[#2563EB] font-medium text-sm">
          {{ $t('users.changePassword') }}
        </span>
      </button>
    </div>
  </div>
  <!-- {{ userInfo }} -->
</template>

<script setup lang="ts">
import { usePermissionStore } from '@/store/permissionsStore';
import { ElMessage } from 'element-plus';

const permissionStore = usePermissionStore();
const { userInfo } = storeToRefs(permissionStore);
const { t } = useI18n();

const copyToClipboard = async (text?: string) => {
  if (!text) return
  try {
    await navigator.clipboard.writeText(text);
    ElMessage.success(t("common.copied"));
  } catch (e) {
    ElMessage.error(t("common.copyFailed"));
  }
};

const textToCopy = "some value you want to copy";

</script>