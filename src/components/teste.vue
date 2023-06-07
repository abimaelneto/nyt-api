<script>
export default {
  data() {
    return {
      apiKey: "DfAI0teJCa28uw06owBfsF00xcyXoW7p",
      categorias: ["combined-print-and-e-book-fiction", "combined-print-and-e-book-nonfiction", "young-adult"],
      livros: {
        info: [],
      },
    };
  },
  methods: {
    async getBooks(categoria) {
      const response = await fetch(
        `https://api.nytimes.com/svc/books/v3/lists/current/${categoria}.json?api-key=${this.apiKey}`
      );
      const data = await response.json();
      const topRank = this.getTopLivros(data.results.books, categoria);
      this.livros.info.push({
        Categoria: categoria,
        Livros: topRank,
        showRankings: false,
      });
    },
    getTopLivros(livros, categoria) {
      return livros.slice(0, 10).map((livro) => ({
        Título: livro.title,
        "Autor(a)": livro.author,
        Ranking: livro.rank,
      }));
    },
  },
  mounted() {
    this.categorias.forEach((categoria) => {
      this.getBooks(categoria);
    });
  },
};
</script>

<template>
  <div>
    <div v-for="categoria in livros.info" :key="categoria.Categoria">
      <h2 @click="categoria.showRankings = !categoria.showRankings">{{ categoria.Categoria }}</h2>
      <div v-show="categoria.showRankings">
        <div v-for="livro in categoria.Livros" :key="livro.Título">
          <div v-for="(value, label) in livro" :key="label">
            {{ label }}: {{ value }}
          </div>
          <hr color="lightgreen" />
        </div>
      </div>
    </div>
  </div>
</template>