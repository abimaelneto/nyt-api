<script>
export default {
  data() {
    return {
      loading: false, // Variável de estado para controlar o carregamento
      isbn: this.$route.params.isbn,
      bookDetail: {},
      bookDescription: "",
      coverImage: "",
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
          const { items, totalItems } = data;
          if (totalItems == 0) return;

          const [book] = items;

          const {
            title,
            authors,
            publisher,
            publishedDate,
            imageLinks,
            description,
          } = book.volumeInfo;

          this.bookDetail = {
            Title: title,
            Authors: authors,
            Publisher: publisher,
            "Published Date": publishedDate,
          };
          this.coverImage = imageLinks?.thumbnail; // URL da imagem da capa
          this.bookDescription = description;
        })
        .finally(() => {
          this.loading = false; // Para de exibir a mensagem quando a pagina está completamente carregada
        });
    },
  },
};
</script>

<template>
  <div>
    <h3 class="load-message" v-show="loading">
      Let's hope it's worth the wait...
    </h3>

    <div v-show="!loading">
      <img class="cover" :src="coverImage" />
    </div>
    <table>
      <tr v-for="(value, label) in bookDetail" :key="label">
        <th>{{ label }}:</th>
        <td>{{ value }}</td>
      </tr>
      <tr>
        <th>Description</th>
        <div id="description">
          {{ bookDescription }}
        </div>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.cover {
  display: block;
  margin: 2rem auto 1rem;
  height: 300px;
}
table {
  display: grid;
  place-items: center;

  padding-inline: 10rem;
}

th {
  font-size: larger;
  font-weight: 700;
  color: rgb(48, 54, 105);
}
td {
  font-size: medium;
  color: rgba(0, 0, 0, 0.89);
  background-color: lightgray;
}
.load-message {
  color: rgb(75, 84, 161);
}

#description {
  background-color: lightgray;

  max-height: 200px;
  overflow: auto;
}
</style>
