import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export interface Note {
  id: number
  createdAt: number
  topic: string
  text: string
}

interface AddNotePayload {
  topic: string
  text: string
}

interface UpdateNotePayload {
  topic: string
  text: string
}

interface SearchNotesParams {
  query: string
}

export const useNotesStore = defineStore('notes', () => {
  const notes = ref<Note[]>([])

  const savedNotes = localStorage.getItem('notes')
  notes.value = savedNotes ? JSON.parse(savedNotes) : []

  watch(
    () => notes.value,
    (newVal) => {
      localStorage.setItem('notes', JSON.stringify(newVal))
    },
    { deep: true },
  )

  function addNote(payload: AddNotePayload): Note {
    const now = Date.now()
    const newNote: Note = {
      id: now,
      createdAt: now,
      topic: payload.topic,
      text: payload.text,
    }
    notes.value.push(newNote)
    return newNote
  }

  function deleteNote(noteId: number): void {
    notes.value = notes.value.filter((note) => note.id !== noteId)
  }

  function updateNote(noteId: number, payload: UpdateNotePayload): void {
    const index = notes.value.findIndex((n) => n.id === noteId)
    if (index === -1) {
      console.warn(`Заметка с id ${noteId} не найдена`)
      return
    }

    notes.value[index] = {
      ...notes.value[index],
      ...payload,
    }
  }

  function getNoteById(noteId: number): Note | undefined {
    return notes.value.find((n) => n.id === noteId)
  }

  function searchNotes(params: SearchNotesParams): Note[] {
    const lowerQuery = params.query.trim().toLowerCase()
    return notes.value.filter((note) => note.text.toLowerCase().includes(lowerQuery))
  }

  return {
    notes,
    addNote,
    deleteNote,
    updateNote,
    getNoteById,
    searchNotes,
  }
})
