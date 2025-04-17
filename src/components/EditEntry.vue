<template>
  <div class="edit-entry">
    <h1 class="edit-title">Редактирование заметки</h1>

    <div v-if="currentNote">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label class="form-group__title" for="topic">Тема</label>
          <input class="form-group__topic" id="topic" v-model="topic" type="text" required />
        </div>

        <div class="form-group">
          <label for="text">Текст</label>
          <textarea class="form-group__text" id="text" v-model="text" rows="5" required></textarea>
        </div>

        <div class="form-buttons">
          <button class="form-button__cancel" type="button" @click="cancelEdit">Отменить</button>
          <button class="form-button__save" type="submit">Сохранить</button>
        </div>
      </form>
    </div>

    <div v-else>
      <p>Заметка не найдена.</p>
      <button @click="goHome">Вернуться на главную</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNotesStore } from '../stores/notes.store'

const store = useNotesStore()
const route = useRoute()
const router = useRouter()

const topic = ref('')
const text = ref('')

const noteId = parseInt(route.params.id as string)

const currentNote = ref(store.getNoteById(noteId))

onMounted(() => {
  if (!currentNote.value) {
    return
  }
  topic.value = currentNote.value.topic
  text.value = currentNote.value.text
})

function handleSubmit() {
  store.updateNote(noteId, {
    topic: topic.value,
    text: text.value,
  })
  router.push({ name: 'home' })
}

function cancelEdit() {
  router.push({ name: 'home' })
}

function goHome() {
  router.push({ name: 'home' })
}
</script>

<style scoped>
.edit-entry {
  max-width: 500px;
  margin: 20px auto;
  padding: 1em;
  background: #111111;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: sans-serif;
}

.edit-title {
  margin-bottom: 1em;
  color: #ffffff;
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

.form-buttons {
  display: flex;
  gap: 1em;
}

.form-button__cancel,
.form-button__save {
  padding: 0.5em 1em;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.form-button__save {
  background-color: #3498db;
  color: #fff;
}

.form-button__cancel {
  background-color: #ccc;
}
</style>
