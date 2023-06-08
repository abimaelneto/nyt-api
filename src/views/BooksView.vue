<script>
export default {
  data() {
    return {
      loading: false, // Variável de estado para controlar o carregamento
      apiKey: "DfAI0teJCa28uw06owBfsF00xcyXoW7p",
      list: [],
      rankings: {}, // Armazena os rankings de livros por categoria
      selectedBookIsbn: null, // Propriedade para armazenar o ISBN do livro selecionado
    };
  },
  methods: {
    getTopics() {
      this.loading = true; // Define loading como true para exibir a mensagem de loading

      fetch(`https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${this.apiKey}`)
        .then((res) => res.json())
        .then((data) => {
          const listTopics = data.results.map((lists) => ({
            Category: lists.list_name_encoded,
            Name: lists.display_name,
            ShowRankings: false, // Controle de exibição
          }));
          this.list = listTopics;
          this.loading = false; // Para de exibir a mensagem quando a pagina está completamente carregada

        });
    },
    getRankings(category) {
      if (this.rankings[category]) {
        // Se já tiver os rankings, não precisa fazer a requisição novamente
        return;
      }
      fetch(`https://api.nytimes.com/svc/books/v3/lists/current/${category}.json?api-key=${this.apiKey}`)
        .then((res) => res.json())
        .then((data) => {
          const rankings = data.results.books.map((book) => ({
            Title: book.title,
            Author: book.author,
            Rank: book.rank,
            Isbn: book.primary_isbn13,
          }));
          this.rankings = {
            ...this.rankings,
            [category]: rankings,
          };
        });
    },
    toggleRankings(category) {
      const item = this.list.find((item) => item.Category === category);
      if (item) {
        item.ShowRankings = !item.ShowRankings;
        if (item.ShowRankings) {
          this.getRankings(category);
        }
      }
    },
    getBookIsbn(isbn) {
      this.selectedBookIsbn = isbn; // Define o ISBN do livro selecionado
    },
  },
  mounted() {
    this.getTopics();    
  },
};
</script>

<template>
  <div>
    <h3 v-show="loading">Carregando...</h3>

    <div v-for="(item, index) in list" :key="index">
      <h3 v-show="!loading" @click="toggleRankings(item.Category)">
        {{ item.Name }}
      </h3>
      <ol v-if="rankings[item.Category] && item.ShowRankings">
        <li v-for="(book, bookIndex) in rankings[item.Category]" :key="bookIndex">
          <RouterLink :to="`/detail/${book.Isbn}`" @click="getBookIsbn(book.Isbn)">
            {{ book.Title }} - {{ book.Author }}
          </RouterLink>
        </li>
      </ol>
      <hr />
    </div>
  </div>
</template>
