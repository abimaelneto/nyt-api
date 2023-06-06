<script>
export default {
  data() {
    return {
      apiKey: "DfAI0teJCa28uw06owBfsF00xcyXoW7p",
      books: {
        info: [],
      },
    };
  },
  methods: {
    getBooks() {
      fetch(
        `https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?title=%20&api-key=${this.apiKey}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const bookDetails = data.results.map((book) => ({
            Título: book.title,
            Autor: book.author,
            Sinopse: book.description,
          }));
          this.books.info = bookDetails;
        });
    },
  },
  computed: {},
  mounted() {
    this.getBooks();
  },
};
</script>

<template>
  <div>
    <div v-for="(book, index) in books.info" :key="index">
      <div v-for="(value, label) in book" :key="label">
        {{ label }}: {{ value }}
      </div>
      <hr />
    </div>
  </div>
</template>