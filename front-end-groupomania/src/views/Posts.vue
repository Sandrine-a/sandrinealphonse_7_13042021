<template>

  <div class="main">
    <Header/>

    <h1>Posts</h1>

    <div class="addPost__container">
      <section class="addPost__top">
        <h2 class="addPost__title">Ajouter un post</h2>
        <img src="../assets/groupomania-icon.svg" alt="Logo miniature" class="addPost__logo"/>
      </section>

        <AddPostSelect @click.stop.prevent="switchToWrite" @keyup.enter="switchToWrite"  v-if=" mode == 'read'" />
        <AddPostForm @write-cancel="switchToRead" v-else/>

    </div> 

    <div class="card__column">
      <section class="posts__column" >
        <PostsCard v-for="(item, index) in allPosts" :datas="item" :key="index" @delete-post="deletePost" />
      </section>
    </div>
  </div>
  
</template>

<script>
// @ is an alias to /src
  import { mapState } from 'vuex';

  import Header from '../components/Header.vue';
  import AddPostSelect from '../components/AddPostSelect.vue';
  import AddPostForm from '../components/AddPostForm.vue';
  import PostsCard from '../components/PostsCard.vue';
  

  export default {
    name: 'Posts',
    components: {
      Header,
      PostsCard,
      AddPostSelect,
      AddPostForm,
    },
    data() {
      return {
        posts: [],
        users:[],
        profilesFromPosts: [],
        mode: 'read'
      }
    }, 
    computed: {
      ...mapState(['userAccess', 'allPosts', 'allUsers']),
    },
    created() {
      this.$store.dispatch('getUserParams');

      this.$store.dispatch('getAllPosts');
        
      this.$store.dispatch('getAllUsers');
    },
    mounted() {
      if (!this.userAccess) {
        this.$router.push('/');
        return;
      }
    },
    methods: {
      switchToWrite() {
        this.mode = 'writePost';
        this.$store.dispatch('removePostAttachment')
      },
      switchToRead() {
        this.mode ='read'
      },
      deletePost(post) {
        let result = confirm("Confirmez-vous la suppression?");
        if(result) {
          this.$store.dispatch('deletePost', post )
          .then(() => this.$store.dispatch('getAllPosts'))
          .catch(error => console.log(error));
        }
      }
    }
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
  .posts__column {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
   }

  


</style>