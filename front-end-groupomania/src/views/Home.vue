
<template>
  <div class="home">

    <div class="frame">
       <img alt="Groupomania logo" src="../assets/icon-groupomania-white.svg" class="frame__icon">
       <img alt="vector frame" src="../assets/vector-frame.svg" class="frame__vector" >

    </div>
    <div class="form">    

     <h1 class="login__title color_blue " v-if=" mode == 'login'" > Connexion </h1>
     <h1 class="login__title color_blue " v-else> Créez votre compte </h1>

     <form class="login__form">

      <div class="login__form-input">
        <label for="email" class="color_blue">E-mail </label>
        <input v-model="email" class="input_field" type="mail" id="email" placeholder="Entrez votre mail pro" required>
      </div>
      <div class="login__form-input">
        <label for="password" class="color_blue">Mot-de-Passe </label>
        <input v-model="password" class="input_field" type="password" id="password" placeholder="Entrez votre mot-de-passe" required>
      </div>

      <div class="login__form-input" v-if=" mode == 'signup'">
        <label for="lastname" class="color_blue"> Nom </label>
        <input v-model="lastname" class="input_field" type="text" id="lastname" placeholder="Entrez votre nom" required>
      </div>

      <div class="login__form-input" v-if=" mode == 'signup'">
        <label for="firstname" class="color_blue">Prénom </label>
        <input v-model="firstname" class="input_field" type="text" id="firstname" placeholder="Entrez votre prénom" required>
      </div>
          
      <section id="section__btn">

        <div class="btn__main">
          <div v-if=" mode == 'login' && status == 'error_login' "> Mot-de-passe/adresse mail invalide </div>
          <button @click="login()" class="btn__main-confirm" type="button" v-if=" mode == 'login' "><span v-if=" status == 'loading' ">Connexion en cours...</span><span v-else>Connexion</span></button>
          <button @click="signup()" class="btn__main-confirm" type="button" v-else><span v-if=" status == 'loading' ">Création en cours...</span>
          <span v-else>Créer un compte</span></button>
        </div>

        <div class="login__form-legend">
          <p> - OU - </p>
          <legend v-if=" mode == 'login'">
            Pas encore de compte? 
            <span class="login__form-legendBold" @click="switchToSignup()">Inscrivez-vous: </span>
          </legend>
          <legend v-else>
            Déjà inscrit? 
            <span class="login__form-legendBold" @click="switchToLogin()">Connectez-vous: </span>
          </legend>
        </div>
        <div class="btn__main">
          <button class="btn__main-switch" type="button" @click="switchToSignup()" v-if=" mode == 'login'">Créer un compte</button>
          <button class="btn__main-switch" type="button" @click="switchToLogin()" v-else>Connexion</button>
        </div>

      </section>
      
     </form>

    </div>
  </div>

</template>

<script>
// @ is an alias to /src
import {mapState} from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      mode: 'login',
      email: '',
      password: '',
      lastname: '',
      firstname: '' 
    }
  },
  computed: {
    ...mapState(['status'])
  },
  methods : {
    switchToSignup() {
      this.mode = 'signup';
    },
    switchToLogin() {
      this.mode = 'login';
    },
    signup() {
      this.$store.dispatch('signup', {
        email: this.email,
        password: this.password,
        firstname: this.firstname,
        lastname: this.lastname
      })
      .then(() => this.login())
      .catch(error => console.log(error));
    },
    login() {
      console.log(this.email,this.password);
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
      .then(() => {
        this.$router.push('Posts')
      })
      .catch(error => console.log(error));
    }
  }
}

</script>

<style lang="scss" scopted>

 @import "@/assets/_variables.scss";

 .home{
   display: flex;
 } 

 .frame {
  width: 40%;
  background-image: url("../assets/groupomania_couverture_paris.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
  position: relative;
  overflow: hidden;
    &__icon {
      width: 55%;
      position: absolute;
      bottom: 90px;
      left: 120px;
      z-index: 2;
    }
    &__vector {
      width: 77%;
      height: 160px;
      position: absolute;
      bottom: 30px;
      left: 75px;
      z-index: 1;
    }
 }

 .form {
   width:70%;
   border-top-left-radius: 25px;
   border-bottom-left-radius: 25px;
   background-color: white;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
 }

.color_blue {
  color: $text-color-secondary;
  font-weight: bold;
}
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  &__form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &-input {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }
    &-legend {
    text-align: center;
    padding: 10px 0;
   }
    &-legendBold {
    font-weight: bold;
    color: $tertiary-color;
    cursor: pointer;
    text-decoration: underline;
    }
  }
}

.input_field {
  width: 300px;
  height: 50px;
  border-radius: 20px;
  background-color: $primary-color;
  color: white;
  border: none;
}

#section__btn {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.btn__main{
  height: 50px;
  &-confirm {
    color: white;
    background: $tertiary-color;
    border-radius: 10px;
    height: 100%;
    width: 300px;
    border: none;
    cursor: pointer;
    font-weight: bold;
    font-size: 4vh;
  }
  &-switch {
    color: white;
    background: $tertiary-color;
    border-radius: 10px;
    height: 100%;
    width: 300px;
    border: none;
    cursor: pointer;
    font-weight: bold;
    font-size: 4vh;
  }
}

</style>
