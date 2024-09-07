<template>
  <div
    class="w-auto h-auto shrink-0 relative snap-center overflow-hidden image"
    :class="{ 'cursor-pointer': !isOverlayVisible }"
    ref="containerRef"
    role="button"
    :aria-expanded="isOverlayVisible"
    aria-controls="image-info"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @mousemove="onMouseMove"
    @touchstart="onMouseDown"
    @touchend="onMouseUp"
    @touchmove="onMouseMove"
  >
    <img
      :src="getImageSrc"
      :alt="image.name"
      class="w-auto h-[200px] sm:h-[446px] shrink-0 transition-all"
      :class="{ 'hover:brightness-75': !isOverlayVisible }"
      draggable="false"
    />
    <Transition name="fade-slide">
      <div
        class="absolute w-full bottom-0 left-0 flex flex-col items-start justify-start backdrop-blur-lg bg-black/75 p-3"
        v-if="isOverlayVisible"
        id="image-info"
      >
        <h2 class="font-bebas text-lg sm:text-4xl text-white">
          {{ image.name }}
        </h2>
        <p class="font-roboto text-xs sm:text-base text-white">
          {{ image.description }}
        </p>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps(["image"]);
const emit = defineEmits(["start", "stop", "slide"]);

const getImageSrc = computed(() => {
  return new URL(`../assets/gallery/${props.image.img}.webp`, import.meta.url)
    .href;
});

const isOverlayVisible = ref(false);

const toggleOverlay = () => {
  isOverlayVisible.value = true;
  emit("stop");
  emit("slide");
  document.addEventListener("click", handleClickOutside);
};

const containerRef = ref(null);

const handleClickOutside = (event) => {
  const path = event.composedPath();
  if (!path.includes(containerRef.value)) {
    isOverlayVisible.value = false;
    emit("start");
    document.removeEventListener("click", handleClickOutside);
  }
};

//Dragscroll

const isDragging = ref(false);
const startX = ref(0);

const onMouseDown = (event) => {
  isDragging.value = false;
  startX.value = event.clientX;
};

const onMouseMove = (event) => {
  const distanceX = Math.abs(event.clientX - startX.value);

  // Jeżeli mysz przesunie się powyżej progu, oznacz jako przeciąganie
  if (distanceX > 10) {
    isDragging.value = true;
  }
};

const onMouseUp = () => {
  if (!isDragging.value) {
    toggleOverlay();
  }
};

defineExpose({
  isOverlayVisible,
});
</script>

<style scoped>
.image {
  user-select: none;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  opacity: 1;
  transition: all 0.3s ease;
}

.fade-slide-leave-to,
.fade-slide-enter-from {
  transform: translateY(8rem);
  opacity: 0;
}
</style>
