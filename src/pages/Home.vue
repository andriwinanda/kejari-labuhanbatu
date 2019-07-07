<template>
  <div>
    <section class="hero is-medium has-carousel">
      <vueper-slides autoplay>
        <vueper-slide v-for="(slide) in slides" :key="slide.id" :image="slide.img"></vueper-slide>
      </vueper-slides>
    </section>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-9">
            <h4 class="title">Artikel</h4>
          </div>
        </div>

        <hr style="margin-top: 0;" />
        <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="true"></b-loading>
        <!-- Album Artikel -->
        <div class="columns is-multiline">
          <div v-for="(artikel) in paginatedData" :key="artikel.id" class="column is-3">
            <a @click="artikel_detail(artikel.id)">
              <div class="card album">
                <div class="card-image">
                  <figure class="image is-16by9">
                    <img :src="artikel.image" class />
                  </figure>
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media-content">
                      <p class="title is-6 has-text-weight-bold">{{artikel.title}}</p>
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
            <div class="level-item">
              <p class="has-text-grey">Hal {{pageNumber+1}} dari {{pageCount}}</p>
            </div>
          </div>
          <!-- Right side -->
          <div class="level-right">
            <div class="level-item buttons">
              <button class="button" :disabled="pageNumber === 0" @click.prevent="previous">Previous</button>
              <button
                class="button"
                :disabled="pageNumber >= pageCount -1"
                @click.prevent="next"
              >Next page</button>
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
          img:
            "http://kejari-labuhanbatu.go.id/wp-content/uploads/ktz/kantor-kejari-lubuk-basung-baru3-33oeqlq5t132uatp1piw3u.jpg"
        },
        {
          id: "slide-2",
          img:
            "http://kejari-labuhanbatu.go.id/wp-content/uploads/ktz/IMG-20180724-WA0035-372z5l41uhxeyyk44n7ife.jpg"
        }
      ],
      berita: [],
      pageNumber: 0,
      dataBerita: [],
      limit: 10,
      isLoading: false
    };
  },
  mounted() {
    this.isLoading = true;
    let body = {
      category_id: "",
      language: "",
      limit: "50",
      start: ""
    };
    this.axios
      .post(
        "http://kejari.wamenak.com/index.php/article/get_article_list",
        body
      )
      .then(res => {
        this.berita = res.data.content;
        this.isLoading = false;
      })
      .catch(err => {
        this.isLoading = false;
        console.log(err);
      });
  },
  methods: {
    artikel_detail(id) {
      this.$router.push("/berita/" + id);
    },
    next() {
      this.pageNumber++;
    },
    previous() {
      this.pageNumber--;
    }
  },
  computed: {
    pageCount() {
      let l = this.berita.length,
        s = this.limit;
      let count = Math.round(l / s);
      return count;
    },
    paginatedData() {
      const start = this.pageNumber * this.limit,
        end = start + this.limit;
      return this.berita.slice(start, end);
    }
  }
};
</script>
<style>
.VueCarousel-slide img {
  width: 100%;
}
.vueperslides__arrow {
  color: white;
}
.bg2 {
  background-color: #f1f1f1;
}
.album:hover {
  box-shadow: 2px 8px 8px 0 rgba(34, 36, 38, 0.12),
    0 2px 10px 0 rgba(34, 36, 38, 0.15);
}
.card-image {
  padding: 1.5rem;
  padding-bottom: 0;
}
</style>


<!-- Add "scoped" attribute to limit CSS to this component only -->

