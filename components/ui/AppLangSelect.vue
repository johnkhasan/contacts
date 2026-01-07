<template>
  <el-dropdown type="primary" trigger="click">
    <div class="flex items-center gap-1.5 text-primary-color">
      <img :src="flags[lang]?.flag" :alt="flags[lang]?.code" class="w-5 h-5" />

      <span class="uppercase">
        {{ flags[lang]?.code }}
      </span>

      <IconArrowDown class="w-5 h-5" />
    </div>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="(item, key) in flags" :key="key" @click="setLang(item.code)">
          <div class="flex items-center gap-2">
            <img :src="item.flag" :alt="flags[lang]?.code" class="w-5 h-5" />

            <span>{{ item.name }}</span>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import flagUzbek from "@/assets/images/flag/flagUzbekistan.png";
import flagRussia from "@/assets/images/flag/flagRussia.png";
import flagEngland from "@/assets/images/flag/flagEngland.png";
import { LangCodeEnum } from "@/types/common/translation";

interface Flag {
  name: string;
  flag: string;
  code: LangCodeEnum;
}

const { locale, setLocale } = useI18n();

const lang = computed(() => locale.value as LangCodeEnum);

const flags: Record<LangCodeEnum, Flag> = {
  [LangCodeEnum.UZ]: {
    name: "O'zbekcha",
    flag: flagUzbek,
    code: LangCodeEnum.UZ
  },
  [LangCodeEnum.KRIL]: {
    name: "Криллча",
    flag: flagUzbek,
    code: LangCodeEnum.KRIL
  },
  [LangCodeEnum.RU]: {
    name: "Русский",
    flag: flagRussia,
    code: LangCodeEnum.RU
  },
  [LangCodeEnum.EN]: {
    name: "English",
    flag: flagEngland,
    code: LangCodeEnum.EN
  }
};

const setLang = async (code: LangCodeEnum) => {
  setLocale(code);
  await setLocale(code)
  if (process.client) {
    localStorage.setItem('lang', code)
  }
};
</script>
