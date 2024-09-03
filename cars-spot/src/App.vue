<template>
  <header
    class="flex items-center w-full h-20 px-8 lg:px-28 shadow-md sm:shadow-none bg-white sm:bg-transparent"
  >
    <div class="flex justify-between items-center w-full h-20 sm:h-12">
      <div class="w-auto sm:w-1/3 flex justify-center sm:justify-start">
        <a href="#body"
          ><img
            src="./assets/logo.png"
            alt="CarsSpot"
            class="h-8 transition hover:drop-shadow-lg hover:-translate-y-px select-none"
            draggable="false"
        /></a>
      </div>
      <div
        class="hidden sm:flex justify-center font-robotoflex font-normal text-primary gap-6"
      >
        <a
          href="#gallery"
          class="transition hover:drop-shadow hover:-translate-y-px"
          ><nav>Galeria zdjęć</nav></a
        >
        <a
          href="#footer"
          class="transition hover:drop-shadow hover:-translate-y-px"
          ><nav>FaQ</nav></a
        >
      </div>
      <div class="sm:flex justify-end w-auto sm:w-1/3">
        <a href="https://kwasu.pl/" target="_blank" class="hidden sm:flex"
          ><BasicButton class="text-white bg-myblue"
            >Zadzwoń do nas</BasicButton
          ></a
        >
        <BasicButton class="flex sm:hidden text-xl text-white bg-myblue"
          ><i class="fa-solid fa-bars"></i
        ></BasicButton>
      </div>
    </div>
  </header>
  <main class="flex flex-col items-center w-full">
    <section
      class="relative flex items-start justify-start w-full h-[824px] px-8 lg:px-28 py-14 lg:py-28"
    >
      <div class="flex flex-col items-start z-20">
        <div class="content">
          <h1 class="font-bebas font-primary text-7xl">
            Sprzedajemy samochody<br />
            z europy
          </h1>
          <p class="font-roboto font-primary my-8">
            Kup komfortowy pojazd, aby każda<br />
            podróż była wyjątkowym przeżyciem.
          </p>
        </div>
        <div class="buttons flex gap-8">
          <a href="#gallery">
            <BasicButton class="text-white bg-myblue"
              >Zobacz zdjęcia</BasicButton
            >
          </a>
          <a href="https://kwasu.pl/" target="_blank"
            ><BasicButton
              class="bg-white text-myblue font-bold hover:text-white hover:bg-myblue"
              >Zadzwoń do nas</BasicButton
            ></a
          >
        </div>
      </div>
      <img
        src="./assets/cars.png"
        alt=""
        class="absolute -right-32 sm:-right-24 lg:-right-0 bottom-40 sm:bottom-24 select-none"
        draggable="false"
      />
    </section>
    <section
      id="gallery"
      class="relative flex flex-col items-start justify-end w-full h-[208px] px-8 lg:px-20"
    >
      <div class="relative flex flex-col">
        <p class="font-roboto text-[21.5px] text-myblue">Prezentacja firmy</p>
        <p class="font-bebas text-[24px] sm:text-[40px] text-primarydark">
          Zobacz naszą galerię zdjęć
        </p>
      </div>
      <div class="relative flex justify-start w-full mt-4 sm:mt8">
        <span
          class="mr-2 sm:mr-8 font-robotoflex text-xs sm:text-[15px] text-black cursor-pointer select-none transition-all"
          :class="{ active: cars }"
          @click="changeGalleryPage('cars')"
          >&nbsp;Samochody osobowe&nbsp;</span
        ><span
          class="font-robotoflex text-xs sm:text-[15px] text-[15px] text-black cursor-pointer select-none transition-all"
          :class="{ active: !cars }"
          @click="changeGalleryPage('trucks')"
          >&nbsp;Samochody dostawcze&nbsp;</span
        >
      </div>
    </section>
    <section class="w-full h-auto">
      <Transition name="slide" mode="out-in">
        <ImagesGallery :carsType="carsType" :key="carsType"></ImagesGallery>
      </Transition>
    </section>
    <section
      class="bg-primary flex flex-col items-center w-full py-20 px-8 lg:px-28"
    >
      <div class="flex flex-col sm:flex-row gap-12">
        <div class="w-full sm:w-1/2"><SeoElement></SeoElement></div>
        <div class="w-full sm:w-1/2"><SeoElement></SeoElement></div>
      </div>
    </section>
  </main>
  <footer
    id="footer"
    class="bg-primary flex justify-between items-center py-6 w-full border-t border-solid border-white px-8 lg:px-28"
  >
    <span class="text-white font-roboto font-bold">Cars Spot</span>
    <a
      href="https://www.linkedin.com/in/%C5%82ukasz-kwas-aa985a232/"
      target="_blank"
      class="text-white underline font-roboto"
      >Polityka prywatności</a
    >
  </footer>
</template>

<script setup>
import ImagesGallery from "./components/ImagesGallery.vue";
import SeoElement from "./components/SeoElement.vue";
import { ref } from "vue";

const cars = ref(true); //true - "Samochody osobowe", false - "Samochody dostawcze"

const carsType = ref("cars");

const changeGalleryPage = (type) => {
  switch (type) {
    case "cars":
      if (!cars.value) {
        cars.value = !cars.value;
        carsType.value = "cars";
      }
      break;
    case "trucks":
      if (cars.value) {
        cars.value = !cars.value;
        carsType.value = "trucks";
      }
      break;
  }
};
</script>

<style scoped>
.active {
  color: #0147ff;
  text-decoration: underline;
  text-underline-offset: 6px;
  font-weight: 600;
}

.slide-enter-active,
.slide-leave-active {
  opacity: 1;
  transition: all 0.3s ease;
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-100rem);
}
.slide-enter-from {
  opacity: 0;
  transform: translateX(100rem);
}
</style>
