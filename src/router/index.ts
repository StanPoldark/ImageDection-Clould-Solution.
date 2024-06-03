import { createRouter, createWebHistory } from 'vue-router'
import UploadView from '../components/UploadImage.vue'
import QueryView from '../components/TagQuery.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/upload',
      component: UploadView
    },
    {
      path: '/query',
      component: QueryView
    }
  ]
})

export default router
