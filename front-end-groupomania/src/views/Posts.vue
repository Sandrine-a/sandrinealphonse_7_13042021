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
    },
    mounted() {
      console.log(this.$store.state.user);
      if (this.$store.state.user.userId == -1 ) {
        this.$router.push('/');
        return;
      }
      this.$store.dispatch('getUserProfile')
    }
  }

</script>

<style lang="scss" scoped>

 @import "@/assets/_variables.scss";



  .main {
    background-color: $primary-color;
  }


</style>