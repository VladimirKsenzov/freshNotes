import { createRouter, createWebHistory } from 'vue-router'
import EntriesList from '../components/EntriesList.vue'
import CreateEntry from '../components/CreateEntry.vue'
import EditEntry from '../components/EditEntry.vue'
import NotFound from '../components/NotFound.vue'

const routes = [
  { path: '/', name: 'home', component: EntriesList },
  { path: '/create', name: 'create-entry', component: CreateEntry },
  {
    path: '/edit/:id',
    name: 'edit-entry',
    component: EditEntry,
    props: true,
  },
  { path: '/:catchAll(.*)*', name: 'NotFound', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
