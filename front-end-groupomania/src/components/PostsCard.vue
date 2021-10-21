<template>

  <div class="posts__card">
    <div class="posts__container">
      <article class="posts__content">
        <h3 class="posts__content-title"> {{ datas.title }} </h3>
        <div class="posts__content-article">
          <p class="posts__content">
           {{ datas.content }}
          </p>
        </div>
      </article>
      <div class="posts__buttons" v-if=" this.datas.UserId == this.user.userId " >
        <div class="btn__main">
          <button class="btn__main-modify" type="button"> Modifier </button>
        </div>
        <div class="btn__main">
          <button class="btn__main-delete" type="button" @click="deletePost" > Supprimer </button>
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
      post: {}
    }
  },
  props: {
    datas: Object
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    deletePost() {
      this.$emit('delete-post',  this.datas )
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
      text-align: start;
      &-title{
        color: $text-color-secondary;
      }
    }
    &__container {
      display: flex;
      flex-direction: column;
      padding: 20px;
    }
    &__buttons {
      display: flex;
      justify-content: space-around;
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
  .btn__main{
  height: 40px;
  width: auto;
  min-width: 200px;
  &-modify, &-delete {
    color: white;
    background: $tertiary-color;
    border-radius: 10px;
    height: 100%;
    width: 100%;;
    border: none;
    cursor: pointer;
    font-weight: bold;
    font-size: 4vh;
    }
  }

</style>
