<template>

  <div class="signup">
    <h1 class="signup__title color_blue "> Créez votre compte </h1>
    <form class="signup__form">

        <div class="signup__form-input">
          <label for="lastName" class="color_blue"> Nom </label>
          <input class="input_field" type="text" id="lastName" value="Entrez votre nom">
        </div>
        <div class="signup__form-input">
          <label for="firstNAme" class="color_blue">Prénom </label>
          <input class="input_field" type="text" id="firstNAme" value="Entrez votre prénom">
        </div>
        <div class="signup__form-input">
          <label for="email" class="color_blue">E-mail </label>
          <input class="input_field" type="mail" id="email" value="Entrez votre mail pro">
        </div>
        <div class="signup__form-input">
          <label for="password" class="color_blue">Mot-de-Passe </label>
          <input class="input_field" type="password" id="password" value="Entrez votre mot-de-passe">
        </div>
        
        <section id="section__btn">
          <div class="btn__main">
            <button class="btn__main-signup" type="submit">Créer un compte </button>
          </div>

          <div class="signup__form-legend">
            <p> - OU - </p>
            <legend>Déjà inscrit? <span class="signup__form-legendBold">Connectez-vous: </span></legend>
          </div>

          <div class="btn__main">
            <button class="btn__main-login" type="submit">Connexion</button>
          </div>
        </section>
      
    </form>
  </div>
 
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      nom: 1
    }
  },
  methods: {
    nameIs() {
      this.nom++;
    }
  }
}

</script>

<style lang="scss" scoped>
 @import "@/assets/_variables.scss";

.color_blue {
  color: $text-color-secondary;
  font-weight: bold;
}
.signup {
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
