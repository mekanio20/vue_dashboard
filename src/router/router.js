import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    routes: [
        { path: '/', name: 'Home', component: () => import('@/views/HomeView.vue') },
        { path: '/login', name: 'Login', component: () => import('@/views/LoginView.vue') },
        { path: '/permissions', name: 'Permissions', component: () => import('@/views/PermissionView.vue') },
        { path: '/subscriptions', name: 'Subscriptions', component: () => import('@/views/SubscriptionView.vue') },
        { path: '/brands', name: 'Brands', component: () => import('@/views/BrandView.vue') },
        { path: '/category', name: 'Category', component: () => import('@/views/CategoryView.vue') },
        { path: '/subcategory', name: 'Subcategory', component: () => import('@/views/SubcategoryView.vue') },
        { path: '/users', name: 'Users', component: () => import('@/views/UsersView.vue') },
        { path: '/customers', name: 'Customers', component: () => import('@/views/CustomersView.vue') },
        { path: '/sellers', name: 'Sellers', component: () => import('@/views/SellersView.vue') },
        { path: '/products', name: 'Products', component: () => import('@/views/ProductsView.vue') },
        { path: '/groups', name: 'Groups', component: () => import('@/views/GroupsView.vue') },
        { path: '/comments', name: 'Comments', component: () => import('@/views/CommentsView.vue') },
        { path: '/banners', name: 'Banners', component: () => import('@/views/BannerView.vue') },
        { path: '/notifications', name: 'Notifications', component: () => import('@/views/NotificationView.vue') },
        { path: '/features', name: 'Feature', component: () => import('@/views/FeatureView.vue') },
        { path: '/subcategory/features', name: 'SubcategoryFeature', component: () => import('@/views/SubcategoryFeatureView.vue') },
        { path: '/feature/description', name: 'FeatureDescription', component: () => import('@/views/FeatureDescView.vue') },
    ],
    history: createWebHistory()
})

export default router