<template>
  <div class="w-[260px] shrink-0 h-screen flex flex-col gap-6 p-4">
    <!-- <button class="bg-double-grad py-1 pr-1 pl-3 rounded-full flex gap-1.5">
      <span class="w-10">
        DAS UTY
      </span>
    </button> -->
    <IconSideLogo @click="$router.push('/')" class="cursor-pointer" />
    <!-- <img :src="logo" alt="Logo" class="w-32 h-auto mx-auto mb-4" /> -->
    <!-- <button class="h-11 flex items-center gap-2 rounded-lg py-1.5 px-2 border border-surface-40"
      @click="$router.push('/')">
      <div
        class="h-8 flex gap-1.5 items-center justify-center py-1 px-2.5 rounded-md bg-[#040B4B] border border-[#3A3F6E]">
        <span class="font-semibold text-xl text-white">
          {{ $t("ai.title") }}
        </span>

        <span class="w-2 h-2 rounded-full bg-[#EA2727]"></span>
      </div>

      <span class="text-xl text-primary-color uppercase">
        {{ $t("camera.title") }}
      </span>
    </button> -->

    <el-dropdown trigger="click" class="w-full">
      <button
        class="el-dropdown-link h-[58px] flex w-full items-center justify-between gap-2 py-2.5 px-2 rounded-lg bg-surface-40 border border-surface-30">
        <div class="flex items-center gap-2">
          <div :class="[
            'px-1.5 py-1 rounded-md border',
            selectedPlatform === 'scales' && 'bg-[#893DF3] border-[#C499FF]',
            selectedPlatform === 'camera' && 'bg-[#3D89F3] border-[#99C4FF]',
            selectedPlatform === 'helmet' && 'bg-[#38CDA8] border-[#5EF2CD]',
            selectedPlatform === 'app' && 'bg-[#F3A33D] border-[#FFC499]',
            selectedPlatform === 'chat' && 'bg-[#42C2FF] border-[#99E1FF]',
          ]">
            <icon-platform class="w-6 h-6 text-white" />
          </div>

          <div class="flex flex-col gap-1 items-start">
            <div class="text-xs leading-3 text-primary-100 dark:text-primary-500">
              {{ $t("platform.title") }}
            </div>

            <div class="text-sm leading-4 font-semibold text-primary-color">
              {{ selectedPlatform && $t(`platform.${selectedPlatform}`) }}
            </div>
          </div>
        </div>

        <IconChevronDown class="text-primary-color" />
      </button>
      <template #dropdown>
        <el-dropdown-menu class="!w-full" width="200px">
          <el-dropdown-item
            class="!max-w-[228px] !mx-2 !my-1 !px-2 !py-2.5 border border-transparent hover:bg-surface-40 hover:border hover:border-surface-30 hover:rounded-lg"
            :class="selectedPlatform === item.key ? 'bg-surface-40 border border-surface-30 rounded-lg' : ''"
            v-for="(item, index) in allowedPlatformRoutes" :key="index" @click="($router.push(item.route))">
            <button
              class="el-dropdown-link !max-w-[228px] flex items-center justify-between gap-2 cursor-pointer rounded-lg">
              <div class="flex items-center gap-2">
                <div class="flex flex-col gap-1">
                  <div class="text-sm w-[194px] leading-4 font-semibold flex items-center justify-start gap-2">
                    <div :class="[
                      'px-1.5 py-1 rounded-md border',
                      item.key === 'scales' && 'bg-[#893DF3] border-[#C499FF]',
                      item.key === 'camera' && 'bg-[#3D89F3] border-[#99C4FF]',
                      item.key === 'helmet' && 'bg-[#38CDA8] border-[#5EF2CD]',
                      item.key === 'app' && 'bg-[#F3A33D] border-[#FFC499]',
                      item.key === 'chat' && 'bg-[#42C2FF] border-[#99E1FF]',
                    ]">
                      <icon-platform class="w-6 h-6 text-white" />
                    </div>
                    <div class="flex items-center flex-1">
                      <span class="text-sm font-medium">
                        {{ $t(item.title) }}
                      </span>
                    </div>
                    <template v-if="selectedPlatform === item.key">
                      <icon-check class="w-5 h-5 text-primary-color" />
                    </template>
                  </div>
                </div>
              </div>
            </button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <div v-if="navItem" class="flex flex-col gap-1 flex-1 overflow-y-auto">
      <template v-for="route in navItem.routes">
        <RouterLink :to="navItem.route + route.route" v-can="route.permission" :class="[
          $route.path.includes(route.route)
            ? 'bg-surface-40 border-surface-30 text-primary-color'
            : 'border-transparent text-primary-100 dark:text-primary-500'
        ]" class="flex items-center gap-2 py-2.5 px-2 rounded-lg hover:bg-surface-40 border">
          <component :is="route.icon" class="w-5 h-5 text-primary-color" />

          <span class="text-sm font-medium">
            {{ route.title }}
          </span>
        </RouterLink>
      </template>

      <template v-if="selectedPlatform === 'chat'">
        <div class="mt-3 text-xs text-primary-100 dark:text-primary-500 px-2">
          {{ $t('chat.yourQuestions') || 'Chat sessions' }}
        </div>

        <div class="flex flex-col gap-1 mt-1">
          <div v-if="chatLoading" class="text-xs text-primary-100 px-2">
            {{ $t('common.loading') || 'Loading...' }}
          </div>

          <RouterLink v-for="session in chatSessions" :key="session.sessionId" :to="`/chat/${session.sessionId}`"
            class="flex items-center gap-2 py-2.5 px-2 rounded-lg hover:bg-surface-40 border" :class="$route.params.sessionId === String(session.sessionId)
              ? 'bg-surface-40 border-surface-30 text-primary-color'
              : 'border-transparent text-primary-100 dark:text-primary-500'">
            <span class="text-sm font-medium truncate">
              {{ session.lastMessage.content }}
            </span>
          </RouterLink>
        </div>
      </template>
    </div>

    <div class="border border-surface-30 rounded-xl py-2.5 px-2 bg-surface-40 flex items-center gap-2 cursor-pointer"
      @click="$router.push('/profile')">
      <div>
        <IconProfile class="w-6 h-6" />
      </div>
      <div class="flex flex-col flex-1 text-sm">
        <span class="font-bold">{{ userInfo?.accountRole.account.profile?.firstName }} {{
          userInfo?.accountRole.account.profile?.lastName
          }}</span>
        <span>
          {{ userInfo?.accountRole.role.name }}
        </span>
      </div>
      <div>
        <IconChevronRight class="text-primary-color w-5 h-5" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { platformRoutes } from "@/constants";
import { navigation } from "@/navigation";
import { SystemType } from "@/store/main";
import { usePermissionStore } from "@/store/permissionsStore";
import { useChatStore } from "@/store/chatStore";
import logo from "@/assets/images/logo.png"

const { t } = useI18n();
const router = useRouter();

const permissionStore = usePermissionStore();

const userInfo = computed(() => permissionStore.userInfo)
const systems = computed<number>(() => permissionStore.userInfo?.accountRole.systems ?? 0)

const hasPermission = (required: SystemType) =>
  (systems.value & required) === required;

const allowedPlatformRoutes = computed(() => {
  return platformRoutes.filter(r => hasPermission(r.permission))
});

const selectedPlatform = computed<"scales" | "camera" | "helmet" | "app" | "chat">(() => {
  const segment = router.currentRoute.value.path.split("/")[1]
  if (segment === "profile" || segment === "") {
    return allowedPlatformRoutes.value[0]?.key;
  } else {
    return segment as "scales" | "camera" | "helmet" | "app" | "chat"
  }
});

const navItem = computed(() => {
  return navigation(t)[selectedPlatform.value]?.find(nav => nav.isActive);
});

const chatStore = useChatStore();
const chatSessions = computed(() => chatStore.sessions);
const chatLoading = computed(() => chatStore.loading);

watch(
  selectedPlatform,
  (val) => {
    if (val === "chat") {
      if (!chatSessions.value.length) {
        chatStore.fetchSessions();
      }
    }
  },
  { immediate: true }
);
</script>
