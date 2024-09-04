<template>
  <div class="py-8 lg:py-20">
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
        >
          <ImageComponent
            :image="image"
            :alt="`Zdjęcie nr.${index + 1}`"
          ></ImageComponent>
        </div>
      </div>
    </div>
    <div id="pagination" class="w-full flex justify-center items-center h-7">
      <div
        class="group py-2 px-1 cursor-pointer"
        v-for="index in chosenImages.length"
        @click="slide(index)"
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
import { ref, computed } from "vue";
import images from "../assets/images.json";
import ImageComponent from "./ImageComponent.vue";

const props = defineProps(["carsType"]);

const chosenImages = computed(() => {
  return props.carsType === "cars" ? images.cars : images.trucks;
});

const imagesRef = ref(null);
const currentImageIndex = ref(0);

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
</style>
