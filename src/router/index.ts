import { createRouter, createWebHistory } from 'vue-router'
import UploadView from '../components/UploadImage.vue'
import FindImgByTagsView from '../components/FindImgByTags.vue'
import FindImgByThumbnailUrlView from '../components/FindImgByThumbnailUrl.vue'
import EditTagsView from '../components/EditTags.vue'
import DeleteImagesView from '../components/DeleteImages.vue'

import SnsView from '../components/SNS.vue'
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/upload',
            component: UploadView
        },
        {
            path: '/findImgByTags',
            component: FindImgByTagsView
        }, {
            path: '/findImgByThumbnailUrl',
            component: FindImgByThumbnailUrlView
        }, {
            path: '/editTags',
            component: EditTagsView
        }, {
            path: '/deleteImages',
            component: DeleteImagesView
        },
        {
            path: '/sns',
            component: SnsView
        }
    ]
})

export default router
