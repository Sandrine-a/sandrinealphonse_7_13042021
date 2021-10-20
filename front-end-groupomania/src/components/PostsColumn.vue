<template>

  <div class="posts__column">

    <PostsCard v-for="(item, index) in allPosts" :datas="item" :key="index" />

  </div>
  
</template>

<script >
  import {mapState} from 'vuex';

  import PostsCard from '../components/PostsCard.vue';


  export default {
    name: 'PostsColumn',
    components: {
      PostsCard
    },
    computed: {
      ...mapState(['allPosts','user'])
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