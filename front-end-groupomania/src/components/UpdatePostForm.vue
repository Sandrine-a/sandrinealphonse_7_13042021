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
      
      <UpdateAttachmentInput v-model="attachment" :mode="mode" :infos="infos" :default-src="infos.attachment" class="post__form-render" />

      <div class="post__form-buttons">
        <div class="btn__post">
          <button @click.stop.prevent="sendUpdatedPost" class="btn__post-send" type="button"> Envoyer </button>
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
  import UpdateAttachmentInput from '../components/UpdateAttachmentInput.vue'

  export default {
    name: 'UpdatePostForm',
    components: {
      UpdateAttachmentInput
    },  
    data() {
      return {
        title: this.infos.title,
        content:this.infos.content,
        userId:this.infos.title,
        attachment: this.infos.attachment,
        mode: 'updating'
      }
    },
    props: {
      user: Object,
      infos: Object
    }, 
    computed: {
        ...mapState(['userAccess','status', 'post']),
    },/*  */
    mounted(){
      console.log(this.infos);
    },
    methods: {
      async sendUpdatedPost(post) {
        console.log(this.attachment);
        console.log(post);
        try {
          if(this.attachment) {
            console.log('ATTACHMENT FONCTION');
            console.log(this.attachment.name);
            console.log(this.id);
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
          } else {
            console.log('PAS ATTACH');
            console.log(this.id);
            post = {
              title:  this.title,
              content: this.content,
/*               attachment: null, */
              userId: this.userAccess.userId,
              id: this.infos.id
            }
            await this.$store.dispatch('sendUpdatedPost', post)
            .then(() => this.$store.dispatch('getAllPosts'))
            .then(() => this.cancelWrite())   
            .catch(error => console.log(error)); 
          }

        } catch(error) {
          console.log(error);
        }
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
     min-height: 60px;
   }
   &-render {
     text-align: start;
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

 
</style>