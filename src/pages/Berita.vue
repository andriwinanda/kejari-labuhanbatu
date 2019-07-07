<template>
  <div class="section columns is-multiline">
    <div class="column is-8" style="min-height: 80vh">
      <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="true"></b-loading>
      <div v-if="content && !isLoading" class="isi-berita">
        <h1 class="title is-3">{{content.title}}</h1>
        <div>
          <small>Oleh : {{content.user? content.user: 'admin'}}</small>
          <span class="is-pulled-right">
            <small>Diupload : {{content.dates}}</small>
          </span>
        </div>
        <hr />
        <img :src="content.image" alt />
        <br />
        <!-- Text Content -->
        <p class="has-text-justified" v-html="content.text" />

        <br />
        <!-- <small>Sumber : Kejati Sumut</small> -->

        <vueper-slides
          slide-multiple
          :visible-slides="3"
          :slide-ratio="1/4"
          :bullets="false"
          :arrows-outside="false"
          class="no-shadow gallery"
        >
          <vueper-slide v-for="i in gallery" :key="i.name" :image="i.image"></vueper-slide>
        </vueper-slides>
      </div>
      <!-- Not Found -->
      <div v-else-if="!content && !isLoading" class="not-found">
        <h1 class="title is-1">404</h1>
        <p class="subtitle">Halaman Tidak Tersedia</p>
        <router-link class="button is-primary" to="/webfront">Kembali ke Beranda</router-link>
      </div>
    </div>
    <div class="column is-4 berita-lain" style>
      <p class="title is-5">Berita Terpopuler</p>
      <hr />
      <!-- Media -->
      <article v-for="(artikel) in populer" :key="artikel.id" class="media">
        <figure class="media-left">
          <p class="image is-64x64">
            <img :src="artikel.image" />
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <p class>
              <strong>{{artikel.title}}</strong>
              <br />
              <span v-html="(artikel.text).substring(0,100)+'...'"></span>
              <small>
                <a class="has-text-link" @click="artikel_detail(artikel.id)">Baca Selengkapnya »</a>
              </small>
            </p>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>
<script>
import { VueperSlides, VueperSlide } from "vueperslides";

import "vueperslides/dist/vueperslides.css";
export default {
  components: {
    VueperSlides,
    VueperSlide
  },
  data() {
    return {
      content: null,
      gallery: [],
      populer: [],
      swiperOption: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        pagination: {
          el: ".swiper-pagination"
        }
      },
      isLoading: false,
    };
  },
  methods: {
    artikel_detail(id) {
      this.$router.push(id);
      this.get_article();
    },
    get_article() {
      // Full Artickel
      this.isLoading =true
      let id = this.$route.params.id;
      this.axios
        .get(
          "http://kejari.wamenak.com/index.php/article/get_article/" + id
        )
        .then(res => {
          // this.artikel = res.data.content;
          this.content = res.data.content[0];
          this.gallery = res.data.gallery;
          this.isLoading = false
        })
        .catch(err => {
          console.log(err);
          this.isLoading = false
        });
    }
  },
  mounted() {
    // Get Full Artcle
    this.get_article();

    // Berita Terpopuler
    let body = {
      category_id: "",
      language: "",
      limit: "3",
      start: ""
    };
    this.axios
      .post(
        "http://kejari.wamenak.com/index.php/article/get_article_list",
        body
      )
      .then(res => {
        this.populer = res.data.content;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
.gallery .vueperslide {
  border: 2px solid white;
}
.gallery .vueperslides__arrow {
  color: white;
}
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
.not-found {
  text-align: center;
  margin-top: 5rem;
}
p {
  color: black;
}
a {
  color: #3273dc;
}
</style>

