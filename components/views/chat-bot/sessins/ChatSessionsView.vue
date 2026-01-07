<template>
  <div class="flex flex-col flex-1 items-center justify-center relative">
    <div class="flex flex-col gap-3 w-full px-4 py-6 overflow-y-auto flex-1">
      <div v-if="!messages.length" class="flex flex-col gap-2 text-center mt-10">
        <div class="font-semibold text-[40px]">
          <span>
            Salom
            <span
              class="bg-clip-text text-transparent bg-[linear-gradient(90deg,#0A0F1A_35.07%,#5322AD_53.44%,#8A1DA6_70.6%,#129134_87.16%)]">
              Hikmatullo
            </span>
          </span>
        </div>
        <div>
          <span class="text-[#323954] dark:text-[#8A8A8A]">
            Bugun sizga qanday yordam bera olaman?
          </span>
        </div>
      </div>

      <div v-else class="flex flex-col gap-3">
        <div v-for="msg in messages" :key="msg.id" class="flex"
          :class="msg.role === 'user' ? 'justify-end' : 'justify-start'">
          <div class="max-w-[70%] rounded-2xl px-4 py-2 text-sm" :class="msg.role === 'user'
            ? 'bg-surface-40 border-4 border-surface-50 rounded-tl-[20px] rounded-bl-2xl rounded-tr-lg rounded-br-3xl'
            : 'bg-surface-40 border border-surface-30 text-primary-color'">
            <div v-if="msg.role === 'assistant'" class="prose prose-sm max-w-none" v-html="renderMarkdown(msg.text)">
            </div>

            <p v-else class="whitespace-pre-line">
              {{ msg.text }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div
      class="sticky w-full bg-surface-50 border border-surface-30 bottom-0 rounded-[68px] shadow-card-shadow p-2 flex gap-2"
      v-loading="loading">
      <div class="rounded-full p-[14px] bg-surface-40 border border-surface-30 cursor-pointer">
        <IconChevron class="w-5 h-5 text-primary-color" />
      </div>

      <div
        class="flex flex-1 justify-between items-center bg-surface-40 border border-surface-30 px-4 py-[14px] rounded-full">
        <input class="bg-transparent border-none outline-none w-full placeholder:text-sm text-sm"
          :placeholder="$t('common.askQuestion')" v-model="message.message" @keyup.enter="sendMessage" />
        <IconMicro class="w-5 h-5 text-primary-color" />
      </div>

      <div class="rounded-full p-[14px] bg-surface-40 border border-surface-30 cursor-pointer">
        <IconWave class="w-5 h-5 text-primary-color" @click="sendMessage" />
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import type { components } from '@/api/apiMethods.types';

type SendMessageRequest = components['schemas']['SendMessageRequest'];

type ChatMessage = {
  id: string;
  role: string;
  text: string;
};

const props = defineProps<{
  sessionId?: string;
}>();
const loading = ref<boolean>(false);

const messages = ref<ChatMessage[]>([]);

const message = reactive<SendMessageRequest>({
  sessionId: props.sessionId,
  message: ''
});

const { $md } = useNuxtApp();

const renderMarkdown = (text: string) => {
  return $md(text);
};


const { data, status, execute } =
  useApiService({ immediate: false }).ChatBot.sendMessageToChatBot(message);

const sendMessage = async () => {
  if (!message.message.trim()) return;
  loading.value = true;
  const userText = message.message;
  messages.value.push({
    id: crypto.randomUUID?.() ?? String(Date.now()),
    role: 'user',
    text: userText
  });

  try {
    await execute();
    message.message = '';

    if (data.value) {
      messages.value.push({
        id: crypto.randomUUID?.() ?? String(Date.now() + 1),
        role: 'assistant',
        text: data.value.answer
      });
    }
  } catch (e) {
    console.error('Failed to send message', e);
    messages.value.push({
      id: crypto.randomUUID?.() ?? String(Date.now() + 2),
      role: 'assistant',
      text: 'Xatolik yuz berdi, keyinroq urinib ko‘ring.'
    });
  } finally {
    message.message = '';
    loading.value = false;
  }
};

onMounted(async () => {
  if (props.sessionId) {
    loading.value = true;
    const { data } = await useApiService().ChatBot.getChatBotSessionMessages(props.sessionId);
    messages.value = data.value?.messages.map(msg => ({
      id: msg.id,
      role: msg.role,
      text: msg.content
    })) || [];
    loading.value = false;
  }
});
</script>
