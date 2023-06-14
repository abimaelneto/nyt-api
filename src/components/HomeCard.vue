<script>
export default {
  props: {
    target: String, //pode ser articles ou books
    img: Image,
    label: String,
    hoveredCard: String,
    hover: Function,
  },
  methods: {
    getCardClass() {
      return this.hoveredCard && this.hoveredCard !== this.target
        ? "inactive"
        : "";
    },
  },
};
</script>

<template>
  <router-link
    :to="`/${target}`"
    class="image-wrapper"
    @mouseover="hover(target)"
    @mouseleave="hover()"
  >
    <img class="news" :src="img" :class="getCardClass()" />
    <div class="text-overlay">
      <span>{{ label }}</span>
    </div>
  </router-link>
</template>

<style scoped>
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

.inactive {
  opacity: 0.5;
}
</style>
