import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/Products/Products.vue'),
  },
  {
    path: '/products',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/',
        name: 'All',
        component: () => import('@/views/Products/Products.vue'),
      },
      {
        path: '/category',
        name: 'By Category',
        component: () => import('@/views/Products/ProductsByCategory.vue'),
      },
      {
        path: '/subcategory',
        name: 'By Sub-Category',
        component: () => import('@/views/Products/ProductsBySubCategory.vue'),
      },
      {
        path: '/name',
        name: 'By Name',
        component: () => import('@/views/Products/ProductsByName.vue'),
      },
      {
        path: '/product',
        name: 'By Id',
        component: () => import('@/views/Products/ProductsById.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/admin/products',
        name: 'Products',
        component: () => import('@/views/Admin/Products.vue'),
      },
      {
        path: '/admin/sales',
        name: 'Sales',
        component: () => import('@/views/Admin/Sales.vue'),
      },
      {
        path: '/admin/graphs',
        name: 'Graphs',
        component: () => import('@/views/Admin/Graphs.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
