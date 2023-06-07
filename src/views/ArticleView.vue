<script>
export default {
  data() {
    return {
      article: {},
    };
  },
  methods: {
    getSection(url) {
      this.loading = true;
      const promise = fetch(url);

      promise
      .then((res) => res.json())
      .then((data) => {
        const { name, birth_year, height, eye_color } = data;
      

          this.person = {
            Name: name,
            "Birth Year": birth_year,
            Height: height,
            "Eye Color": eye_color,
          };
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    //async/await
    async getSection2(url) {
      this.loading = true;

      try {
        const res = await fetch(url);
        const data = await res.json();
    

      const { name, birth_year, height, eye_color } = data;

      this.section = {
        Name: name,
        "Birth Year": birth_year,
        Height: height,
        "Eye Color": eye_color,
      };
    } catch (error) {
      console.log(error);
     } finally {
        this.loading = false;

      }
    }
  },
  mounted() {
    const id = this.$route.params.id;
    this.getArticle2(`https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${this.apiKey}${id}`);
  },
};
</script>

<template>
  <table>
    <tr v-for="(value, label) in person" :key="label">
      <th>{{ label }}</th>
      <td>{{ value }}</td>
    </tr>

    <td>{{ article.name }}</td>
  </table>
</template>

<style scoped>
th {
  font-weight: 600;
}
</style>
