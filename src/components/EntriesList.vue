<template>
  <div class="entries-page">
    <header class="entries-header">
      <h1 class="entries-header__title">Мои записи: {{ notesCount }}</h1>
    </header>

    <div class="search-panel">
      <input v-model="searchQuery" type="text" class="search-input" placeholder="Поиск..." />
      <button class="add-button" @click="createNewEntry">Добавить</button>
    </div>

    <div class="filter-buttons">
      <button class="filter-buttons__item" @click="filterMode = 'all'">Сброс фильтра</button>
      <button class="filter-buttons__item" @click="filterMode = 'topic'">Фильтр по теме</button>
      <button class="filter-buttons__item" @click="toggleDateSort">Фильтр по дате</button>
    </div>

    <div v-if="finalNotes.length > 0" class="notes-list">
      <div v-for="note in finalNotes" :key="note.id" class="note-card">
        <div class="note-content">
          <div class="note-header">
            <span class="note-topic">{{ note.topic }}</span>
            <span class="note-date">{{ formatDate(note.createdAt) }}</span>
          </div>
          <p class="note-text">
            {{ truncatedText(note.text) }}
          </p>
        </div>
        <div class="note-buttons">
          <button class="edit-button" @click="editEntry(note.id)">Изменить</button>
          <button class="delete-button" @click="deleteEntry(note.id)">Удалить</button>
        </div>
      </div>
    </div>

    <div v-else class="no-results">
      <NotFound @reset="resetSearch" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import NotFound from '../components/NotFound.vue'
import { useRouter } from 'vue-router'
import { useNotesStore } from '../stores/notes.store'
import type { Note } from '../stores/notes.store'

const store = useNotesStore()
const router = useRouter()

const searchQuery = ref('')

const filterMode = ref<'all' | 'topic'>('all')

const sortDesc = ref(true)

const notesCount = computed(() => store.notes.length)

const finalNotes = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  let found: Array<Note>
  if (!query) {
    found = [...store.notes]
  } else if (filterMode.value === 'all') {
    found = store.searchNotes({ query })
  } else {
    found = store.notes.filter((note) => note.topic.toLowerCase().includes(query))
  }

  found.sort((a, b) => (sortDesc.value ? b.createdAt - a.createdAt : a.createdAt - b.createdAt))

  return found
})

function createNewEntry() {
  router.push({ name: 'create-entry' })
}

function toggleDateSort() {
  sortDesc.value = !sortDesc.value
}

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString()
}

function truncatedText(text: string, length = 200): string {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

function editEntry(noteId: number) {
  router.push({ name: 'edit-entry', params: { id: noteId } })
}

function deleteEntry(noteId: number) {
  store.deleteNote(noteId)
}

function resetSearch() {
  searchQuery.value = ''
  filterMode.value = 'all'
}
</script>

<style scoped>
.entries-page {
  background-color: #111;
  color: #fff;
  min-height: 100vh;
  padding: 1rem;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
}

.entries-header {
  margin-bottom: 1rem;
}
.entries-header__title {
  margin: 0;
  font-size: 1.2rem;
}

.search-panel {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.search-input {
  flex: 1;
  padding: 0.4rem 0.6rem;
  border: 1px solid #666;
  background-color: #222;
  color: #fff;
  border-radius: 4px;
}

.add-button {
  background-color: #444;
  color: #fff;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}
.add-button:hover {
  background-color: #555;
}

.filter-buttons {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.filter-buttons__item {
  background-color: #333;
  color: #fff;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
}
.filter-buttons__item:hover {
  background-color: #444;
}

.notes-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.note-card {
  display: flex;
  justify-content: space-between;
  gap: 30px;
  background-color: #222;
  border: 1px solid #444;
  border-radius: 4px;
  padding: 1rem;
}

.note-header {
  display: flex;
  gap: 40px;
  margin-bottom: 0.5rem;
}

.note-topic {
  font-weight: bold;
  font-size: 1.1rem;
}

.note-date {
  font-style: italic;
  color: #aaa;
}

.note-text {
  color: #ccc;
  line-height: 1.4;
}

.note-buttons {
  display: flex;
  gap: 0.5rem;
}

.edit-button,
.delete-button {
  height: 65px;
  width: 75px;
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.edit-button {
  background-color: #ffc107;
  color: #000;
}

.delete-button {
  background-color: #e74c3c;
  color: #fff;
}
</style>
