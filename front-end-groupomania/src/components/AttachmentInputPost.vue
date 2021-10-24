<template>

  <div>
    <img :src="src" alt="Image du post" class="upload__img"  v-if="mode == 'updating' && values.attachment != null ">
     <img :src="src" alt="Image du post" class="upload__img" v-if=" status == 'imgUploaded' " > 
    <div class="post__form-upload" >    
        <button class="upload__btn" type="button" @click.stop.prevent="initUpload" >Télécharger</button>
        <p class="upload__text">Ajouter une image</p>
        <input class="input__field" id="attachment" type="file" ref="attachment" name="attachment" accept="image/*" @change="uploadImage" >    
    </div>

  </div>
  
</template>

<script>
  export default {
    name:'attachmentInputPost',
    props: {
      values: Object,
      mode: String,
      value: File,
      defaultSrc: String,
      formData: Object
    },
    data() {
      return {
        src: this.defaultSrc,
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
      }
    }

  }
</script>

<style lang="scss" scoped>

 @import "@/assets/_variables.scss";
    
  .post__form {
    &-upload {
      border: 2px black solid;
      border-radius: 10px;
      width: 45%;
      max-height: 40px;
      min-height: 1.4rem;
      display: flex;
    }
    &-buttons {
      width: auto;
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
      font-size: 3vh;
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