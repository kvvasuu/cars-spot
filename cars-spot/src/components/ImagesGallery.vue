<template>
  <div class="flex flex-col h-full w-full py-8 lg:py-20 overflow-hidden">
    <carousel
      :items-to-show="2.16"
      class="w-full h-auto scroll-m-8 overflow-auto"
    >
      <slide v-for="(image, index) in chosenImages" :key="index">
        <ImageComponent :image="image" ref="imagesRef"></ImageComponent>
      </slide>

      <template #addons>
        <pagination />
      </template>
    </carousel>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination } from "vue3-carousel";
import images from "../assets/images.json";
import ImageComponent from "./ImageComponent.vue";

const props = defineProps(["carsType"]);

const chosenImages = computed(() => {
  return props.carsType === "cars" ? images.cars : images.trucks;
});

const imagesRef = ref(null);
</script>
