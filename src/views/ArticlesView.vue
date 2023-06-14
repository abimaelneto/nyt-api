<script>
export default {
  data() {
    return {
      apiKey: "TUQGXgTP3oCtvfzcQHAqLuYQ92Gj4HB7",
      sections: [
        "Arts",
        "Automobiles",
        // "Business",
        // "Fashion",
        // "Food",
        // "Health",
        // "Home",
        // "Insider",
        // "Magazine",
        // "Movies",
        // "Nyregion",
        // "Obituaries",
        // "Opinion",
        // "Politics",
        // "Realestate",
        // "Science",
        // "Sports",
        // "Sundayreview",
        // "Technology",
        // "Theater",
        // "T-magazine",
        // "Travel",
        // "Upshot",
        // "Us",
        // "World",
      ],
      articles: {},
      loading: false,
      searchKeyword: "",
      openSection: "",
    };
  },

  mounted() {
    // para cada tema, buscar artigos
    this.sections.forEach((s) => {
      this.getArticles(s);
    });
  },

  methods: {
    getArticles(section) {
      this.loading = true;
      // fetch() para fazer a solicitação HTTP
      fetch(
        `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${this.apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          let firstTen = this.getFirstTen(data.results);
          this.articles[section] = {
            items: firstTen,
            show: false,
          };
        })
        .catch((err) => {
          console.log("Cannot display stories", err);
        });
      this.loading = false;
    },
    toggleSection(section) {
      this.openSection = section;
    },

    getFirstTen: (array) => array.slice(1, 10),
  },
  computed: {
    openArticles() {
      if (!this.openSection) return [];
      return this.articles[this.openSection].items;
    },
    filteredArticles() {
      return this.openArticles?.filter((article) =>
        article.title.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
    },
  },
};
</script>

<template>
  <button @click="test">test</button>
  <div class="title">
    <h1>Top Stories</h1>
  </div>
  <div>
    <input v-model="searchKeyword" type="text" placeholder="Search Articles" />
    <h3 v-show="loading">You are number 2 in the queue</h3>
    <div class="content">
      <aside>
        <h2
          v-for="section in sections"
          style="pointer-events: 1px"
          v-show="!loading"
          @click="toggleSection(section)"
          :class="{ selected: section == openSection }"
          :key="section"
        >
          {{ section }}
        </h2>
      </aside>
      <article>
        <div v-for="article in filteredArticles" :key="article.title">
          <h3>{{ article.title }}</h3>
          <p>Article: {{ article.byline }}</p>
          <p>Published date: {{ article.published_date }}</p>
          <p>Updated date: {{ article.updated_date }}</p>
          <p>Abstract: {{ article.abstract }}</p>
          <p>Subsection: {{ article.subsection }}</p>
          <hr />
        </div>
      </article>
    </div>
  </div>
  <!--  <div class="loading"></div> -->
</template>
<style scoped>
.selected {
  color: green;
}

.content {
  display: flex;
  height: 60vh;
}
aside {
  display: flex;
  flex-direction: column;
  background-color: lightgray;
  width: 30%;
}

article {
  width: 70%;
  background-color: gray;
  height: 100%;
  overflow: auto;
}
.title {
  margin-left: 6%;
  font-family: Subway;
  font-weight: bold;
  font-size: 2rem;
  color: rgb(31, 40, 121);
}
h2 {
  display: inline;
  cursor: pointer;
  margin-left: 11%;

  color: rgb(75, 84, 161);
}

h3 {
  display: inline;
  margin-left: 15%;
  font-size: larger;
  color: rgb(62, 9, 208);
}
p {
  margin-left: 15%;
  color: rgb(0, 0, 0);
}
/* inserção de Entity*/
h2:before {
  content: " \2022  ";
  padding-right: 15px;
}
input {
  margin-left: 20px;
  height: 25px;
  width: 250px;
  background-color: rgb(194, 190, 190);
  font-size: medium;
  margin-bottom: 30px;
}

/* .loading {
  border: 16px solid #f3f3f3;
  border-top: 16px solid black;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
} */

/* ::marker { 
  color: black;
} */
</style>
