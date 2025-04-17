<script setup lang="ts"></script>

<template>
  <nav>
    <router-link :to="{ name: 'home' }">Все записи</router-link> |
    <router-link :to="{ name: 'create-entry' }">Создать запись</router-link>
  </nav>
  <RouterView />
</template>

<style scoped></style>
