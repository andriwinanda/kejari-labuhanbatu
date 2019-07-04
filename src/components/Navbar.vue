<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <img
            src="http://kejari-labuhanbatu.go.id/wp-content/uploads/2017/04/header-RANTAU-3.png"
            alt
          >
        </div>
      </div>
    </section>

    <!-- Navbar -->
    <section class="navigasi">
      <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">

          <a
            role="button"
            class="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            @click="showNav = !showNav"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': showNav }">
          <div class="navbar-start">
            <router-link class="navbar-item" to="/">Beranda</router-link>

          </div>
        </div>
      </nav>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showNav: false
    }
  }
}
</script>

<style>
.hero-body {
  padding: 1.5rem;
}
</style>

