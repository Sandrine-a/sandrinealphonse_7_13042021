<template>

  <div class="main">
    <Header/>

    <div v-if="status == 'gotProfile'">
      <h1 lass="profile__title">Profil</h1>
      <section class="profile__card">
        <UsersIdentity @get-profile="getUserProfile" /> 
      </section> 

      <section v-if="userAccess.isAdmin" class="management__section">
        <h2 class="management__title"> Gestion des utilisateurs </h2>
        <UsersManagement v-for="user in allUsers" :key="user" :user="user" @delete-user="deleteUser"/>
      </section>
    </div>


    <Footer />
  </div>
  
</template>

<script>
  // @ is an alias to /src
  import {mapState} from 'vuex';
  //Imports components
  import Header from '../components/Header.vue';
  import UsersIdentity from '../components/UsersIdentity.vue';
  import UsersManagement from '../components/UsersManagement.vue';
  import Footer from '../components/Footer.vue';

  export default {
    name: 'Users',
    components: {
      Header,
      UsersIdentity,
      UsersManagement,
      Footer
    }, 
    computed: {
      ...mapState(['userInfos','userAccess', 'allUsers', 'status'])
    },
    created() {
      this.$store.dispatch('getUserParams');
      this.$store.dispatch('getUserProfile');     
    },
    mounted() {
      if (!this.userAccess) {
        this.$router.push('/');
        return;
      }
      this.$store.dispatch('getAllUsers');
      console.log(this.status);
    },
    methods: {
      getUserProfile() {
        this.$store.dispatch('getUserProfile')       
      },
      deleteUser(user) {
        this.$store.dispatch('deleteUser', user)
        .then(() => {
          this.$store.dispatch('getUserProfile')
          this.$store.dispatch('getAllUsers')
        })
        .catch(error => console.log(error));
      }
    }
  }

</script>

<style lang="scss" scopted>

 @import "@/assets/_variables.scss";

  .main {
    background-color: $bg-color;
  }
  .profile{
    &__card{
      padding-bottom: 60px;
    }
  }
  .management {
    &__section {
      margin: 30px;
      border: 2px $primary-color solid;
      border-bottom: none;
      border-top-left-radius: 25px;
      border-top-right-radius: 25px;
    }
    &__title {
      font-size: 1.3rem;
    }
  }

</style>