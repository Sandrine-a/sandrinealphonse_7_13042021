<template>


  <div class="posts__card">
    <div class="posts__container" v-if=" mode == 'read'">
      <article class="posts__content">
        <h3 class="posts__content-title"> {{ datas.title }} </h3>
        <div class="posts__attachment" v-if=" datas.attachment" >
          <img :src="datas.attachment" class="posts__attachment-img" >
        </div>
        <div class="posts__content-article">
          <p class="posts__content-paragraph">
            {{ datas.content }}
          </p>
        </div>
        <div class="posts__author" v-if="getAuthor == 'authorOk'">
          <div class="posts__author-avatar" v-if="author.pPicture != null ">
            <img :src="author.pPicture" class="posts__author-pPicture" alt="Avatar de l'auteur du post"/>
          </div>
          <p class="posts__author-name" >  {{ this.author.firstName }} {{this.author.lastName }} </p>
        </div>
      </article>
      <div class="posts__buttons" v-if=" this.datas.UserId == this.userAccess.userId || this.userAccess.isAdmin" >
        <div class="btn__card">
          <button class="btn__card-modify" type="button" @click.stop.prevent="updatePost"> Modifier </button>
        </div>
        <div class="btn__card">
          <button class="btn__card-delete" type="button" @click.stop.prevent="deletePost" > Supprimer </button>
        </div>
      </div>
      <section class="posts__reactions">
        <div class="posts__comments">
          <section class="posts__comments-total">
            <a @click.stop.prevent="isHidden = !isHidden"> 
              <p >
                {{commentsLength}} commentaire<span v-if="commentsLength > 1" >s</span>
              </p>
            </a>
          </section>
          <form class="posts__comments-input" >
            <p class="comments__field">
              <label for="reaction" class="comments__label"></label>
                <input type="text" v-model="reaction" class="comments__textarea" id="reaction"  placeholder="Commenter">   
            </p>
            <div class="comments__controls" v-if=" action == 'commenting'">
              <button class="comments__controls-validate" @click.stop.prevent="sendComment" >
                <fa icon="check-square" class="icon__validateCom"/>
              </button>
                <button type="reset" class="comments__controls-cancel" >
                <fa icon="window-close" class="icon__cancelCom"/>
              </button>
            </div>
          </form >
          <section class="posts__comments-render" v-if="!isHidden">
            <div class="comments__content" v-for="item in allComments" :key="item">
              <div class="comments__content-items">
                <div v-for="user in this.allUsers" :key="user" class="comments__content-author">
                  <img v-if="user.id == item.UserId && user.pPicture != null" :src="user.pPicture" class="comments__content-pPicture" alt="Avatar de l'auteur du commentaire" />
                  <fa icon="user-alt-slash" v-if="user.id == item.UserId && user.pPicture == null"  class="comments__content-icon" />
                  <p class="comments__content-identity" v-if="user.id == item.UserId">
                    {{ user.firstName }} {{ user.lastName }}
                  </p>
                </div>
                <p class="comments__content-text">
                  {{ item.content}}
                </p>
              </div>
              <div class="comments__content-delete" v-if="item.UserId == this.userAccess.userId || this.userAccess.isAdmin " @click.stop.prevent="deleteComment(item)">x</div>
            </div>
          </section>
        
        </div>
      </section>
    </div>
    <div class="posts__form" v-else >
      <UpdatePostForm  @write-cancel="switchToRead" v-for="infos in post" :key="infos" :infos="infos"/> 
    </div>
  </div>
  
</template>

<script>
// @ is an alias to /src
  import {mapState} from 'vuex'; 
  import UpdatePostForm from '../components/UpdatePostForm.vue'

export default {
  name: "PostsCard",
  components: {
    UpdatePostForm
  },
  data() {
    return {
      post: {},
      author: '',
      mode: 'read',
      reaction:'',
      allComments: [],
      isHidden: true,
      getAuthor: '',
      action:''
    }
  },
  props: {
    datas: Object
  },
  computed: {
    ...mapState(['userAccess', 'userInfos', 'allUsers','comment']),
    commentsLength() {
      return this.allComments.length
    }
  },
  watch: {
    reaction() {
      return this.action = 'commenting'
    }
  },
  created() {
    this.getProfileFromPost();
    this.getAllComments();
  },
  methods: {
    getProfileFromPost() {
      for(let user of this.allUsers){
       if(user.id == this.datas.UserId) {
          this.author = user
          this.getAuthor = 'authorOk';
       }
      }
    },
    updatePost() {
      this.$store.dispatch('getOnePost', {id: this.datas.id})
      .then((response) => {
        this.post = response.data;
        this.mode = 'updating'})
      .catch(error => console.log(error));
    },
    switchToRead() {
      this.mode ='read'
    },
    deletePost() {
      let result = confirm("Confirmez-vous la suppression du Post?");
      if(result) {
        this.$store.dispatch('deletePost', this.datas )
        .then(() => this.$store.dispatch('getAllPosts'))
        .catch(error => console.log(error));
      }
    },
    getAllComments() {
      this.$store.dispatch('getAllComments', {postId: this.datas.id})
      .then(response => this.allComments = response.data)
    },
    sendComment() {
      this.$store.dispatch('sendComment', {postId: this.datas.id, userId: this.userAccess.userId, content: this.reaction})
      .then(()=> {
        this.resetInput()
        this.getAllComments()
        this.isHidden = false
      })
      .catch(error => console.log(error))
    },
    resetInput() {
      this.reaction = ''
    },
    deleteComment(com) {
      this.$store.dispatch('deleteComment', com)
      .then(()=> this.getAllComments())
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
      font-weight: bold;
      font-style: italic;
      height: 50px;
      display: flex;
      justify-content: flex-end;
      &-avatar {
        height: 100%;
        width: 50px;
        margin-right: 10px;
        border-radius: 50px;
        overflow: hidden;
      }
      &-pPicture {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    &__container {
      display: flex;
      flex-direction: column;
      padding: 30px;
    }
    &__form{
      padding: 30px;
    }
    &__buttons {
      display: flex;
      justify-content: space-around;
      margin-top: 20px;
    }
    &__reactions {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      margin-top: 10px;
      width:100%;
      &-likes {
        align-self: flex-end;
        padding-top: 5px;
        padding-right: 20px;
        width: 30px;
        height: 30px;
      }
      &-icon {
        height: 100%;
        width: 100%;
      }
    }
    &__comments {
      width: 100%;
      display: flex;
      flex-direction: column;
      &-total {
        text-align: start;
        margin-bottom: 0;
        cursor: pointer;
        max-width: 138px;
        &:hover {
          text-decoration: underline;
        }
      }
      &-render {
        margin-top: 15px;
      }
    }
  }
  .comments {
    &__field {
        margin-bottom: 2px;
      }
    &__textarea {
      width: 100%;
      border-bottom: none;
      border-right: none;
      border-top: 1px solid black;
      min-height: 40px;
      &::placeholder{
        color: $text-color-secondary;
        font-style: italic;
        padding-left: 10px;
      }

    }
    &__controls {
      display: flex;
      cursor: pointer;
      height: 20px;
      &-cancel, &-validate {
        cursor: pointer;
        border: none;
        color: $secondary-color;
        background-color: white;
        border-radius: 15px;
      }
    }
    &__content {
      background-color: $primary-color;
      color:$text-color-secondary;
      padding-left: 20px;
      border-radius:15px;
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
      &-items {
        text-align: start;
      }
      &-delete {
        cursor: pointer;
        padding-right: 10px;
      }
      &-pPicture, &-icon {
        width: 40px;
        height: 40px;
        margin-top: 6px;
        margin-right: 6px;
        object-fit: contain;
        color: $secondary-color;
      }
      &-author {
        font-weight: bold;
        margin-bottom: 0;
        display: flex;
      }
      &-text {
        margin-top: 0;
      }
    }
  }
  .icon{
    &__validateCom, &__cancelCom{
      width: 40px;
      height: 100%;
      &:hover {
        color: $tertiary-color;
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
    font-size: 1.2rem;
    }
  }
  @media all and (max-width: 768px) {
    .posts {
      &__buttons {
        flex-direction: column;
        height: 100px;
      }
      &__attachment {
        height: auto;
        &-img {
          object-fit: contain;
        }
      }
    }
    .comments {
      &__content {
        &-identity {
          font-size: 0.8rem;
        }
      }
    }
  }


</style>
