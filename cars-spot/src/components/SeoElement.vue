<template>
  <div class="flex flex-col items-start justify-between w-full text-white">
    <p class="font-bebas text-[25px]">
      Id nostrud enim esse consectetur in eu mollit fugiat aute. Velit nulla
      commodo.
    </p>
    <p class="font-roboto text-[14px] mt-4 mb-6">
      Mauris varius ipsum mauris, rutrum lobortis magna efficitur a. Donec
      egestas, nisl vehicula feugiat ornare, diam turpis efficitur mi, ac
      venenatis eros ipsum ac arcu. Vestibulum et [...]
    </p>
    <button
      class="flex font-roboto text-[14px] border-b-2 border-b-white bg-transparent"
      @click="expand"
    >
      Rozwiń
      <img src="../assets/arrow-down.svg" class="ml-2 mb-2 mt-1" />
    </button>
    <Transition name="expand">
      <div
        class="container p-4 gap-2 transition-all duration-500 w-full font-roboto text-[14px] mt-4 bg-neutral-900 rounded-lg"
        v-if="isExpanded"
      >
        <p>
          Automobilis, mirabilis opus hominum ingenii, est instrumentum
          libertatis et velocitatis, per quod mundus maior fit et spatia minora
          videntur. In rotarum motu, scientia et technologia coniunguntur,
          creans vehiculum quod non solum viam apertam devorat, sed etiam novam
          aetatem mobilitatis inaugurat. A prima luce aurorae usque ad vesperam,
          automobili potestatem sentiunt viatores, qui sine mora in dies
          velociores, longioresque itinera faciunt.
        </p>
        <p class="mt-4">
          Automobilis non est tantum machina ferro et motore composita, sed
          etiam symbolum temporis moderni, quo homines plus quam unquam antea ad
          novas metas ducuntur. In eius silentioso murmure, resonant anhelitus
          et desideria generationum. Quamquam viae sunt longae et arduae, nulla
          distantia est tam magna quam quae superari non possit per celeritatem
          et constantiam automobiliis.
        </p>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isExpanded = ref(false);
const scrollTo = ref(null);

const expand = () => {
  isExpanded.value = !isExpanded.value;
};
</script>

<style scoped>
.container {
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3) inset;
}

.expand-enter-active,
.expand-leave-active {
  height: 16.125rem;
  padding: 1rem;
  overflow: hidden;
  transition: all 0.5s ease;
}

.expand-leave-to,
.expand-enter-from {
  padding: 0 1rem;
  height: 0;
  overflow: hidden;
}
</style>
