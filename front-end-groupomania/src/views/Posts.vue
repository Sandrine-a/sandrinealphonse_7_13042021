<template>

  <div class="main">
    <Header/>

    <h1>Posts</h1>

    <div class="addPost__container">
      <section class="addPost__top">
        <h2 class="addPost__title">Ajouter un post</h2>
        <img src="../assets/groupomania-icon.svg" alt="Logo miniature" class="addPost__logo"/>
      </section>

        <AddPostSelect @click="switchToWrite" @keyup.enter="switchToWrite"  v-if=" mode == 'read'"/>
        <AddPostForm @write-cancel="switchToRead" v-else/>

    </div> 

    <div class="card__column">
      <PostsColumn />
    </div>
    
  </div>
  
</template>

<script>
// @ is an alias to /src
  import {mapState} from 'vuex';

  import Header from '../components/Header.vue';
  import PostsColumn from '../components/PostsColumn.vue';
  import AddPostSelect from '../components/AddPostSelect.vue';
  import AddPostForm from '../components/AddPostForm.vue';
  

  export default {
    name: 'Posts',
    components: {
      Header,
      PostsColumn,
      AddPostSelect,
      AddPostForm 
    },
    data() {
      return {
        posts: [],
        mode: 'read'
      }
    }, 
    computed: {
      ...mapState(['user', 'allPosts'])
    },
    created() {
      this.$store.dispatch('getUserParams');
      this.$store.dispatch('getAllPosts');
    },
    mounted() {
      if (this.$store.state.user.userId == -1 ) {
        this.$router.push('/');
        return;
      }
    },
    methods: {
      switchToWrite() {
        this.mode = 'writePost'
      },
      switchToRead() {
        this.mode ='read'
      }
    }/* ,
    props  {
      title: '',
      content:'',
      attachment:'',
      likes:'',
      comments:'',
      userId:''
    } */
  }

</script>

<style lang="scss" scoped>

 @import "@/assets/_variables.scss";

  .main {
    background-color: $bg-color;
  }
  .addPost{
  &__top {
    display: flex;
    justify-content: space-between;
  }
  &__container {
    margin-left: 40px;
    margin-bottom: 30px;
    text-align: start;
    background-color: white;
    border-radius: 25px;
    border: 2px solid $secondary-color;
    padding: 0 20px 20px;
    width: 60%;
  }
  &__title {
    color: $tertiary-color;
  }
  &__logo {
    width: 50px;
  }
}
  .card__column {
    margin-left: 40px;
    width: 70%;
  }
  


</style>