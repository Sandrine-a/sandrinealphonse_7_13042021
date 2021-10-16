<template>

  <div class="main">
    <Header/>
    <div>
      <h1>Posts</h1>
    </div>
    
  </div>
  
</template>

<script>

  import Header from '../components/Header.vue';

  export default {
    name: 'Posts',
    components: {
      Header
    }
  }
</script>

<style lang="scss" scoped>

 @import "@/assets/_variables.scss";



  .main {
    background-color: $primary-color;
  }


</style>