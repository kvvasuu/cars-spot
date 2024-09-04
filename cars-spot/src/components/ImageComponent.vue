<template>
  <div
    class="w-auto h-auto shrink-0 relative snap-center overflow-hidden"
    :class="{ 'cursor-pointer': !isOverlayVisible }"
    @click="toggleOverlay"
    ref="containerRef"
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
      >
        <p class="font-bebas text-lg sm:text-4xl text-white">
          {{ image.name }}
        </p>
        <p class="font-roboto text-white">{{ image.description }}</p>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps(["image"]);

const getImageSrc = computed(() => {
  return new URL(`../assets/gallery/${props.image.img}`, import.meta.url).href;
});

const isOverlayVisible = ref(false);

const toggleOverlay = () => {
  isOverlayVisible.value = true;
  document.addEventListener("click", handleClickOutside);
};

const containerRef = ref(null);

const handleClickOutside = (event) => {
  const path = event.composedPath();
  if (!path.includes(containerRef.value)) {
    isOverlayVisible.value = false;
    document.removeEventListener("click", handleClickOutside);
  }
};
</script>

<style scoped>
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
