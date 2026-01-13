<template>
  <div class="mt-auto pt-6">
    <h2 class="text-lg font-bold mb-4 text-gray-900">Tezkor aloqa</h2>

    <div class="flex flex-col gap-6">
      <AppSegmentedTabs
        v-model="activeTab"
        :options="tabs"
        class="w-fit"
        color="blue"
      />

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <div
          v-for="(contact, index) in activeContacts"
          :key="index"
          class="flex flex-col items-center gap-2"
        >
          <div class="flex items-center justify-center gap-3 bg-blue-100 rounded-lg py-3 px-4 w-full h-[64px]">
             <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0">
               <el-icon><PhoneFilled /></el-icon>
             </div>
             <span class="text-2xl font-bold text-gray-900">{{ contact.phone }}</span>
          </div>
          <p class="text-xs text-gray-500 text-center leading-tight max-w-[200px]">
            {{ contact.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { PhoneFilled, Plus, Sunny } from '@element-plus/icons-vue'
import AppSegmentedTabs from '@/components/ui/AppSegmentedTabs.vue'

const activeTab = ref('fire')

const tabs = [
  { label: "Yong'in xavfsizligi", value: 'fire', icon: Sunny },
  { label: 'Tez tibbiy yordam', value: 'ambulance', icon: Plus }
]

const contacts = {
  fire: [
    { phone: '43-675', description: 'Shahar' },
    { phone: '43-675', description: "RJU-Toshkent yo'nalishi bo'yicha o't o'chirish poyezdi" },
    { phone: '43-686', description: "RJU-Toshkent yo'nalishi bo'yicha o't o'chirish poyezdi" },
    { phone: '43-677', description: 'Tiklovchi poyezdlar (NVP-3291, To\'qimachi stansiyasi)' },
    { phone: '43-684', description: 'Navbatchi (VP-3291-To\'qimachi stansiyasi)' }
  ],
  ambulance: [
    { phone: '103', description: 'Tez yordam markazi' },
    { phone: '43-000', description: 'Temir yo\'l shifoxonasi' },
    { phone: '43-001', description: 'Markaziy poliklinika' },
    { phone: '43-002', description: 'Navbatchi shifokor' },
    { phone: '43-003', description: 'Dispetcher' }
  ]
}

const activeContacts = computed(() => contacts[activeTab.value as keyof typeof contacts])
</script>
