<script>

export default {
  data() {
    return {
      apiKey: 'OCuAzfRfKVr1HDAkN1lCOImvrRs8Rlwm',
      sections: ['arts','automobiles','business','fashion','food','health','home','insider','magazine', 'movies','nyregion','obituaries','opinion','politics','realestate','science','sports','sundayreview','technology','theater','t-magazine','travel','upshot','us','world'],
      articles: {},
      loading: false,
      next: null,
      previous: null,

    };
  },

  created() {
// para cada tema, buscar artigos
    this.sections.forEach(section => {
      this.getArticles(section);
    });
  }, 

  methods: {
    getArticles(section) {
// fetch() para fazer a solicitação HTTP
      fetch(`https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${this.apiKey}`)
        .then(response => response.ok ? response.json() : Promise.reject(response))
        .then(data => {
          let firstFew = this.getFewArticles(data.results);
          this.articles[section] = firstFew; // Substituído por atribuição direta
          
        })
        .catch(err => {
          console.log('Cannot display stories', err);
        })
    },
    getFewArticles(articles) {
      return articles.slice(1, 10);
    },
    articlesOrgHTML(str) {
      let temp = document.createElement('div');
      temp.textContent = str;
      return temp.innerHTML;
    },


    handlePrevious() {
      this.getArticles(this.previous);
    },
    handleNext() {
      this.getFewArticles(this.next);
    },
  },
  mounted() {
    this.getArticles("https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${this.apiKey}");
  }, 
};

</script>


<template>

    <div id="app">
      <div v-for="section in sections" :key="section">
        <h2>{{ section }}</h2>
        <article v-for="article in articles[section]" :key="article.title">
          <h3>{{ articlesOrgHTML(article.title) }}</h3>
          <p>Article: {{ articlesOrgHTML(article.byline) }}</p>
          <p>Published date: {{ articlesOrgHTML(article.published_date) }}</p>
          <p>Updated date: {{ articlesOrgHTML(article.updated_date) }}</p>
          <p>Abstract: {{ articlesOrgHTML(article.abstract) }}</p>
          <p>Subsection: {{ articlesOrgHTML(article.subsection) }}</p>
        </article>

      </div>
    </div>
    
    <div id="buttons-container">
      <button @click="handlePrevious">Previous</button>
      <button @click="handleNext">Next</button>
    </div>

  </template>
  
  <style>
  
h2 {
  color: rgb(14, 14, 199);
}

h3 {
  color: green;
  font-size: 18px;

}

@media print {
  text {page-break-after: auto}
}



</style>
