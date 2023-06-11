<script>
export default {
  data() {
    return {
      apiKey: "OCuAzfRfKVr1HDAkN1lCOImvrRs8Rlwm",
      sections: [
        "arts",
        "automobiles",
        /* "business",
        "fashion",
        "food",
        "health",
        "home",
        "insider",
        "magazine",
        "movies",
        "nyregion",
        "obituaries",
        "opinion",
        "politics",
        "realestate",
        "science",
        "sports",
        "sundayreview",
        "technology",
        "theater",
        "t-magazine",
        "travel",
        "upshot",
        "us",
        "world", */
      ],
      articles: {},
      loading: false,
      next: null,
      previous: null,
    };
  },

  created() {
    // para cada tema, buscar artigos
    this.sections.forEach((section) => {
      this.getArticles(section);
    });
  },

  methods: {
    getArticles(section) {
      this.loading = true;
      // fetch() para fazer a solicitação HTTP
      fetch(
        `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${this.apiKey}`
      )
        .then((response) =>
          response.ok ? response.json() : Promise.reject(response)
        )
        .then((data) => {
          let firstFew = this.getFewArticles(data.results);
          this.articles[section] = firstFew; // Substituído por atribuição direta
          this.articles[section].show = false;
          this.loading = false;
        })
        .catch((err) => {
          console.log("Cannot display stories", err);
        });
    },
    toggleSection(section) {
      this.articles[section].show = !this.articles[section].show;
    },
    getFewArticles(articles) {
      return articles.slice(1, 10);
    },
    articlesOrgHTML(str) {
      let temp = document.createElement("div");
      temp.textContent = str;
      return temp.innerHTML;
    },

    handlePrevious() {
      this.getArticles(this.previous);
    },
    handleNext() {
      this.getFewArticles(this.next);
    },
  },
  mounted() {
    this.getArticles(
      "https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${this.apiKey}"
    );
  },
};
</script>

<template>
  <div class="title">
    <h1>Top Stories</h1>
  </div>
  <div id="app">
    <h3 v-show="loading">Carregando...</h3>
    <div v-for="section in sections" :key="section">
      <h2
        style="pointer-events: 1px"
        v-show="!loading"
        @click="toggleSection(section)"
      >
        {{ section }}
      </h2>
      <h3 v-show="!loading" @click="toggleSection(item.Section)"></h3>
      <div
        v-show="this.articles[section]?.show"
        v-for="article in articles[section]"
        :key="article.title"
      >
        <h3>{{ articlesOrgHTML(article.title) }}</h3>
        <p>Article: {{ articlesOrgHTML(article.byline) }}</p>
        <p>Published date: {{ articlesOrgHTML(article.published_date) }}</p>
        <p>Updated date: {{ articlesOrgHTML(article.updated_date) }}</p>
        <p>Abstract: {{ articlesOrgHTML(article.abstract) }}</p>
        <p>Subsection: {{ articlesOrgHTML(article.subsection) }}</p>
        <hr />
      </div>
    </div>
  </div>
  <!--  <div class="loading"></div> -->
</template>
<style scoped>
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
