<script>
export default {
  data() {
    return {
      apiKey: "DfAI0teJCa28uw06owBfsF00xcyXoW7p",
      list: [],
      rankings: {}, // Armazena os rankings de livros por categoria
    };
  },
  methods: {
    getTopics() {
      fetch(`https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${this.apiKey}`)
        .then((res) => res.json())
        .then((data) => {
          const listTopics = data.results.map((lists) => ({
            Category: lists.list_name_encoded,
            Name: lists.display_name,
            ShowRankings: false, // Propriedade de controle de exibição
          }));
          this.list = listTopics;
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
            Rank: book.rank,
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
  },
  mounted() {
    this.getTopics();
  },
};
</script>

<template>
  <div>
    <div v-for="(item, index) in list" :key="index">
      <h3 @click="toggleRankings(item.Category)">
        {{ item.Name }}
      </h3>
      <ol v-if="rankings[item.Category] && item.ShowRankings">
        <li v-for="(book, bookIndex) in rankings[item.Category]" :key="bookIndex">
          {{ book.Title }}
        </li>
      </ol>
      <hr />
    </div>
  </div>
</template>
