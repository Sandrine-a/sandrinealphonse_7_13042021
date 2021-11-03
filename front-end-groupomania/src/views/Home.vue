
<template>
  <div class="home">
    <!--     Only max-width 991px -->
    <div class="mobile__logo">
      <img alt="Groupomania logo" src="../assets/icon-groupmania.png" class="mobile__logo-icon" >
    </div>
    <!-- On min-width 992px -->
    <div class="frame">
       <img alt="Groupomania logo" src="../assets/icon-groupomania-white.svg" class="frame__icon">
       <img alt="vector frame" src="../assets/vector-frame.svg" class="frame__vector" >

    </div>
    <div class="form">    

     <h1 class="login__title color_blue " v-if=" mode == 'login'" > Connexion </h1>
     <h1 class="login__title color_blue " v-else> Créez votre compte </h1>

     <form class="login__form" @submit="checkForm">

      <div class="login__form-input">
        <label for="email" class="color_blue">E-mail </label>
        <input v-model="email" class="input_field" id="email" placeholder="Entrez votre mail pro" pattern="[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,8}" maxlength="100" title="(ex:mail@mail.fr)" required>
      </div>
      <div class="login__form-input">
        <label for="password" class="color_blue">Mot-de-Passe </label>
        <input v-model="password" class="input_field" type="password" id="password" placeholder="Entrez votre mot-de-passe" required pattern="(?=^.{6,}$)(?=.*[!@#$%^&*])((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" title="Doit contenir 6 caractères minimum avec au moins,1 majuscule, 1 minuscule, 1 caractère spécial">
      </div>

      <div class="login__form-input" v-if=" mode == 'signup'">
        <label for="lastName" class="color_blue"> Nom </label>
        <input v-model="lastName" class="input_field" type="text" id="lastName" placeholder="Entrez votre nom" pattern="[a-zA-ZÀ-ÿ-'\s\b]{1,50}" title="Merci d'indiquer un format valide, max. 50 caractères" required>
      </div>

      <div class="login__form-input" v-if=" mode == 'signup'">
        <label for="firstName" class="color_blue">Prénom </label>
        <input v-model="firstName" class="input_field" type="text" id="firstName" placeholder="Entrez votre prénom" pattern="[a-zA-ZÀ-ÿ-'\s\b]{1,50}" title="Merci d'indiquer un format valide, max. 50 caractères" required>
      </div>
          
      <section id="section__btn">

        <div class="btn__main">
          <div v-if=" mode == 'login' && status == 'error_login' "> Mot-de-passe/adresse mail invalide </div>
          <button class="btn__main-confirm" type="submit" v-if=" mode == 'login' "><span v-if=" status == 'loading' ">Connexion en cours...</span><span v-else>Connexion</span></button>
          <button class="btn__main-confirm" type="submit" v-else><span v-if=" status == 'loading' ">Création en cours...</span>
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
      lastName: '',
      firstName: ''
    }
  },
  computed: {
    ...mapState(['status']),
  },
/*   watch: {
    password(value) {
      console.log(value);
      this.value = value;
    },
    email(value) {
      console.log(value);
      if(!/[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,8}/.test(value) ) {
        
        console.log('wrong');
      }
    }
  }, */
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
        firstName: this.firstName,
        lastName: this.lastName
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
    },
    checkForm(e) {
      if(this.mode == 'login') {
        this.login()
      } else if (this.mode =='signup') {
        this.signup()
      }
      e.preventDefault();
    }
  }
}

</script>

<style lang="scss" scopted>

 @import "@/assets/_variables.scss";

  .home{
    display: flex;
    min-height: 680px;
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
    align-items: center;
    justify-content: center;
    margin-bottom: 80px;
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
      font-size: 1.2rem;
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
      font-size: 1.2rem;
    }
  }
  @media all and (min-width: 992px) {
    .mobile__logo {
      display: none;
    }
  }
  @media all and (max-width: 991px) {
    .home {
      flex-direction: column;
    }
    .mobile__logo {
      height: 100px;
      &-icon {
        height: 100%;
      }
    }
    .form {
      width: 100%;
    }
    .frame {
      display: none;
    }
    .login {
      &__title {
        margin: 10px 0;
      }
    }
  }

</style>
