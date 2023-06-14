<script>
import HomeCard from "@/components/HomeCard.vue";
import booksCover from "@/assets/fotos/books.jpg";
import articlesCover from "@/assets/fotos/news.avif";

export default {
  components: {
    HomeCard,
  },
  data() {
    return {
      hoveredCard: null,
      booksCover,
      articlesCover,
    };
  },
  methods: {
    hoverCard(target) {
      this.hoveredCard = target;
    },
    test(v) {
      console.log(v);
    },
  },
};
</script>

<template>
  <div class="image-container">
    <HomeCard
      target="articles"
      label="Top Stories"
      :hoveredCard="hoveredCard"
      :img="articlesCover"
      :hover="hoverCard"
    />
    <HomeCard
      target="books"
      label="Best Sellers"
      :hoveredCard="hoveredCard"
      :img="booksCover"
      :hover="hoverCard"
    />
  </div>
</template>

<style scoped>
.image-container {
  display: flex;
  height: 100vh;
  margin-left: 5%;
  overflow: hidden;
}
</style>
