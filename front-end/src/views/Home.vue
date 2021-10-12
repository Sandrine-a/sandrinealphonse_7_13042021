
<template>
  <div class="home">

    <div class="frame">
      <div class="frame__logo">
       <img alt="Groupomania logo" src="../assets/icon-groupomania-white.svg" class="frame__logo--icon">
       </div>
    </div>
    <div class="form">    

     <h1 class="login__title color_blue " v-if=" mode == 'login'" > Connexion </h1>
     <h1 class="login__title color_blue " v-else> Créez votre compte </h1>
     
     <form class="login__form">

          <div class="signup__form-input">
            <label for="email" class="color_blue">E-mail </label>
            <input v-model="email" class="input_field" type="mail" id="email" placeholder="Entrez votre mail pro">
          </div>
          <div class="signup__form-input">
            <label for="password" class="color_blue">Mot-de-Passe </label>
            <input v-model="password" class="input_field" type="password" id="password" placeholder="Entrez votre mot-de-passe">
          </div>

          <div class="login__form-input" v-if=" mode == 'signup'">
            <label for="lastName" class="color_blue"> Nom </label>
            <input v-model="lastName" class="input_field" type="text" id="lastName" placeholder="Entrez votre nom">
          </div>

          <div class="login__form-input" v-if=" mode == 'signup'">
            <label for="firstNAme" class="color_blue">Prénom </label>
            <input v-model="firstName" class="input_field" type="text" id="firstNAme" placeholder="Entrez votre prénom">
          </div>
          
        <section id="section__btn">
          <div class="btn__main">
            <button class="btn__main-login" type="submit" v-if=" mode == 'login'">Connexion</button>
            <button @click="createAccount()" class="btn__main-login" v-else>Créer un compte</button>
          </div>

          <div class="login__form-legend">
            <p> - OU - </p>
            <legend v-if=" mode == 'login'">Pas encore de compte? <span class="login__form-legendBold">Connectez-vous: </span></legend>
            <legend v-else>Déjà inscrit? <span class="login__form-legendBold">Connectez-vous: </span></legend>
          </div>

          <div class="btn__main">
            <button class="btn__main-signup" type="submit" @click="switchToSignup()" v-if=" mode == 'login'">Créer un compte</button>
            <button class="btn__main-signup" type="submit" @click="switchToLogin()" v-else>Connexion</button>
          </div>
        </section>
      
     </form>

    </div>
  </div>

</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
    data: function() {
    return {
      mode: 'login',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    }
  },
  methods : {
    switchToSignup: function() {
      this.mode = 'signup';
    },
    switchToLogin: function() {
      this.mode = 'login';
    },
    createAccount: function( ) {
      console.log(this.email,this.password,this.firstName,this.lastName);
    }
  }
}

</script>

<style lang="scss" scopted>

 @import "@/assets/_variables.scss";

 .home{
   background-image: url("../assets/groupomania_couverture_paris.jpg");
   background-attachment: fixed;
   background-repeat: no-repeat;
   background-position: left;
   display: flex;
   position: absolute;  
 } 

 .frame {
/*   width: 40%; */
  position: relative;
  top: 0;
  left: 0;
   &__image {
     width: 100%;
     object-fit: fill;
     
   }
   &__logo {
     position: absolute;
     max-width: 30%; 
     height: 100px;
     background-color: $secondary-color; 
     border-radius: 25px; 
     position: relative;
     bottom: 100px;
     left: 30%;
     &--icon {
       padding: 20px;
       width: 80%;

     }
   }
 }

 .form {
   width:60%;
   position: relative;
   right: 25px;
   top:0;
   border-top-left-radius: 25%;
   border-bottom-left-radius: 25%;
   background-color: white;
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
    &-input {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
}

.input_field {
  width: 300px;
  height: 50px;
  border-radius: 25px;
  background-color: $primary-color;
  color: white;
  border: none;
}

#section__btn {
  margin-top: 50px;
}
.btn__main{
  height: 50px;
  &-signup {
    color: white;
    background: $tertiary-color;
    border-radius: 25px;
    height: 100%;
    width: 300px;
    border: none;
    
  }
  &-login {
    color: white;
    background: $tertiary-color;
    border-radius: 25px;
    height: 100%;
    width: 300px;
    border: none;
  }
}
</style>
