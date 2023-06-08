<script>
export default {
  data() {
    return {
      loading: false, // Variável de estado para controlar o carregamento
      isbn: this.$route.params.isbn,
      bookDetail: {
        coverImage: "", // URL da imagem da capa
      }, // "bookDetail: {}" armazena os detalhes do livro
    };
  },
  created() {
    // Carrega os dados do livro específico com base no ISBN
    this.findBook();
  },
  methods: {
    findBook() {
      this.loading = true; // Define loading como true para exibir a mensagem de loading

      fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${this.isbn}`)
        .then((res) => res.json())
        .then((data) => {
          const book = data.items.find(
            (item) =>
              item.volumeInfo.industryIdentifiers[0].identifier === this.isbn
          );
          this.loading = false; // Para de exibir a mensagem quando a pagina está completamente carregada

          if (book) {
            this.bookDetail = {
              coverImage: book.volumeInfo.imageLinks?.thumbnail || "", // URL da imagem da capa
              Title: book.volumeInfo.title,
              Authors: book.volumeInfo.authors,
              Publisher: book.volumeInfo.publisher,
              "Published Date": book.volumeInfo.publishedDate,
              Description: book.volumeInfo.description,
            };
          }
        });
    },
  },
};
</script>

<template>
  <div>
    <h3 v-show="loading">Carregando...</h3>

    <div v-for="(value, label) in bookDetail" :key="label">
      <template v-show="!loading" v-if="label === 'coverImage'">
        <img :src="value" />
      </template>
      <template v-else> {{ label }}: {{ value }} </template>
    </div>
  </div>
</template>
