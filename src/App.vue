<template>
  <div class="container bg-white">
    <Navbar class="container"/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  components: {
    Navbar,
  }
};
</script>

<style>
body{
  background: #e6e6e7;
}
.bg-white{
  background-color: white;
}
</style>
