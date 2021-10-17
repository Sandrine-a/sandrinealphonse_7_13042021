<template>

  <section class="card">
    <div class="card__informations">   
      <div class="card__photo">
        <div class="card__photo-item">
          <fa icon="user-alt-slash" class="card__photo-icon"/>
        </div>
        <p class="label">Ma photo</p>
      </div>    
      <p class="label"> Nom: </p>
      <p> {{ user.lastName }} </p>
      <p class="label">Prénom:</p>
      <p>{{ user.firstName }}</p>
    </div>
    <div class="card__button">
      <div class="btn__main">
        <button @click="getUsersForm()" class="btn__main-modify" type="button"> Modifier </button>
      </div>
    </div>
  </section>

</template>

<script>
  // @ is an alias to /src
  import {mapState} from 'vuex';

  export default {
    name: 'UsersIdentity',
    mounted() {
      console.log(this.$store.state.user);
      this.$store.dispatch('getUserProfile');
    },
    computed: {
      ...mapState({
        user: 'userInfos',
      })
    },
    methods: {
/*       getUserForm() {
        console.log("User Form");
      } */
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
  .btn__main{
  height: 50px;
  &-modify {
    color: white;
    background: $tertiary-color;
    border-radius: 20px;
    height: 100%;
    width: 300px;
    border: none;
    cursor: pointer;
    font-weight: bold;
    font-size: 6vh;
    }
  }
</style>