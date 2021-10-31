<template>

  <div class="main">
    <Header/>

    <div>
      <h1 lass="profil__title">Profil</h1>
      <section class="profil__card">
        <UsersIdentity @get-profile="getUserProfile" /> 
      </section> 
        
    </div>
    
  </div>
  
</template>

<script>
  //Imports components
  import Header from '../components/Header.vue';
  import UsersIdentity from '../components/UsersIdentity.vue'
  // @ is an alias to /src
  import {mapState} from 'vuex';

  export default {
    name: 'Users',
    data() {
      return {
      }
    },
    components: {
      Header,
      UsersIdentity
    },  
    computed: {
      ...mapState(['userInfos','userAccess'])
    },
    created() {
      this.$store.dispatch('getUserParams');
      this.$store.dispatch('getUserProfile')  
    },
    mounted() {
      if (!this.userAccess) {
        this.$router.push('/');
        return;
      }
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