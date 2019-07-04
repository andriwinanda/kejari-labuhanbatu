<template>
  <div class="section columns is-multiline">
    <div class="column is-8">
      <div class="isi-berita">
        <h1 class="title is-3">{{content.title}}</h1>
        <div>
          <small>Oleh : {{content.user? content.user: 'admin'}} </small>
          <span class="is-pulled-right">
            <small>Diupload : {{content.dates}}</small>
          </span>
        </div>
        <hr />
        <img :src="gallery.image" alt />
        <br />
        <!-- Text Content -->
        <p class="has-text-justified" v-html="content.text"/>
       
        <br />
        <!-- <small>Sumber : Kejati Sumut</small> -->
      </div>
    </div>
    <div class="column is-4 berita-lain" style>
      <p class="title is-5">Berita Terpopuler</p>
      <hr />
      <!-- Media -->
      <article v-for="(artikel) in populer" :key="artikel.id"  class="media">
        <figure class="media-left">
          <p class="image is-64x64">
            <img :src="artikel.image" />
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <p class="">
              <strong>{{artikel.title}}</strong>
              <br />
              <span v-html="(artikel.text).substring(0,100)+'...'"></span>
              <small>
                <a class="has-text-link"  @click="artikel_detail(artikel.id)">Baca Selengkapnya »</a>
              </small>
            </p>
          </div>
        </div>
      </article>

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: {},
      gallery: [],
      populer: []
    };
  },
  methods:{
    artikel_detail(id) {
      this.$router.push(id)
      this.get_article();
    },
    get_article(){
      // Full Artickel
    let id = this.$route.params.id;
    this.axios
      .get(
        "http://kejari.wamenak.com/index.php/article/get_article/" + id,
        // {
      )
      .then(res => {
        // this.artikel = res.data.content;
        this.content= res.data.content[0]
        this.gallery= res.data.gallery[0]
        console.log(res.data.content[0].title)
      })
      .catch(err => {
        console.log(err);
      });
    }
  },
  mounted() {
    // Get Full Artcle
    this.get_article()

    // Berita Terpopuler
    let body = {
      category_id: "",
      language: "",
      limit: "3",
      start: ""
    };
    this.axios
      .post("http://kejari.wamenak.com/index.php/article/get_article_list",body)
      .then(res => {
        this.populer = res.data.content;
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
.section {
  padding-top: 2rem;
}
.berita-lain {
  border-left: 1px solid gainsboro;
  padding: 1rem;
  padding-left: 2rem;
}

.isi-berita p {
  text-indent: 2rem;
  padding-top: 1.5rem;
}

@media only screen and (max-width: 780px) {
  .berita-lain {
    padding: 0.75rem !important;
    border-left: none;
  }
}

@media only screen and (min-width: 780px) {
  .isi-berita {
    padding-right: 1rem !important;
  }
}

p {
  color: black;
}
a{
  color: #3273dc
}
</style>

