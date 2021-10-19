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
  import PostsColumn from '../components/PostsColumn.vue';

  

  export default {
    name: 'Posts',
    components: {
      Header,
      PostsColumn
    },
    data() {
      return {
        user: '',
        posts: [
          
        ],
      }
    },
    mounted() {
      if (this.$store.state.user.userId == -1 ) {
        this.$router.push('/');
        return;
      }
      this.$store.dispatch('getUserParams');
      this.$store.dispatch('getAllPosts');
    },
/*     computed: {
      ...mapState({
        user: 'userInfos',
        userParams: 'user'
      })
    }, */
/*     setup() {
      class Post {
        constructor(title, content, attachment, comments, likes,) {
          this.title = title,
          this.content = content,
          this.comments = comments,
          this.likes = likes
        }
      }
      let test = new Post('Premier post');
      console.log(test);
    }, */
    methods: {
/*       getAllPosts()  {
        this.posts = ['test', "blabla", null, 0, 0]
        axios.get('http://localhost:3000/api/posts')
        .then(res => console.log(res));
      } */
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