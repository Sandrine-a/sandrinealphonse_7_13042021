<template>

  <div class="main">
    <Header/>

    <div>
      <h1 lass="profil__title">Profil</h1>
      <section class="profil__card">
        <UsersIdentity @get-profile="getUserProfile" /> 
      </section> 

      <section v-if="this.userAccess.isAdmin">
        <h2> Liste des utilisateurs </h2>
        <div v-for="user in this.allUsers" :key="user">
          <p> {{ user.firstName }} {{ user.lastName }} </p>
        </div>
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
  import Footer from '../components/Footer.vue'

  export default {
    name: 'Users',
    components: {
      Header,
      UsersIdentity,
      Footer
    }, 
    data() {
    }, 
    computed: {
      ...mapState(['userInfos','userAccess', 'allUsers'])
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
      console.log(this.allUsers);
    },
    methods: {
      getUserProfile() {
        this.$store.dispatch('getUserProfile')       
      }
    }
  }

</script>

<style lang="scss" scopted>

 @import "@/assets/_variables.scss";

  .main {
    background-color: $bg-color;
  }
  .profil{
    &__card{
      padding-bottom: 100px;
    }
  }

</style>