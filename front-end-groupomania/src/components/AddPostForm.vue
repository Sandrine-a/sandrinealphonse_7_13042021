<template>
  <form class="post__form" @submit="sendPost"> 

      <div class="post__form-input">
        <label for="title" class="input__label"> </label>
          <input v-model="title" class="input__field" type="text" id="text" placeholder="Titre de la publication * " autofocus required>
      </div>
      <div class="post__form-input">
        <label for="content" class="input__label"></label>
          <textarea v-model="content" class="input__field" id="content" placeholder="Taper votre texte ici"></textarea>     
      </div>

      <div class="post__form-input">
        <div class="attachment__img" v-if=" this.attachment">
          <img :src="src" alt="Image du post"  class="upload__img" v-if="isntHidden && src != null "> 
          <button id="cancel__btn" type="button"  @click.stop.prevent="remove" v-if="isntHidden && src != null ">X</button>  
        </div> 
        <div class="post__form-upload" >    
          <button class="upload__btn" type="button" @click.stop.prevent="initUpload" >Télécharger</button>
          <p class="upload__text">Ajouter une image</p>

          <input class="input__field" id="attachment" type="file" ref="attachment" accept="image/*" @change="uploadImage" >    
            
        </div>

      </div>

      <div class="post__form-buttons">
        <div class="btn__post">
          <button type="submit" class="btn__post-send"> Envoyer </button>
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

  export default {
    name: 'AddPostForm',
    data() {
      return {
        title: '',
        content:'',
        userId:'',
        attachment:'',
        src: '',
        isntHidden: true,
      }
    },    
    computed: {
        ...mapState(['userAccess']),
    },
    watch: {
      attachment(val) {
        if(!val) {
          this.isntHidden = false;
        }
      }
    },
    methods: {
      async sendPost(e,post) {
        e.preventDefault()
        try {
          post = {
            title: this.title,
            content: this.content,
            attachment: this.attachment,
            userId: this.userAccess.userId
          }
          await this.$store.dispatch('sendPost', post)
          .then(() => setTimeout(() => this.$emit('hide-sucess'), 5000)) 
          .then(()=> {
            this.$emit('succes-status')
            this.$store.dispatch('getAllPosts')
            })
          .then(() => this.cancelWrite())
          .catch(error => console.log(error)); 
        } catch(error) {
          console.log(error);
          alert('Error has occurred! Please try again');          
        }
      },
      cancelWrite () {
        this.$emit('write-cancel', { mode: 'read' })
      },
      initUpload() {
       this.$refs.attachment.click()
      },
      uploadImage(e) {
        this.attachment = e.target.files[0];

        //Rendu dans la div image 
        let reader = new FileReader()
        reader.readAsDataURL(this.attachment);
        reader.onload = (e) => {
        this.src = e.target.result;
        }
        
        this.isntHidden = true
        },
      remove() {
        this.src = '';
        this.attachment='';
        this.status = ''
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
      width: 50%;
      max-height: 40px;
      min-height: 1.4rem;
      display: flex;
    }
    &-buttons {
        display: flex;
        justify-content: space-between;
        width: auto;
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
    font-size: 1.2rem;
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
  .input{
    &__field{
    background-color: white;
    border: 2px black solid;
    border-radius: 10px;
    max-height: 40px;
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
      font-size: 0.9rem;
      margin: 2px 0 2px 10px;
      color: $text-color-secondary;
    }
    &__img {
      height: 250px;
      margin-top:5px;
    }
  }
  #attachment {
  font-weight: bold;
  display: none;
  }
  .attachment__img {
   display: flex;
   margin: 20px 0;
  }
  #cancel__btn {
    background-color: white;
    color: $text-color-secondary;
    border: 2px black solid;
    border-radius: 10px;
    font-weight: bold;
    vertical-align: top;
    cursor: pointer;
    height: 30px;
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
      font-size: 1.2rem;
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
      font-size: 1.2rem;
    }
  }
  @media all and (max-width: 576px) {
    .post{
      &__form{
        &-upload {
          flex-direction: column;
          max-height: 50px;
        }
        &-input {
          width: 100%;
        }
      }
    }
    .upload {
      &__text {
        margin:auto;
      }
    }
    #text {
    font-weight: bold;
    font-size: 0.9rem;
    }
  }
  @media all and (max-width: 768px) {
    .post{
      &__form{
        &-buttons {
          flex-direction: column;
          height: 100px;
        }
      }

    }
    .upload {
      &__img {
        width: 100%;
        margin-top:0;
      }
    }
    .attachment__img {
      flex-direction: column-reverse;
    }
    #cancel__btn {
      align-self: flex-end;
      width: 30px;
    
    }
  }
  @media all and (max-width: 991px) {
    .post{
      &__form{
        &-upload {
          width: 100%;
        }
      }
    }
  }

 
</style>