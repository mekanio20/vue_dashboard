import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/login', name: 'Login', component: () => import('@/views/LoginView.vue') },
    { path: '/admin', name: 'Admin', component: () => import('@/views/AdminView.vue') },
    { path: '/permissions', name: 'Permissions', component: () => import('@/views/PermissionView.vue') },
    { path: '/subscriptions', name: 'Subscriptions', component: () => import('@/views/SubscriptionView.vue') },
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router