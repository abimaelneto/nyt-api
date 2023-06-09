<script>
export default {
  data() {
    return {
      isBooksHovered: false,
      isNewsHovered: false,
    };
  },
  methods: {
    setBooksHovered(value) {
      this.isBooksHovered = value;
      this.isNewsHovered = !value;
    },
  },
};
</script>

<template>
  <div class="image-container">
    <router-link to="/articles" class="image-wrapper">
      <img
        class="news"
        src="../assets/fotos/news.avif"
        :class="{ active: isBooksHovered }"
        @mouseover="setBooksHovered(false)"
      />
      <div class="text-overlay">
        <span>Top Stories</span>
      </div>
    </router-link>
    <router-link to="/books" class="image-wrapper">
      <img
        class="books"
        src="../assets/fotos/books.jpg"
        :class="{ active: isNewsHovered }"
        @mouseover="setBooksHovered(true)"
      />
      <div class="text-overlay">
        <span>Best Sellers</span>
      </div>
    </router-link>
  </div>
</template>

<style scoped>
.image-container {
  display: flex;
  height: 100vh;
  margin-left: 5%;
  overflow: hidden;
}

.image-wrapper {
  position: relative;
  overflow: hidden;
}

.books,
.news {
  height: 80%;
  width: 90%;
  object-fit: fill;
  transition: transform 0.3s;
}

.text-overlay {
  position: absolute;
  text-align: center;

  top: 40%;
  left: 48%;
  width: 10em;
  padding-top: 2%;

  background-color: rgb(233, 203, 168);
  border-style: inset;

  color: black;
  font-family: Subway;
  font-weight: bold;
  font-size: 4rem;
  
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.3s;
}

.image-wrapper:hover {
  transform: scale(1.1);
  opacity: 1;
}
.image-wrapper:hover .text-overlay {
  opacity: 1;
}
.image-wrapper .active {
  opacity: 0.5;
}
</style>
