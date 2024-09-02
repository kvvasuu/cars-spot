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
        <a href="#footer" class="hidden sm:flex"
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
      <div class="flex flex-col items-start">
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
          <BasicButton class="text-white bg-myblue">Zobacz zdjęcia</BasicButton>
          <a href="#footer"
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
        class="absolute -right-32 sm:-right-24 bottom-40 sm:bottom-24 select-none"
        draggable="false"
      />
    </section>
    <section></section>
    <section id="gallery"></section>
    <section
      class="bg-primary flex flex-col items-center w-full h-40"
    ></section>
  </main>
  <footer
    id="footer"
    class="bg-primary flex justify-between items-center py-6 w-full border-t border-solid border-white px-8 lg:px-28"
  >
    <span class="text-white font-roboto font-bold">Cars Spot</span>
    <a href="" target="_blank" class="text-white underline font-roboto"
      >Polityka prywatności</a
    >
  </footer>
</template>

<script setup></script>
