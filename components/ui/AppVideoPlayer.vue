<template>
  <div class="cvp" @mousemove="revealUI" @mouseleave="hideUI">
    <video
      ref="videoRef"
      class="cvp-video"
      :src="videoUrl"
      playsinline
      preload="metadata"
      @loadedmetadata="onLoadedMeta"
      @timeupdate="onTimeUpdate"
      @play="isPlaying = true"
      @pause="isPlaying = false"
      @click="togglePlay"
      autoplay
    />

    <button
      class="cvp-center"
      type="button"
      @click="togglePlay"
      aria-label="Play/Pause"
    >
      <span class="cvp-center-icon">{{ isPlaying ? "❚❚" : "▶" }}</span>
    </button>

    <div class="cvp-controls" :data-visible="uiVisible">
      <input
        class="cvp-progress"
        type="range"
        min="0"
        :max="duration || 0"
        step="0.1"
        :value="currentTime"
        @input="onSeek"
        aria-label="Seek"
      />

      <div class="cvp-row">
        <button class="cvp-btn" type="button" @click="togglePlay">
          {{ isPlaying ? $t("common.pause") : $t("common.play") }}
        </button>

        <p class="cvp-time">
          {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
        </p>

        <div class="cvp-spacer"></div>

        <div class="cvp-speed">
          <button
            class="cvp-btn"
            type="button"
            @click="toggleSpeedMenu"
            aria-label="Playback speed"
          >
            {{ speedLabel }}
          </button>

          <div v-if="isSpeedOpen" class="cvp-speed-menu">
            <button
              v-for="s in speedOptions"
              :key="s"
              class="cvp-speed-item"
              type="button"
              :data-active="playbackRate === s"
              @click="setSpeed(s)"
            >
              {{ s }}x
            </button>
          </div>
        </div>

        <!-- <button class="cvp-btn" type="button" @click="toggleMute" aria-label="Mute">
          {{ isMuted ? "Muted" : "Sound" }}
        </button>

        <input class="cvp-volume" type="range" min="0" max="1" step="0.01" :value="volume" @input="onVolume"
          aria-label="Volume" /> -->

        <button class="cvp-btn" type="button" @click="toggleFullscreen">
          <el-icon>
            <FullScreen />
          </el-icon>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FullScreen } from "@element-plus/icons-vue";

const props = defineProps({
  videoUrl: { type: String, required: true },
  speedOptions: {
    type: Array as () => number[],
    default: () => [0.5, 0.75, 1, 1.25, 1.5, 2, 4]
  },
  defaultSpeed: { type: Number, default: 1 }
});

const videoRef = ref<HTMLVideoElement | null>(null);

const isPlaying = ref<boolean>(true);
const duration = ref<number>(0);
const currentTime = ref<number>(0);

const volume = ref<number>(0.9);
const isMuted = ref<boolean>(false);

const uiVisible = ref<boolean>(true);
let uiTimer: any = null;

const playbackRate = ref<number>(props.defaultSpeed);
const isSpeedOpen = ref<boolean>(false);

const speedLabel = computed<string>(() => `${playbackRate.value}x`);

const onLoadedMeta = () => {
  if (!videoRef.value) return;
  duration.value = videoRef.value.duration || 0;
  videoRef.value.volume = volume.value;
  videoRef.value.playbackRate = playbackRate.value;
};

const onTimeUpdate = () => {
  if (!videoRef.value) return;
  currentTime.value = videoRef.value.currentTime || 0;
};

const togglePlay = async () => {
  const v = videoRef.value;
  if (!v) return;
  if (v.paused) await v.play();
  else v.pause();
};

const onSeek = (e: Event) => {
  const v = videoRef.value;
  if (!v) return;
  v.currentTime = Number((e.target as HTMLInputElement).value);
};

// const onVolume = (e) => {
//   const v = videoRef.value
//   volume.value = Number(e.target.value)
//   if (v) v.volume = volume.value
//   isMuted.value = volume.value === 0
//   if (v) v.muted = isMuted.value
// }

// const toggleMute = () => {
//   const v = videoRef.value
//   if (!v) return
//   isMuted.value = !isMuted.value
//   v.muted = isMuted.value
// }

const toggleFullscreen = async () => {
  const wrap = videoRef.value?.parentElement;
  if (!wrap) return;
  if (!document.fullscreenElement) await wrap.requestFullscreen?.();
  else await document.exitFullscreen?.();
};

const toggleSpeedMenu = () => {
  isSpeedOpen.value = !isSpeedOpen.value;
};

const setSpeed = (s: number) => {
  playbackRate.value = s;
  if (videoRef.value) videoRef.value.playbackRate = s;
  isSpeedOpen.value = false;
};

const formatTime = (t: number) => {
  if (!t || Number.isNaN(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
};

const revealUI = () => {
  uiVisible.value = true;
  clearTimeout(uiTimer);
  uiTimer = setTimeout(() => (uiVisible.value = false), 2000);
};

const hideUI = () => {
  clearTimeout(uiTimer);
  uiVisible.value = false;
  isSpeedOpen.value = false;
};

const onDocClick = (e: MouseEvent) => {
  const target = e.target;
  if (!(target instanceof HTMLElement)) return;
  if (!target.closest(".cvp-speed")) isSpeedOpen.value = false;
};

onMounted(() => document.addEventListener("click", onDocClick));
onBeforeUnmount(() => {
  clearTimeout(uiTimer);
  document.removeEventListener("click", onDocClick);
});
</script>

<style scoped>
.cvp {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 18px;
  overflow: hidden;
  background: #0b0b12;
}

.cvp-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.cvp-center {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.cvp-center-icon {
  width: 74px;
  height: 74px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.45);
  color: #fff;
  font-size: 28px;
  backdrop-filter: blur(10px);
}

.cvp-controls {
  position: absolute;
  inset: auto 0 0 0;
  display: grid;
  gap: 10px;
  padding: 14px;
  background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.78));
  transition: opacity 0.16s ease;
  opacity: 1;
}

.cvp-controls[data-visible="false"] {
  opacity: 0;
  pointer-events: none;
}

.cvp-progress {
  width: 100%;
}

.cvp-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cvp-btn {
  height: 34px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  cursor: pointer;
  padding: 0 12px;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cvp-time {
  color: rgba(255, 255, 255, 0.82);
  font-size: 14px;
}

.cvp-spacer {
  flex: 1;
}

.cvp-volume {
  width: 120px;
}

.cvp-speed {
  position: relative;
  display: flex;
  align-items: center;
}

.cvp-speed-menu {
  position: absolute;
  inset: auto 0 44px auto;
  min-width: 120px;
  border-radius: 14px;
  background: rgba(15, 15, 20, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(10px);
  display: grid;
  gap: 6px;
  padding: 10px;
}

.cvp-speed-item {
  height: 34px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.92);
  cursor: pointer;
}

.cvp-speed-item[data-active="true"] {
  border: 1px solid rgba(255, 255, 255, 0.26);
  background: rgba(255, 255, 255, 0.16);
  color: #fff;
}
</style>
