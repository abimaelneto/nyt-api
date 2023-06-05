<script>
import { RouterLink } from "vue-router";
export default {
  data() {
    return {
      people: [],
      loading: false,
      next: null,
      previous: null,
    };
  },
  methods: {
    getPeople(url) {
      this.loading = true;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          this.people = data.results;
          //guardar as referências par as páginas anteriores
          this.next = data.next;
          this.previous = data.previous;
          this.loading = false;
        });
    },
    handlePrevious() {
      this.getPeople(this.previous);
    },
    handleNext() {
      this.getPeople(this.next);
    },
  },
  mounted() {
    this.getPeople("https://swapi.dev/api/people/");
  },
};
</script>

<template>
  <main>
    <p>Previous: {{ previous }}</p>
    >
    <p>Next: {{ next }}</p>
    >
    <h3 v-show="loading">Loading...</h3>

    <table v-show="!loading">
      <tr>
        <th>Name</th>
        <th>Gender</th>
        <th>Height</th>
      </tr>
      <tr v-for="person in people" :key="person.name">
        <td>
          <RouterLink :to="`/people/${person.url.split('/')[5]}`">{{
            person.name
          }}</RouterLink>
        </td>
        <td>{{ person.name }}</td>
        <td>{{ person.gender }}</td>
        <td>{{ person.height }}</td>
      </tr>
    </table>
    <div id="buttons-container">
      <button @click="handlePrevious">Previous</button>
      <button @click="handleNext">Next</button>
    </div>
  </main>
</template>

<style></style>
