<script>
import { RouterLink, RouterView, useRoute } from "vue-router";

export default {
  components: {
    RouterLink,
    RouterView,
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
      <nav v-if="$route.name != 'home'">
        <RouterLink class="link" to="/">Home</RouterLink>
        <RouterLink class="link" to="/articles">Articles</RouterLink>
        <RouterLink class="link" to="/books">Books</RouterLink>
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

nav {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 60%;
  margin-left: 20%;
  margin-bottom: 2em;
  padding: 10px;
  gap: 40%;
  border-style: groove;
}

.link,
a {
  font-weight: 600;
  font-size: 2ch;
  color: rgba(0, 0, 0, 0.877);
  text-decoration: none;
}

.link:hover {
  background-color: rgba(143, 138, 113, 0.658);
  padding: 3px;
  border-radius: 2px;
}
</style>
