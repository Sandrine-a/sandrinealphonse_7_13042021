<template>

  <div>
    <img :src="src" alt="Image du post" class="upload__img" v-if=" status == 'imgUploaded' " >  
    <div class="post__form-upload" >    
        <button class="upload__btn" type="button" @click="initUpload" >Télécharger</button>
        <p class="upload__text">Ajouter une image</p>
        <input class="input__field" id="attachment" type="file" ref="attachment" accept="image/*" @change="uploadImage" >    
    </div>

  </div>
  
</template>

<script>
  export default {
    name:'attachmentInputPost',
    props: {
      value: File,
      formData: Object
    },
    data() {
      return {
        src: null,
        status:'',
        attachment: this.value
      }
    },
    methods: {
      initUpload() {
       this.$refs.attachment.click()
      },
      uploadImage (e) {

        this.attachment = e.target.files[0];
        console.log(this.attachment);

        this.$emit('input', e.target.files[0]);

        let reader = new FileReader()

        reader.readAsDataURL(e.target.files[0]);

        reader.onload = (e) => {
        this.src = e.target.result;
        }
        //Rendu dans la div image 
        this.status = 'imgUploaded';
        //Envoie du file dans le store
        this.$store.dispatch('getPostAttachment', this.attachment) 
      },
    }

  }
</script>

<style lang="scss" scoped>

 @import "@/assets/_variables.scss";
    
  .post__form {
    &-upload {
      border: 2px black solid;
      border-radius: 10px;
      width: 40%;
      min-height: 1.4rem;
      display: flex;
    }
  }
  .input{
    &__field{
    background-color: white;
    border: 2px black solid;
    border-radius: 10px;
    min-height: 30px;
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
    &__img {
      height: 250px;
      margin-top:10px;
    }
  }
  #attachment {
  font-weight: bold;
  display: none;
 }

</style>