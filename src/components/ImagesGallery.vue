<template>
  <div class="gallery py-8 lg:py-20 relative" aria-label="Galeria zdjęć">
    <div
      class="button opacity-0 p-4 pl-6 absolute top-[calc(50%-4rem)] sm:top-[calc(50%-5rem)] left-4 sm:left-[74px] cursor-pointer z-40 hover:scale-105 active:scale-95 transition-all"
      @click="slideLeft"
      v-if="!isTouchDevice && currentImageIndex > 0 && !isDragging"
    >
      <div
        class="w-6 sm:w-10 h-6 sm:h-10 border-b-transparent border-r-transparent border-t-4 sm:border-t-8 border-l-4 sm:border-l-8 border-white/75 -rotate-45"
      ></div>
    </div>

    <div
      class="button opacity-0 p-4 pl-6 absolute top-[calc(50%-4rem)] sm:top-[calc(50%-5rem)] right-4 sm:right-[74px] cursor-pointer z-40 hover:scale-105 active:scale-95 transition-all"
      @click="slideRight"
      v-if="
        !isTouchDevice &&
        currentImageIndex < chosenImages.length - 1 &&
        !isDragging
      "
    >
      <div
        class="w-6 sm:w-10 h-6 sm:h-10 border-b-transparent border-l-transparent border-t-4 sm:border-t-8 border-r-4 sm:border-r-8 border-white/75 rotate-45"
      ></div>
    </div>

    <div
      id="carousel_wrapper"
      class="w-full overflow-x-hidden overflow-y-hidden mb-8 sm:mb-12 relative h-[200px] sm:h-[446px]"
      @mousedown="dragStart"
      @mouseup="dragStop"
      @mouseleave="dragStop"
      @mousemove="dragMove"
      @touchstart="dragStart"
      @touchend="dragStop"
      @touchmove="dragMove"
    >
      <div
        id="carousel_track"
        ref="trackRef"
        :style="{ transform: `translateX(${trackPosition})` }"
        class="flex ml-6 md:ml-4 lg:ml-12 transition-all duration-1000 absolute translate-x-0 top-0"
        :class="{ dragging: isDragging }"
      >
        <div
          id="slide"
          class="w-auto shrink-0 mx-2 md:mx-4 lg:mx-8"
          v-for="(image, index) in chosenImages"
          :key="index"
          ref="imagesRef"
          aria-label="Slajd"
        >
          <ImageComponent
            :image="image"
            :alt="`Zdjęcie nr.${index + 1}`"
            @start="startAutoplay"
            @stop="stopAutoplay"
            @slide="slide(index + 1)"
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
          role="button"
          aria-label="Wybierz slajd"
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
const trackPosition = ref(0);

const slide = (index) => {
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
      trackPosition.value = `0`;
      break;

    default:
      trackPosition.value = `calc(calc(50% - ${
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

//Dragscroll

const isDragging = ref(false);
const isClicked = ref(false);
const startX = ref(0);
const position = ref(0);
const lastPosition = ref(0);

const dragStart = (event) => {
  isDragging.value = false;
  isClicked.value = true;
  startX.value = event.clientX;
  if (isTouchDevice && event.touches) {
    startX.value = event.touches[0].clientX;
  }
  position.value = parseFloat(
    window
      .getComputedStyle(trackRef.value)
      .transform.match(/matrix.*\((.+)\)/)[1]
      .split(", ")[4]
  );
  lastPosition.value = position.value;
};

const dragStop = (event) => {
  isClicked.value = false;
  if (isDragging.value) {
    isDragging.value = false;

    lastPosition.value = position.value;
    document.body.style.cursor = "default";

    let closestIndex = null;
    let minDistance = Infinity;

    const screenCenterX = window.innerWidth / 2;

    imagesRef.value.forEach((image, index) => {
      const rect = image.getBoundingClientRect();
      const imageCenterX = rect.left + rect.width / 2;

      const distance = Math.abs(imageCenterX - screenCenterX);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== null) {
      slide(closestIndex + 1);
    }
  }
  resetAutoplay();
};

const dragMove = (event) => {
  event.preventDefault();

  if (!isClicked.value) return;
  let deltaX = event.clientX - startX.value;

  if (isTouchDevice && event.touches) {
    deltaX = event.touches[0].clientX - startX.value;
  }

  if (Math.abs(deltaX) > 10) {
    isDragging.value = true;
  }

  if (!isDragging.value) return;

  document.body.style.cursor = "grabbing";
  position.value = lastPosition.value + deltaX;
  trackPosition.value = `${position.value}px`;
};

/* startAutoplay(); */

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
.dragging {
  transition: none;
}
.group:hover .active {
  background-color: #0147ff;
}
.gallery:hover .button {
  opacity: 1;
}
</style>
