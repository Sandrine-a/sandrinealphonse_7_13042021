<template>

  <div class="main">
    <Header/>

    <h1>Posts</h1>
    <div class="card__column">
      <PostsColumn />
    </div>
    
  </div>
  
</template>

<script>

  import Header from '../components/Header.vue';
  import PostsColumn from '../components/PostsColumn.vue'
  

  export default {
    name: 'Posts',
    components: {
      Header,
      PostsColumn
    },
    mounted() {

      if (this.$store.state.user.userId == -1 ) {
        this.$router.push('/');
        return;
      }
      this.$store.dispatch('getUserParams');
    }
  }

</script>

<style lang="scss" scoped>

 @import "@/assets/_variables.scss";

  .main {
    background-color: $bg-color;
  }
  .card__column {
    margin-left: 40px;
    width: 70%;
  }
  


</style>