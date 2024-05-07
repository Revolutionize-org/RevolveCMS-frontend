import {createRouter, createWebHistory} from 'vue-router'
import {ROUTES} from "@/helpers/index.js";

const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/dashboard/:type?/:id?',
        name: ROUTES.DASHBOARD,
        component: () => import('@/views/Dashboard.vue')
    }
]


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
    scrollBehavior(to, from) {
        if (to.hash) {
            return {
                behavior: 'smooth',
                el: to.hash,
                top: window.innerWidth > 1025 ? 150 : 100
            }
        }
    }
})

export default router
