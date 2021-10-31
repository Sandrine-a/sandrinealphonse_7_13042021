<template>

  <section class="card">
    <div class="card__informations">   
      <div class="card__photo" v-if="mode == 'read'">
        <div class="card__photo-item">
          <fa icon="user-alt-slash" class="card__photo-icon" v-if="src == null "/>
          <img :src="src" alt="avatar profile" class="card__photo-pPicture" v-else/>
        </div>
        <p class="label">Ma photo</p>
      </div>
      <div class="card__datas" v-if="mode == 'read'">    
        <p class="label"> Nom: </p>
        <p> {{ this.userInfos.lastName }} </p>
        <p class="label">Prénom:</p>
        <p>{{ this.userInfos.firstName }}</p>
      </div>

      <div div class="card__form" v-if=" mode == 'updating' ">
        
        <form class="identity__form"> 

          <div class="card__photo" >   
            <div class="card__photo-item" >
              <fa icon="user-alt-slash" class="card__photo-icon" v-if="src == null "/>
              <img :src="src" alt="Image du post à modifier" class="card__photo-pPicture" v-if=" status = 'uploading' && src != null" >
            </div>
            <div class="identity__form-upload" >  
              <label for="pPicture" class="identity__form-label">Ma Photo </label>
              <input class="input__field" id="pPicture" type="file" ref="pPicture" accept="image/*" @change="uploadPpicture" placeholder="Télécharger">    
            </div>
          </div>
          <div class="identity__form-input">
            <label for="lastName" class="identity__form-label">Nom: </label>
              <input v-model="lastName" class="identity__form-field" type="text" id="lastName" placeholder="Taper le nom" required>
          </div>
          <div class="identity__form-input">
            <label for="firstName" class="identity__form-label">Prénom:</label>
            <input v-model="firstName" class="identity__form-field" type="text" id="firstName" placeholder="Taper le prénnom" required>   
          </div>
        </form>
      </div>

    </div>

    <div class="card__button">
      <div class="btn__identity" v-if=" mode == 'read'">
        <button @click.stop.prevent="switchToUpdate" class="btn__identity-modify" type="button" > Modifier </button>
      </div>
      <div class="btn__identity-update" v-if=" mode == 'updating'">
        <button @click.stop.prevent="updateIdentity" class="btn__identity-send" type="button"> Envoyer </button>
        <button @click.stop.prevent="cancelUpdate" class="btn__identity-cancel" type="button"> Annuler </button>
      </div>
    </div>
  </section>

</template>

<script>
  // @ is an alias to /src
  import {mapState} from 'vuex';

  export default {
    name: 'UsersIdentity',
    data() {
      return {
        lastName: this.$store.state.userInfos.lastName,
        firstName: this.$store.state.userInfos.firstName,
        src: this.$store.state.userInfos.pPicture,
        pPicture:this.$store.state.userInfos.pPicture,
        email: this.$store.state.userInfos.email,
        mode:'read',
        status:''
      }
    },
    computed: {
      ...mapState(['userInfos','userAccess'])
    },
    mounted() {
      console.log(this.userInfos);
    },
    methods: {
      switchToUpdate() {
        console.log("User Form");
        this.mode = 'updating'
      },
      updateIdentity(userInfos) {
        console.log(this.pPicture);
        userInfos = {
          lastName: this.lastName,
          firstName: this.firstName,
          email: this.email,
          pPicture: this.pPicture,
          userId: this.userAccess.userId,
        }
        this.$store.dispatch('updateIdentity', userInfos)
        .then(()=> {
          this.$emit('get-profile')
          this.mode = 'read'
          console.log('end of updateIdentity');
          console.log(this.userInfos);
        })
      },
      cancelUpdate() {
        this.mode = 'read'
      },
      uploadPpicture(e) {
        this.pPicture = e.target.files[0];
        console.log(this.pPicture);
  
        //Rendu dans la div image 
        let reader = new FileReader()
        reader.readAsDataURL(this.pPicture);
        reader.onload = (e) => {
        this.src = e.target.result;
        }

        this.status = 'uploading';
      },
    }
  }
</script>

<style lang="scss" scoped>

  @import "@/assets/_variables.scss";

  .card {
    margin: 30px;
    padding: 30px 0;
    background-color: white;
    max-width: 800px;
    border-radius: 25px;
    display: flex;
    justify-content: space-around;
    &__informations {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    &__photo {
      display: flex;
      justify-content: space-evenly;
      &-item {
        width: 160px;
        height: 160px;
        background-color: $bg-color;
        margin-right: 20px;
      }
      &-icon {
        color: $primary-color;
        width: 80%;
        height: 80%;
      }
      &-pPicture {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    &__datas {
      text-align: start;
    }
    &__button {
      align-self: flex-end;
    }
  }
    .label {
    color: $text-color-secondary;
    text-decoration: underline;
    margin-bottom: 0;
    }
    .identity__form {
      &-label {
        text-decoration: underline;
        margin-bottom: 16px;
      }
      &-input {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-top:12px;
      }
      &-field {
        background-color: white;
        border: 1px black dashed;
        border-radius: 10px;
        min-height: 25px;
        margin-bottom: 15px;
      }
      &-upload {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
    }
    .btn__identity{
    height: 35px;
    &-modify {
      color: white;
      background: $tertiary-color;
      border-radius: 10px;
      height: 100%;
      width: 300px;
      border: none;
      cursor: pointer;
      font-weight: bold;
      font-size: 1.2rem;
    }
    &-update {
      height: 35px;
    }
    &-send, &-cancel {
      color: white;
      background: $tertiary-color;
      border-radius: 10px;
      height: 100%;
      width: 130px;
      border: none;
      cursor: pointer;
      font-weight: bold;
      font-size: 1.2rem;
      margin-left: 10px;

    }
  }
</style>