<template>


  <div class="posts__card">
    <div class="posts__container">
      <article class="posts__content">
        <h3 class="posts__content-title"> {{ datas.title }} </h3>
        <div class="posts__attachment" v-if=" datas.attachment " >
          <img :src="datas.attachment" class="posts__attachment-img" >
        </div>
        <div class="posts__content-article">
          <p class="posts__content-paragraph">
            {{ datas.content }}
          </p>
        </div>

        <div class="posts__author">
          <p class="posts__author-name" >  {{ this.author.firstName }} {{this.author.lastName }} </p>
        </div>

      </article>
      <div class="posts__buttons" v-if=" this.datas.UserId == this.userAccess.userId " >
        <div class="btn__card">
          <button class="btn__card-modify" type="button"> Modifier </button>
        </div>
        <div class="btn__card">
          <button class="btn__card-delete" type="button" @click="deletePost" > Supprimer </button>
        </div>
      </div>
      <section class="posts__reactions">
        <div class="posts__reactions-comments">
          <p>
            0 commentaire
          </p>
        </div>
        <div class="posts__reactions-likes">
          <fa icon="heart" class="posts__reactions-icon"/>
        </div>
      </section>

    </div>
    
  </div>
  
</template>

<script>
// @ is an alias to /src
  import {mapState} from 'vuex'; 

export default {
  name: "PostsCard",
  data() {
    return {
      post: {},
      allUsersTab: [],
      author: ''
    }
  },
  props: {
    datas: Object,
    user: Object
  },
  computed: {
    ...mapState(['userAccess', 'userInfos', 'allUsers']),
  },
  created() {
    this.getProfileFromPost()
    console.log(this.author);
  },
  methods: {
    deletePost() {
      this.$emit('delete-post', this.datas )
    },
    getProfileFromPost() {
      for(let user of this.allUsers){
        console.log(user.id);
       if(user.id == this.datas.UserId) {
         console.log(user);
          this.author = user
       }
      }
    }
  }


}
</script>

<style lang="scss" scoped>

 @import "@/assets/_variables.scss";

  .posts {
    &__card {
      margin-bottom: 50px;
      background-color: white;
      border-radius: 25px;
      border: 2px solid $secondary-color;
      width: 100%;
    }
    &__content {
      &-title{
        text-align: start;
        color: $text-color-secondary;
      }
      &-paragraph {
        text-align: start;
      }
    }
    &__attachment {
      height: 450px;
      &-img {
        object-fit: cover;
        width: 100%; 
        height: 100%;     }
    }
    &__author {
      text-align: start;
      font-weight: bold;
      font-style: italic;
    }
    &__container {
      display: flex;
      flex-direction: column;
      padding: 30px;
    }
    &__buttons {
      display: flex;
      justify-content: space-around;
      margin-top: 20px;
    }
    &__reactions {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      &-likes {
        padding-top: 15px;
        padding-right: 20px;
        width: 30px;
        height: 30px;
      }
      &-icon {
        height: 100%;
        width: 100%;
      }
    }
  }
  .btn__card{
  height: 30px;
  width: auto;
  min-width: 200px;
  &-modify, &-delete {
    color: white;
    background: $tertiary-color;
    border-radius: 10px;
    height: 100%;
    width: 70%;;
    border: none;
    cursor: pointer;
    font-weight: bold;
    font-size: 4vh;
    }
  }

</style>
