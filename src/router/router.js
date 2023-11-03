import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/login', name: 'login', component: () => import('@/views/LoginView.vue') },
    { path: '/admin', name: 'admin', component: () => import('@/views/AdminView.vue') },
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router