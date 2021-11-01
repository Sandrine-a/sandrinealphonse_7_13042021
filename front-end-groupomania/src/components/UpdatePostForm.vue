<template>
  <form class="post__form"> 

      <div class="post__form-input">
        <label for="title" class="input__label"> </label>
          <input v-model="title" class="input__field" type="text" id="text" placeholder="Titre de la publication * " autofocus required>
      </div>
      <div class="post__form-input">
        <label for="content" class="input__label"></label>
          <textarea v-model="content" class="input__field" id="content" placeholder="Taper votre texte ici"></textarea>     
      </div>

      <div class="post__form-input">
        <div class="attachment__img" v-if=" this.attachment || infos.attachment != null ">
          <img :src="src" alt="Image du post à modifier" class="upload__img" v-if="isntHidden && src != null ">
          <button id="cancel__btn" @click.stop.prevent="remove" v-if="isntHidden && src != null ">X</button>
        </div> 
        <div class="post__form-upload" >    
          <button class="upload__btn" type="button" @click.stop.prevent="initUpload" >Télécharger</button>
          <p class="upload__text">Ajouter une image</p>

          <input class="input__field" id="attachment" type="file" ref="attachment" accept="image/*" @change="uploadImage" >              
        </div>
      </div>

      <div class="post__form-buttons">
        <div class="btn__post">
          <button @click.stop.prevent="sendUpdatedPost" class="btn__post-send"> Envoyer </button>
        </div>
        <div class="btn__post">
          <button class="btn__post-cancel" type="button" @click.stop.prevent="cancelWrite"  > Annuler </button>
        </div>
      </div>

  </form>
  
</template>

<script>
// @ is an alias to /src
  import {mapState} from 'vuex';

  export default {
    name: 'UpdatePostForm', 
    data() {
      return {
        title: this.infos.title,
        content:this.infos.content,
        userId:this.infos.title,
        attachment: this.infos.attachment,
        src: this.infos.attachment,
        mode: 'updating',
        isntHidden: true,
      }
    },
    props: {
      user: Object,
      infos: Object
    }, 
    computed: {
        ...mapState(['userAccess','status', 'post']),
    },
     watch: {
      attachment(val) {
        console.log(val)
        if(!val) {
          this.isntHidden = false;
        }
      }
    },
    methods: {
      async sendUpdatedPost(post) {
        post = {
          title: this.title,
          content: this.content,
          attachment: this.attachment,
          userId: this.userAccess.userId,
          id: this.infos.id
        }
        await this.$store.dispatch('sendUpdatedPost', post)
        .then(() => this.$store.dispatch('getAllPosts'))
        .then(() => this.cancelWrite())
        .catch(error => console.log(error));        
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
        this.status = '';
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
      min-height: 60px;
    }
    &-render {
      text-align: start;
    }
    &-upload {
      border: 2px black solid;
      border-radius: 10px;
      width: 45%;
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
  font-size: 4vh;
  &::placeholder{
    color: $text-color-secondary;
  }
  }
  #content {
  min-height: 60px;
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
      font-size: 0.9rem;
      margin: 2px 2px 2px 5px;
      color: $text-color-secondary;
    }
    &__img {
      height: 250px;
      margin-top:10px;
    }
  }
  #attachment {
    font-weight: bold;
    display: none;
  }
  .attachment__img {
    margin:20px 0;
  }
  #cancel__btn {
    background-color: white;
    color: $text-color-secondary;
    border: 2px black solid;
    border-radius: 10px;
    font-weight: bold;
    vertical-align: top;
    cursor: pointer;
    &-old {
      background-color: white;
      color: $text-color-secondary;
      border: 2px black solid;
      border-radius: 10px;
      font-weight: bold;
      vertical-align: top;
      cursor: pointer;
    }
  }

 
</style>