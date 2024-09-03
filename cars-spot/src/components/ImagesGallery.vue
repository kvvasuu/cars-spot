<template>
  <div class="flex flex-col h-full w-full py-8 lg:py-20">
    <div
      class="w-full h-auto flex items-center gap-x-8 lg:gap-x-16 px-8 lg:px-20 scroll-p-8 lg:scroll-p-20 box-border overflow-scroll overflow-y-hidden snap-x gallery"
    >
      <ImageComponent
        v-for="(image, index) in chosenImages"
        :image="image"
        ref="imagesRef"
      ></ImageComponent>
    </div>
    <div class="h-6 mt-12 flex items-center justify-center">
      <div
        v-for="index in chosenImages.length"
        class="h-4 w-4 cursor-pointer"
        @click="setcurrentImageIndex(index - 1)"
      >
        <div
          class="h-2 w-2 mx-1 rounded-full bg-slate-200 hover:bg-slate-300 transition"
          :class="{ active: index - 1 === currentImageIndex }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, computed } from "vue";
import images from "../assets/images.json";
import ImageComponent from "./ImageComponent.vue";

const props = defineProps(["carsType"]);

const chosenImages = computed(() => {
  return props.carsType === "cars" ? images.cars : images.trucks;
});

const imagesRef = ref(null);

const currentImageIndex = ref(0);
const setcurrentImageIndex = (index) => {
  currentImageIndex.value = index;
  console.log(index);
  imagesRef.value[index].$refs.containerRef.scrollIntoView({
    behavior: "smooth",
    inline: "start",
    block: "center",
  });
};
</script>

<style scoped>
.active {
  background-color: #0147ff;
}
.gallery {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.gallery::-webkit-scrollbar {
  display: none;
}
</style>
