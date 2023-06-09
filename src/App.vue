<script>
import { RouterLink, RouterView, useRoute } from "vue-router";

export default {
  components: {
    RouterLink,
    RouterView,
  },
  methods: {
    isHomeView() {
      const route = useRoute();
      return route.path === "/";
    },
  },
};
</script>

<template>
  <header>
    <img
      alt="nyt logo"
      class="logo"
      src="@/assets/fotos/The_New_York_Times_logo.png"
      width="400"
      height="60"
    />

    <div class="wrapper">
      <nav v-if="!isHomeView()">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/articles">Articles</RouterLink>
        <RouterLink to="/books">Books</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-width: 100vw;
}
.logo {
  display: block;
  margin: 1rem auto 2rem;
}
/* 
nav {
  width: 70%;
  font-size: 14px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
} */

</style>
