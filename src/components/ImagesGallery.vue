<template>
  <div class="gallery py-8 lg:py-20 relative">
    <div
      class="button opacity-0 p-4 pl-6 absolute top-[calc(50%-4rem)] sm:top-[calc(50%-5rem)] left-4 sm:left-[74px] cursor-pointer z-40 hover:scale-105 active:scale-95 transition-all"
      @click="slideLeft"
      v-if="!isTouchDevice && currentImageIndex > 0"
    >
      <div
        class="w-6 sm:w-10 h-6 sm:h-10 border-b-transparent border-r-transparent border-t-4 sm:border-t-8 border-l-4 sm:border-l-8 border-white/75 -rotate-45"
      ></div>
    </div>

    <div
      class="button opacity-0 p-4 pl-6 absolute top-[calc(50%-4rem)] sm:top-[calc(50%-5rem)] right-4 sm:right-[74px] cursor-pointer z-40 hover:scale-105 active:scale-95 transition-all"
      @click="slideRight"
      v-if="!isTouchDevice && currentImageIndex < chosenImages.length - 1"
    >
      <div
        class="w-6 sm:w-10 h-6 sm:h-10 border-b-transparent border-l-transparent border-t-4 sm:border-t-8 border-r-4 sm:border-r-8 border-white/75 rotate-45"
      ></div>
    </div>

    <div
      id="carousel_wrapper"
      class="w-full overflow-x-hidden overflow-y-hidden mb-8 sm:mb-12 relative h-[200px] sm:h-[446px]"
    >
      <div
        id="carousel_track"
        ref="trackRef"
        class="flex ml-6 md:ml-4 lg:ml-12 transition-all duration-1000 absolute left-0 top-0"
      >
        <div
          id="slide"
          class="w-auto shrink-0 mx-2 md:mx-4 lg:mx-8"
          v-for="(image, index) in chosenImages"
          :key="index"
          ref="imagesRef"
          @click="slide(index + 1)"
        >
          <ImageComponent
            :image="image"
            :alt="`Zdjęcie nr.${index + 1}`"
            @start="startAutoplay"
            @stop="stopAutoplay"
          ></ImageComponent>
        </div>
      </div>
    </div>
    <div id="pagination" class="w-full flex justify-center items-center h-7">
      <div
        class="group py-2 px-1 cursor-pointer"
        v-for="index in chosenImages.length"
        @click="
          slide(index);
          resetAutoplay();
        "
      >
        <div
          class="bg-stone-200 group-hover:bg-zinc-300 w-2 h-2 rounded-full transition-all"
          :class="{ active: index === currentImageIndex + 1 }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from "vue";
import images from "../assets/images.json";
import ImageComponent from "./ImageComponent.vue";

const props = defineProps(["carsType"]);

const chosenImages = computed(() => {
  return props.carsType === "cars" ? images.cars : images.trucks;
});

const imagesRef = ref(null);
const currentImageIndex = ref(0);

let autoplayInterval;

const setImageIndex = (index) => {
  currentImageIndex.value = index - 1;
};

const trackRef = ref(null);

const slide = (index) => {
  if (currentImageIndex.value === index - 1) return;
  setImageIndex(index);

  const trackMargin = Number(
    window.getComputedStyle(trackRef.value).marginLeft.split("px")[0]
  );

  const imageWidth = imagesRef.value[0].getBoundingClientRect().width;
  const imageMargin =
    Number(
      window.getComputedStyle(imagesRef.value[0]).marginRight.split("px")[0]
    ) * 2;

  switch (index) {
    case 1:
      trackRef.value.style.left = `0`;
      break;

    default:
      trackRef.value.style.left = `calc(calc(50% - ${
        (imageWidth + imageMargin) / 2 +
        (index - 2) * (imageWidth + imageMargin)
      }px) - ${imageWidth + imageMargin + trackMargin}px)`;
      break;
  }
};

const slideLeft = () => {
  if (currentImageIndex.value <= 0) return;
  slide(currentImageIndex.value);
  resetAutoplay();
};

const slideRight = () => {
  if (currentImageIndex.value >= chosenImages.length) return;
  slide(currentImageIndex.value + 2);
  resetAutoplay();
};

const isPlaying = ref(false);
const autoplay = () => {
  let index = currentImageIndex.value + 2;

  if (index > chosenImages.value.length) {
    currentImageIndex.value = -1;
    index = 1;
  }

  slide(index);
};
const startAutoplay = () => {
  if (isPlaying.value) return;
  isPlaying.value = true;
  autoplayInterval = setInterval(autoplay, 4000);
};
const stopAutoplay = () => {
  isPlaying.value = false;
  clearInterval(autoplayInterval);
};
const resetAutoplay = () => {
  stopAutoplay();
  startAutoplay();
};

const isTouchDevice =
  "ontouchstart" in window ||
  navigator.maxTouchPoints > 0 ||
  navigator.msMaxTouchPoints > 0;

console.log(isTouchDevice);

startAutoplay();

onBeforeUnmount(() => {
  stopAutoplay();
});
</script>

<style scoped>
.active {
  background-color: #0147ff;
  width: 9px;
  height: 9px;
}
.group:hover .active {
  background-color: #0147ff;
}
.gallery:hover .button {
  opacity: 1;
}
</style>
