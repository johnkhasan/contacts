<template>
  <div
    class="w-[260px] shrink-0 h-screen flex flex-col gap-6 p-4 border-r border-surface-30 bg-surface-50"
  >
    <div
      @click="$router.push('/')"
      class="cursor-pointer flex items-center gap-2"
    >
      <!-- Placeholder for logo -->
      <span class="font-bold text-xl">Nuxt Template</span>
    </div>

    <div class="flex flex-col gap-1 flex-1 overflow-y-auto">
      <template v-for="section in navItems">
        <template v-for="route in section.routes">
          <RouterLink
            :to="section.route + route.route"
            :class="[
              $route.path === route.route || $route.path === section.route
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-600 hover:bg-gray-100'
            ]"
            class="flex items-center gap-2 py-2.5 px-2 rounded-lg"
          >
            <component :is="route.icon" class="w-5 h-5" />
            <span class="text-sm font-medium">
              {{ route.title }}
            </span>
          </RouterLink>
        </template>
      </template>
    </div>

    <div
      class="border border-surface-30 rounded-xl py-2.5 px-2 bg-surface-40 flex items-center gap-2 cursor-pointer"
    >
      <div class="flex flex-col flex-1 text-sm">
        <span class="font-bold">User</span>
        <span class="text-xs text-gray-500">Role</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { navigation } from "@/navigation";

const { t } = useI18n();
const navData = navigation(t);
const navItems = computed(() => navData.dashboard || []);
</script>
