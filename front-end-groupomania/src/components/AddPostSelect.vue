<template>
  <div class="select">
    <label for="select" class="select__label">
      <input class="select__input" type="text" id="select" placeholder="Écrire ici...">
    </label>
    <p v-if=" status == 'sent' " @succes-status="displaySuccesMessage" @mousedown="hideSuccesMessage" class="select__succes">Votre post a été envoyé avec succès! </p>
  </div>

</template>

<script>
// @ is an alias to /src
  import {mapState} from 'vuex';
  
  export default {
    name:'AddPostSelect',   
    computed: {
        ...mapState(['userAccess','status'])
    },
    methods: {
      displaySuccesMessage() {
        this.status = 'sent';
      },
      hideSuccesMessage() {
        this.status = '';
      }
    }
  }

</script>

<style lang="scss" scoped>

 @import "@/assets/_variables.scss";

 .select {
   &__input {
     border-radius: 10px;
     height: 30px;
     border: 1px solid black;
     width: 75%;
   }
   &__succes {
     color: $text-color-secondary;
     text-decoration: underline;
     text-decoration-color: $tertiary-color;
     font-style: italic;
     font-size: 1.2rem;
     margin-bottom: 5px;
   }
 }


</style>