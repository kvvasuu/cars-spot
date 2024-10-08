<template>
  <header
    class="fixed sm:relative flex items-center w-full h-20 px-8 lg:px-28 shadow-md sm:shadow-none bg-white sm:bg-transparent z-50"
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
      <nav
        class="hidden sm:flex justify-center font-robotoflex font-normal text-primary gap-6"
        aria-label="Główna nawigacja"
      >
        <a
          href="#gallery"
          class="transition hover:drop-shadow hover:-translate-y-px"
          >Galeria zdjęć</a
        >
        <a
          href="#footer"
          class="transition hover:drop-shadow hover:-translate-y-px"
          >FaQ</a
        >
      </nav>
      <div class="sm:flex justify-end w-auto sm:w-1/3 relative">
        <a href="https://kwasu.pl/" target="_blank" class="hidden sm:flex"
          ><BasicButton class="text-white bg-myblue" aria-label="Zadzwoń do nas"
            >Zadzwoń do nas</BasicButton
          ></a
        >
        <BasicButton
          class="flex sm:hidden text-xl text-white bg-myblue active:text-white active:bg-myblue"
          :class="{ 'bg-white': isMenuVisible }"
          @click="toggleMenu"
          aria-label="Otwórz menu"
          :aria-expanded="isMenuVisible"
          aria-controls="menu"
        >
          <Transition name="fade" mode="out-in">
            <i class="fa-solid fa-bars" v-if="!isMenuVisible"></i>
            <i class="fa-solid fa-xmark text-myblue" v-else></i> </Transition
        ></BasicButton>
        <Transition name="expand">
          <nav
            class="absolute -bottom-1 right-0 translate-y-full z-50 w-40 max-h-40"
            ref="menuRef"
            v-if="isMenuVisible"
            aria-label="Główna nawigacja"
            id="menu"
          >
            <ul
              class="w-full h-full p-2 flex flex-col text-end bg-primary/75 backdrop-blur rounded-xl font-bebas text-2xl text-white"
            >
              <a
                href="#gallery"
                @click="toggleMenu"
                class="flex items-center p-2 justify-end border-b hover:bg-zinc-400 rounded-t-md"
                >Galeria</a
              >
              <a
                href="#footer"
                @click="toggleMenu"
                class="flex items-center p-2 justify-end border-b hover:bg-zinc-400"
                >FaQ</a
              >
              <a
                href="https://kwasu.pl/"
                target="_blank"
                @click="toggleMenu"
                class="flex items-center p-2 justify-end hover:bg-zinc-400 rounded-b-md"
                >Zadzwoń do nas</a
              >
            </ul>
          </nav>
        </Transition>
      </div>
    </div>
  </header>
  <main class="flex flex-col items-center w-full mt-20 sm:mt-0">
    <section
      class="relative flex items-start justify-start w-full h-[740px] md:h-[824px] px-8 lg:px-28 py-14 lg:py-28"
    >
      <div class="flex flex-col items-start z-20">
        <div class="content">
          <h1
            class="font-bebas font-primary text-[76px] leading-[84px] tracking-tighter"
          >
            Sprzedajemy samochody<br />
            z europy
          </h1>
          <p class="font-roboto font-primary mt-8 mb-12 leading-6">
            Kup komfortowy pojazd, aby każda podróż<br />
            była wyjątkowym przeżyciem.
          </p>
        </div>
        <div class="buttons flex gap-6">
          <a href="#gallery">
            <BasicButton
              class="text-white bg-myblue"
              aria-label="Zobacz zdjęcia"
              >Zobacz zdjęcia</BasicButton
            >
          </a>
          <a href="https://kwasu.pl/" target="_blank"
            ><BasicButton
              class="bg-white text-myblue font-bold hover:text-white hover:bg-myblue"
              aria-label="Zadzwoń do nas"
              >Zadzwoń do nas</BasicButton
            ></a
          >
        </div>
      </div>
      <img
        src="./assets/cars.webp"
        alt=""
        class="absolute -right-32 sm:-right-24 lg:-right-0 bottom-14 md:bottom-24 select-none"
        draggable="false"
      />
    </section>
    <section
      id="gallery"
      class="relative flex flex-col items-start justify-end w-full h-auto lg:h-[208px] px-8 lg:px-20"
    >
      <div class="relative flex flex-col">
        <h3 class="font-roboto text-[21.5px] text-myblue">Prezentacja firmy</h3>
        <h2 class="font-bebas text-[24px] sm:text-[40px] text-primarydark">
          Zobacz naszą galerię zdjęć
        </h2>
      </div>
      <div class="relative flex justify-start w-full mt-4 sm:mt8">
        <span
          class="mr-2 sm:mr-12 font-robotoflex text-xs sm:text-[15px] font-medium text-black cursor-pointer select-none transition-all tracking-tight"
          :class="{ active: cars }"
          @click="changeGalleryPage('cars')"
          role="button"
          >Samochody osobowe</span
        ><span
          class="font-robotoflex text-xs sm:text-[15px] text-[15px] font-medium text-black cursor-pointer select-none transition-all tracking-tight"
          :class="{ active: !cars }"
          @click="changeGalleryPage('trucks')"
          role="button"
          >Samochody dostawcze</span
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
      id="articles"
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

const isMenuVisible = ref(false);
const menuRef = ref(null);

const toggleMenu = () => {
  if (isMenuVisible.value) {
    isMenuVisible.value = false;
  } else {
    isMenuVisible.value = true;
    setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 300);
  }
};

const handleClickOutside = (event) => {
  const path = event.composedPath();
  if (!path.includes(menuRef.value)) {
    isMenuVisible.value = false;

    document.removeEventListener("click", handleClickOutside);
  }
};
</script>

<style scoped>
.active {
  color: #0147ff;
  font-weight: 600;
  border-bottom: 1px solid #0147ff;
  padding: 0.1rem;
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

.expand-enter-active,
.expand-leave-active {
  overflow: hidden;
  transition: all 0.5s ease;
}

.expand-leave-to,
.expand-enter-from {
  max-height: 0;
  overflow: hidden;
}
</style>
