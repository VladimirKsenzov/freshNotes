<template>
  <form @submit.prevent="handleSubmit" class="entry-form">
    <fieldset>
      <legend class="title">Создать новую запись</legend>
      <div class="form-group">
        <label class="form-group__title" for="topic">Тема</label>
        <input
          class="form-group__topic"
          type="text"
          id="topic"
          v-model="topic"
          placeholder="Введите тему"
          required
        />
      </div>
      <div class="form-group">
        <label class="form-group__title" for="recordText">Текст записи</label>
        <textarea
          id="recordText"
          v-model="recordText"
          rows="5"
          placeholder="Введите текст записи"
          class="form-group__text"
          required
        ></textarea>
      </div>
      <div class="form-button">
        <button class="form-button__delete" type="button" @click="handleCancel">Отменить</button>
        <button class="form-button__create" type="submit">Создать</button>
      </div>
    </fieldset>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useNotesStore } from '../stores/notes.store'

const topic = ref<string>('')
const recordText = ref<string>('')

const store = useNotesStore()

const router = useRouter()

function handleCancel(): void {
  topic.value = ''
  recordText.value = ''
  console.log('Форма сброшена')
}

function handleSubmit(): void {
  console.log('Создаётся запись:', {
    topic: topic.value,
    text: recordText.value,
  })

  store.addNote({
    topic: topic.value,
    text: recordText.value,
  })

  topic.value = ''
  recordText.value = ''

  router.push({ name: 'home' })
}
</script>

<style scoped>
.entry-form {
  max-width: 500px;
  margin: 20px auto;
  padding: 1em;
  background: #666666;
  border: 1px solid #ddd;
  border-radius: 4px;
}

fieldset {
  border: none;
  padding: 0;
  margin: 0;
}

.title {
  font-size: 1.5em;
  margin-bottom: 0.5em;
  text-align: center;
  color: #fffefe;
}

.form-group {
  margin-bottom: 1em;
}

.form-group__title {
  display: block;
  margin-bottom: 0.3em;
  font-weight: bold;
  color: #000;
}

.form-group__topic,
.form-group__text {
  width: 100%;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-button {
  display: flex;
  justify-content: space-between;
}

.form-button__delete,
.form-button__create {
  padding: 0.5em 1em;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.form-button__delete {
  background-color: #ccc;
}

.form-button__create {
  background-color: #3498db;
  color: #fff;
}
</style>
