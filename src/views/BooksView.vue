<script>
export default {
  data() {
    return {
      loading: false, // Variável de estado para controlar o carregamento
      apiKey: "DfAI0teJCa28uw06owBfsF00xcyXoW7p",
      topics: [],
      rankings: {}, // Armazena os rankings de livros por categoria
      selectedBookIsbn: null, // Propriedade para armazenar o ISBN do livro selecionado
      openedCategory: "",
    };
  },
  methods: {
    getTopics() {
      this.loading = true; // Define loading como true para exibir a mensagem de loading
      fetch(
        `https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${this.apiKey}`
      )
        .then((res) => res.json())
        .then((data) => {
          const listTopics = data.results.map((lists) => ({
            Category: lists.list_name_encoded,
            Name: lists.display_name,
            ShowRankings: false, // Controle de exibição
          }));

          this.topics = listTopics;
        })
        .finally(() => {
          this.loading = false; // Para de exibir a mensagem quando a pagina está completamente carregada
        });
    },
    getRankings(category) {
      fetch(
        `https://api.nytimes.com/svc/books/v3/lists/current/${category}.json?api-key=${this.apiKey}`
      )
        .then((res) => res.json())
        .then((data) => {
          const rankings = data.results.books.map((book) => ({
            Title: book.title,
            Author: book.author,
            Rank: book.rank,
            Isbn: book.primary_isbn13,
          }));
          this.rankings[category] = rankings;
        });
    },
    openCategory(category) {
      if (this.openedCategory == category) return;
      this.openedCategory = category;
      this.getRankings(category);
    },
    getBookIsbn(isbn) {
      this.selectedBookIsbn = isbn; // Define o ISBN do livro selecionado
    },
  },
  computed: {
    openedCategoryRanking() {
      return this.rankings[this.openedCategory];
    },
  },
  mounted() {
    this.getTopics();
  },
};
</script>

<template>
  <div class="title">
    <h1>Best Sellers</h1>
  </div>
  <div>
    <h3 v-show="loading">Our premium plan is faster...</h3>

    <div v-for="(topic, index) in topics" :key="index">
      <h3 v-show="!loading" @click="openCategory(topic.Category)">
        <li class="options">{{ topic.Name }}</li>
      </h3>

      <ol v-if="openedCategory == topic.Category">
        <li
          class="list"
          v-for="(book, bookIndex) in openedCategoryRanking"
          :key="bookIndex"
        >
          <RouterLink
            :to="`/books/${book.Isbn}`"
            @click="getBookIsbn(book.Isbn)"
          >
            {{ book.Title }} - {{ book.Author }}
          </RouterLink>
        </li>
      </ol>
    </div>
  </div>
</template>

<style scoped>
.title {
  margin-left: 6%;
  font-family: Subway;
  font-weight: bold;
  font-size: 2rem;
  color: rgb(31, 40, 121);
}

h3 {
  display: inline;
  cursor: pointer;

  font-size: larger;
  font-weight: bold;
  color: rgb(75, 84, 161);
}

.options {
  margin-left: 10%;
  padding: 0.5%;
}
.list {
  padding: 4px;
  margin-left: 14%;
}

a,
li {
  text-decoration: none;
}
</style>
