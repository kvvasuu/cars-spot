<template>
  <carousel :items-to-show="2" class="py-8 lg:py-20">
    <slide v-for="(image, index) in chosenImages" :key="index">
      <ImageComponent
        :image="image"
        ref="imagesRef"
        :alt="`Zdjęcie nr.${index + 1}`"
      ></ImageComponent>
    </slide>

    <template #addons>
      <pagination />
    </template>
  </carousel>
</template>

<script setup>
import { ref, computed, onBeforeMount } from "vue";
import "../vendor/vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination } from "../vendor/vue3-carousel";
import images from "../assets/images.json";
import ImageComponent from "./ImageComponent.vue";

const props = defineProps(["carsType"]);

const chosenImages = computed(() => {
  return props.carsType === "cars" ? images.cars : images.trucks;
});

const itemsToShow = ref(2.16);

const countItemsToShow = () => {
  const referenceWidth = 1440;
  const referenceWidthConst = 2.16;

  itemsToShow.value =
    (window.innerWidth / referenceWidth) * referenceWidthConst;
  console.log(window.innerWidth / 2 - 380);
};

onBeforeMount(() => {
  countItemsToShow();
  window.addEventListener("resize", countItemsToShow);
});
</script>
