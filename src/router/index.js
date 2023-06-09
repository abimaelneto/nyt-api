import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArticlesView from '../views/ArticlesView.vue'
import BooksView from '../views/BooksView.vue'
import BookDetailView from '../views/BookDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/articles',
      name: 'articles',
      component: ArticlesView,
    },
    {
      path: '/books',
      name: 'books',
      component: BooksView
    },
    {
      path: '/detail/:isbn',
      name: 'detail',
      component: BookDetailView
    },
  ]
})

export default router
// exports.key = "HRb1SQE0WMuY63JclAJXBlxHUAPxAfDl";
