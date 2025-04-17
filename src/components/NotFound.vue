<template>
  <div class="no-results-page">
    <h2 class="no-results-page__title">Ничего не найдено</h2>

    <p class="no-results-page__text">По заданным критериям поиска не найдено ни одной записи.</p>

    <div class="no-results-page__illustration">
      <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#111111" />

        <circle cx="100" cy="40" r="15" fill="none" stroke="white" stroke-width="2" />

        <line x1="91" y1="38" x2="97" y2="38" stroke="white" stroke-width="2" />

        <line x1="103" y1="38" x2="109" y2="38" stroke="white" stroke-width="2" />

        <line x1="96" y1="50" x2="104" y2="50" stroke="white" stroke-width="2" />

        <line x1="70" y1="25" x2="130" y2="25" stroke="white" stroke-width="2" />

        <line x1="70" y1="25" x2="100" y2="5" stroke="white" stroke-width="2" />

        <line x1="130" y1="25" x2="100" y2="5" stroke="white" stroke-width="2" />

        <line x1="100" y1="5" x2="100" y2="25" stroke="white" stroke-width="2" />

        <line x1="85" y1="25" x2="100" y2="5" stroke="white" stroke-width="2" />

        <line x1="115" y1="25" x2="100" y2="5" stroke="white" stroke-width="2" />

        <line x1="100" y1="55" x2="100" y2="120" stroke="white" stroke-width="2" />

        <line x1="100" y1="70" x2="80" y2="75" stroke="white" stroke-width="2" />

        <line x1="80" y1="75" x2="103" y2="90" stroke="white" stroke-width="2" />

        <line x1="100" y1="70" x2="120" y2="75" stroke="white" stroke-width="2" />

        <line x1="120" y1="75" x2="103" y2="90" stroke="white" stroke-width="2" />

        <line x1="100" y1="120" x2="85" y2="180" stroke="white" stroke-width="2" />

        <line x1="100" y1="120" x2="115" y2="180" stroke="white" stroke-width="2" />
      </svg>
    </div>

    <button class="no-results-page__button" @click="onReset">Сбросить поиск</button>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'

const emit = defineEmits<{
  (e: 'reset'): void
}>()

function onReset() {
  emit('reset')
}
</script>

<style scoped>
.no-results-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: #fff;
  background-color: #111;
  min-height: 300px;
  border: 1px solid #444;
  border-radius: 8px;
}

.no-results-page__title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.no-results-page__text {
  font-size: 1rem;
  margin-bottom: 1.5rem;
  text-align: center;
  max-width: 300px;
}

.no-results-page__illustration {
  color: #fff;
  margin-bottom: 1.5rem;
}

.no-results-page__button {
  background-color: #444;
  color: #fff;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}
.no-results-page__button:hover {
  background-color: #555;
}
</style>
