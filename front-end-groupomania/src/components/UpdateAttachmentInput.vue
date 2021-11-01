<template>

  <div>
    <div class="attachment__img" v-if=" this.attachment || infos.attachment != null ">
      <img :src="src" alt="Image du post à modifier" class="upload__img" >
      <button id="cancel__btn" @click.stop.prevent="remove">X</button>
    </div> 
    <div class="post__form-upload" >    
        <button class="upload__btn" type="button" @click.stop.prevent="initUpload" >Télécharger</button>
        <p class="upload__text">Ajouter une image</p>

        <input class="input__field" id="attachment" type="file" ref="attachment" accept="image/*" @change="uploadImage" >    
        
    </div>

  </div>
  
</template>

<script>
  export default {
    name:'attachmentInputPost',
    props: {
      modelValue: String,
      infos: Object,
      mode: String,
      defaultSrc: String,
      formData: Object
    },
    data() {
      return {
/*         src: '', */
        src: this.defaultSrc,
        status:'',
        attachment: this.src
      }
    },
    methods: {
      initUpload() {
       this.$refs.attachment.click()
      },
      uploadImage(e) {
        this.attachment = e.target.files[0];
        this.$emit('update:modelValue', e.target.files[0]);
        //Rendu dans la div image 
        let reader = new FileReader()
        reader.readAsDataURL(this.attachment);
        reader.onload = (e) => {
        this.src = e.target.result;
        }
        this.status = 'imgUploaded';
        console.log(this.src);
        console.log(this.attachment);
      },
      remove() {
        this.src = '';
        this.attachment='';
        this.$emit('update:modelValue', this.src);
        this.status = ''
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
      font-size: 1.1rem;
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