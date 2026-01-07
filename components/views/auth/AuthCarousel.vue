<template>
  <el-carousel trigger="click" class="!h-full" :autoplay="false">
    <img class="absolute -top-[37px] -left-4 z-50" :src="AuthTopLeft" :alt="AuthTopLeft" />
    <img class="absolute -top-[63px] -right-12 z-50" :src="AuthTopRight" :alt="AuthTopRight" />
    <img class="absolute -bottom-[37px] -left-[63px] z-50" :src="AuthBottomLeft" :alt="AuthBottomLeft" />
    <img class="absolute -bottom-[19px] right-0 z-50" :src="AuthBottomRight" :alt="AuthBottomRight" />

    <div class="absolute flex flex-col left-20 right-20 top-[55px] !z-[9999] text-center">
      <span class="font-bold text-[#0A0F1A] dark:text-white text-[30px] !z-[9999]">{{ $t('auth.slide.title') }}</span>
      <span class="text-primary-300 !z-[9999]">{{ $t('auth.slide.description') }}</span>
    </div>

    <el-carousel-item v-for="(item, index) in carouselList" :key="index"
      class="!h-full border border-surface-30 bg-surface-20">
      <div
        class="bg-radial-auth dark:bg-dark-radial-auth !overflow-hidden w-full h-full flex flex-col gap-[22px] relative !z-[9999]">
        <div class="absolute flex items-center justify-center w-full h-full px-10">
          <img :src="item.image" :alt="item.image" class="m-auto w-full my-auto object-cover" />
        </div>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script setup lang="ts">
import AuthTopLeft from "~/assets/images/auth-top-left.png"
import AuthTopRight from "~/assets/images/auth-top-right.png"
import AuthBottomLeft from "~/assets/images/auth-bottom-left.png"
import AuthBottomRight from "~/assets/images/auth-bottom-right.png"

import AuthAiCarousel from "~/assets/images/auth-AI-carousel.png"
import AuthAiPereezd from "~/assets/images/auth-AI-pereezd.png"

const carouselList = ref([
  {
    image: AuthAiCarousel
  },
  {
    image: AuthAiPereezd
  }
])

</script>

<style>
.el-carousel__container {
  @apply !h-full !rounded-lg !overflow-hidden;
}
</style>
