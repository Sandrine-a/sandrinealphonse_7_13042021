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
      <div class="post__form-upload" @click="initUpload()">    
         <button class="upload__btn">Télécharger</button>
         <p class="upload__text">Ajouter une image</p>
         <input class="input__field"  id="attachment" type="file" placeholder="Titres de la publication">      
      </div>

      <div class="post__form-buttons">
        <div class="btn__post">
          <button @click="sendPost" class="btn__post-send" type="button"> Envoyer </button>
        </div>
        <div class="btn__post">
          <button class="btn__post-cancel" type="button" @click="cancelWrite" > Annuler </button>
        </div>
      </div>

  </form>
  
</template>

<script>
// @ is an alias to /src
  import {mapState} from 'vuex';

  export default {
    name: 'AddPostForm',
    data() {
      return {
        title: '',
        content:'',
        userId:''
      }
    },    
    computed: {
        ...mapState(['user','status'])
    },
    methods: {
      initUpload() {
        const uploadBtn = document.getElementById("attachment");
        uploadBtn.click()
      },
      sendPost() {
        this.$store.dispatch('sendPost', {
          title: this.title,
          content: this.content,
          userId: this.user.userId
        })
        .then(() => this.$store.dispatch('getAllPosts'))
        .then(() => this.cancelWrite())
        .then(() => this.succesAlert())
        .catch(error => console.log(error));
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
   &-upload {
    border: 2px black solid;
    border-radius: 10px;
    width: 40%;
    min-height: 1.4rem;
    display: flex;
    cursor: pointer;
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
  #attachment {
   font-weight: bold;
   display: none;
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
 .upload {
  &__btn {
    border-radius: 15px;
    background-color: $secondary-color;
    color: white;
    font-weight: bold;
    margin-left: 7px;
    cursor: pointer;
    margin: 2px;
  }
  &__text {
    font-weight: bold;
    font-size: 4vh;
    margin: 2px 0 2px 20px;
    color: $text-color-secondary;
  }
 }
 
</style>