<template>
  <el-carousel trigger="click" class="!h-full" :autoplay="false">
    <div class="absolute flex flex-col left-20 right-20 top-[55px] !z-[9999] text-center">
      <span class="font-bold text-[#0A0F1A] dark:text-white text-[30px] !z-[9999]">{{ $t('auth.slide.title') }}</span>
      <span class="text-primary-300 !z-[9999]">{{ $t('auth.slide.description') }}</span>
    </div>
  </el-carousel>
</template>

<script setup lang="ts">
</script>

<style>
.el-carousel__container {
  @apply !h-full !rounded-lg !overflow-hidden;
}
</style>
