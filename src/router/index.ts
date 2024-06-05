import { createRouter, createWebHistory } from 'vue-router'
import UploadView from '../components/UploadImage.vue'
import QueryView from '../components/TagQuery.vue'
import FindImgByTagsView from '../components/FindImgByTags.vue'

import SnsView from '../components/SNS.vue'
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
        },
        {
            path: '/FindImgByTags',
            component: FindImgByTagsView
        },
        {
            path: '/sns',
            component: SnsView
        }
    ]
})

export default router
