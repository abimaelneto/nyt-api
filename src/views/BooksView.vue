<script>
export default {
  data() {
    return {
      apiKey: 'DfAI0teJCa28uw06owBfsF00xcyXoW7p',
      books: {
        info: {}
      }
    };
  },
  mounted() {
    this.getBooks();
  },
  methods: {
    getBooks() {
      fetch(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${this.apiKey}`)
        .then((res) => res.json())
        .then((data) => {
          this.books.info = {
            "Display Name": data.results.display_name,
            "Bestsellers Date": data.results.bestsellers_date,
            "Published Date": data.results.published_date,
          };
        });
    },
  },
};
</script>

<template>
  <div>
    <div v-for="(value, label) in books.info" :key="label">
      {{ label }}: {{ value }}
    </div>
  </div>
</template>