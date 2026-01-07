<template>
  <div class="flex-1">
    <div class="grid grid-cols-2 gap-5">
      <template v-for="item in cards" :key="item.id">
        <div @click="goToAI(item)" v-if="hasPermission(item.permission)"
          class="flex gap-5 border p-6 rounded-md border-surface-20 bg-surface-50 items-center cursor-pointer hover:shadow-card transition-all">
          <div>
            <img :src="item.img" class="w-40 h-40 rounded-md border border-surface-20" />
          </div>

          <div class="flex flex-col gap-5 justify-center items-center flex-1">
            <div class="flex gap-2 items-center justify-center">
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
                <span class="text-xl font-bold">
                  {{ item.title }}
                </span>
              </div>
            </div>

            <div class="text-center">
              <span class="text-primary-100 dark:text-primary-500 text-sm">
                {{ item.describetion }}
              </span>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import AiScale from '@/assets/images/ai-scale.png';
import AiWagonVision from '@/assets/images/ai-wagon-vision.png';
import AiHelmetVision from '@/assets/images/ai-helmet-vision.png';
import AiChatBot from '@/assets/images/ai-chat-bot.png';
import { platformRoutes } from "@/constants";
import { SystemType } from "@/store/main";
import { usePermissionStore } from "@/store/permissionsStore";
import { useHeadTitleStore } from '@/store/titleStore';

const { t } = useI18n();

const { setHeadTitle } = useHeadTitleStore();
setHeadTitle('platform.aiAssistant');
useHead(() => ({
  title: t('pageTitles.indexPage'),
  meta: [
    {
      name: 'description',
      content: t('pageDescriptions.scales.statisticsPageDescription'),
    },
  ],
}))
// To’raqo’rg’on
// 
type card = {
  id: number;
  title: string;
  describetion: string;
  key: "scales" | "camera" | "helmet" | "app" | "chat";
  img: string;
  permission: SystemType;
};

const cards = computed<card[]>(() => [
  {
    id: 1,
    title: t("platform.scales"),
    describetion: t("platform.descriptionsList.scales"),
    key: "scales",
    img: AiScale,
    permission: SystemType.Scale
  },
  {
    id: 2,
    title: t("platform.camera"),
    describetion: t("platform.descriptionsList.camera"),
    key: "camera",
    img: AiWagonVision,
    permission: SystemType.Vision
  },
  {
    id: 3,
    title: t("platform.helmet"),
    describetion: t("platform.descriptionsList.helmet"),
    key: "helmet",
    img: AiHelmetVision,
    permission: SystemType.Helmet
  },
  {
    id: 5,
    title: t("platform.chat"),
    describetion: t("platform.descriptionsList.chat"),
    key: "chat",
    img: AiChatBot,
    permission: SystemType.Assistant
  },
])

function goToAI(item: card) {
  const route = platformRoutes.find(r => r.key === item.key);
  if (route) {
    router.push(route.route);
  }
}

const router = useRouter();

const permissionStore = usePermissionStore();

const systems = computed<number>(() => permissionStore.userInfo?.accountRole.systems ?? 0)

const hasPermission = (required: SystemType) =>
  (systems.value & required) === required;

</script>