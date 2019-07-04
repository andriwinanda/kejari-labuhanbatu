<template>
  <div>
    <section class="hero is-medium has-carousel">
      <vueper-slides autoplay>
        <vueper-slide v-for="(slide) in slides" :key="slide.id" :image="slide.img"></vueper-slide>
      </vueper-slides>
    </section>
    <section class="section">
      <div class="container">
        <div class="columns is-multiline">
          <div class="column">
            <h4 class="title">Artikel</h4>
          </div>
          <div class="column">
            <b-field horizontal label="Urutkan:" class="control is-pulled-right" expanded>
              <b-select placeholder="Urut berdasarkan">
                <option value="1">Popularitas</option>
                <option value="2">Tanggal</option>
              </b-select>
            </b-field>
          </div>
        </div>
        <hr style="margin-top: 0;" />
        <!-- Album Artikel -->
        <div class="columns is-multiline">
          <div v-for="(artikel) in berita" :key="artikel.id" class="column is-3">
            <a href="berita.html">
              <div class="card album">
                <div class="card-image">
                  <img :src="artikel.image" class="image is-480x480" />
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media-content">
                      <p class="title is-6 has-text-centered">{{artikel.title}}</p>
                      <p v-html="(artikel.text).substring(0,200)+'...'"></p>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
        <hr />
        <!-- Pagination -->
        <nav class="level is-mobile">
          <!-- Left side -->
          <div class="level-left">
            <div class="level-item"></div>
          </div>
          <!-- Right side -->
          <div class="level-right">
            <div class="level-item buttons">
              <a class="button" @click.prevent="previous">Previous</a>
              <a class="button" @click.prevent="next">Next page</a>
            </div>
          </div>
        </nav>
      </div>
    </section>
  </div>
</template>

<script>
import { VueperSlides, VueperSlide } from "vueperslides";

import "vueperslides/dist/vueperslides.css";
export default {
  components: {
    // Carousel,
    // Slide,
    // Swiper
    // swiper,
    // swiperSlide
    VueperSlides,
    VueperSlide
  },
  data() {
    return {
      swiperOption: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        pagination: {
          el: ".swiper-pagination"
        }
      },
      slides: [
        {
          id: "slide-1",
          title: 'Slide <b style="font-size: 1.3em;color: yellow">#1</b>',
          content:
            'Slide title can be HTML.<br>And so does the slide content, <span style="font-size: 1.2em;color: yellow">why not?</span>',
          img:
            "http://kejari-labuhanbatu.go.id/wp-content/uploads/ktz/IMG-20180724-WA0035-372z5l41uhxeyyk44n7ife.jpg"
        },
        {
          id: "slide-2",
          title: 'Slide <b style="font-size: 1.3em;color: yellow">#1</b>',
          content:
            'Slide title can be HTML.<br>And so does the slide content, <span style="font-size: 1.2em;color: yellow">why not?</span>',
          img:
            "http://kejari-labuhanbatu.go.id/wp-content/uploads/ktz/IMG-20180724-WA0035-372z5l41uhxeyyk44n7ife.jpg"
        }
      ],
      berita: []
    };
  },
  mounted() {
    let data = {
      category_id: "",
      language: "",
      limit: "50",
      start: ""
    };
    this.axios
      .post("http://kejari.wamenak.com/index.php/article/get_article_list", data)
      .then(res => {
        this.berita= res.data.content
      })
      .catch(err => {
        console.log(err)
      });
  }
};
</script>
<style>
.VueCarousel-slide img {
  width: 100%;
}
.bg2 {
  background-color: #f1f1f1;
}
.album:hover {
  box-shadow: 2px 8px 8px 0 rgba(34, 36, 38, 0.12),
    0 2px 10px 0 rgba(34, 36, 38, 0.15);
}
</style>


<!-- Add "scoped" attribute to limit CSS to this component only -->

