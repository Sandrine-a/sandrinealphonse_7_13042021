<template>

  <div class="posts__column">

    <PostsCard v-for="(post, index) in 5" :key="index"/>

  </div>
  
</template>

<script >
  import PostsCard from '../components/PostsCard.vue';


  export default {
    name: 'PostsColumn',
    components: {
      PostsCard
    }

}
</script>

<style lang="scss" scoped>
   @import "@/assets/_variables.scss";

   .posts__column {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
   }


</style>