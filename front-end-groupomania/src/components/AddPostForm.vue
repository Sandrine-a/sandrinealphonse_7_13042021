<template>
  <form class="post__form"> 

      <div class="post__form-input">
        <label for="title" class="input__label"> </label>
          <input v-model="title" class="input__field" type="text" id="text" placeholder="Titre de la publication * " autofocus required>
      </div>
      <div class="post__form-input">
        <label for="content" class="input__label"></label>
          <textarea v-model="content" class="input__field" type="mail" id="content" placeholder="Taper votre texte ici"></textarea>     
      </div>
      
        <attachmentInputPost v-model="attachment" />

      <div class="post__form-buttons">
        <div class="btn__post">
          <button @click.stop.prevent="sendPost" class="btn__post-send" type="button"> Envoyer </button>
        </div>
        <div class="btn__post">
          <button class="btn__post-cancel" type="button" @click.stop.prevent="cancelWrite" > Annuler </button>
        </div>
      </div>

  </form>
  
</template>

<script>
// @ is an alias to /src
  import {mapState} from 'vuex';
  import attachmentInputPost from '../components/AttachmentInputPost.vue'

  export default {
    name: 'AddPostForm',
    components: {
      attachmentInputPost
    },  
    data() {
      return {
        title: '',
        content:'',
        userId:''
      }
    },    
    computed: {
        ...mapState(['userAccess','status','attachment']),
    },
    methods: {
      async sendPost(post) {
        console.log(this.attachment);
        try {
          if(this.attachment) {
            console.log('ATTACHMENT FONCTION');
            console.log(this.attachment.name);
            post = {
            title: this.title,
            content: this.content,
            attachment: this.attachment,
            userId: this.userAccess.userId
            }
          await this.$store.dispatch('sendPost', post)
          .then(() => this.$store.dispatch('getAllPosts'))
          .then(() => this.cancelWrite())
          .then(() => this.succesAlert())
          .catch(error => console.log(error)); 

          } else {
            console.log('PAS ATTACH');
            post = {
              title:  this.title,
              content: this.content,
              attachment: null,
              userId: this.userAccess.userId
            }
            await this.$store.dispatch('sendPost', post)
            .then(() => this.$store.dispatch('getAllPosts'))
            .then(() => this.cancelWrite())
            .then(() => this.succesAlert())    

          }

        } catch(error) {
          console.log(error);
        }

        

/* 
        this.$store.dispatch('sendPost', {
          title: this.title,
          content: this.content,
          userId: this.userAccess.userId,
          attachment: formData
        })
        .then(() => this.$store.dispatch('getAllPosts'))
        .then(() => this.cancelWrite())
        .then(() => this.succesAlert())
        .catch(error => console.log(error)); */

      },
      succesAlert() {
        this.$emit('succes-status')
      },
      cancelWrite () {
        this.$emit('write-cancel', { mode: 'read' })
      }
    }

  }

</script>

<style lang="scss" scoped>

 @import "@/assets/_variables.scss";

 .post__form {
   display: flex;
   flex-direction: column;
   justify-content: space-between; 
   min-height: 350px;
    
   &-input {
     display: flex;
     flex-direction: column;
     width: 80%;
   }
   &-buttons {
      display: flex;
      justify-content: space-between;
      width: 60%;
    }
 }
 .input{
   &__label {
     color: $text-color-secondary;
   }
  &__field{
    background-color: white;
    border: 2px black solid;
    border-radius: 10px;
    min-height: 30px;
  }
 }
 #text {
   font-weight: bold;
   font-size: 4vh;
   &::placeholder{
     color: $text-color-secondary;
   }
 }
 #content {
   min-height: 100px;
   &::placeholder{
     color: $text-color-secondary;
   }
 }
 .btn__post{
  height: 40px;
  width: auto;
  min-width: 200px;
  margin-top: 30px;
   &-send{
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
   &-cancel{
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