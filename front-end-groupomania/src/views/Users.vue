<template>

  <div class="main">
    <Header/>

    <div>
      <h1 lass="profil__title">Profil</h1>
      <section class="profil__card">
        <UsersIdentity /> 
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
    components: {
      Header,
      UsersIdentity
    },  
    computed: {
      ...mapState(['userInfos','userAccess'])
    },
    mounted() {
      console.log(this.userAccess);
      if (this.userAccess.userId == -1 ) {
        this.$router.push('/');
        return;
      }
      this.$store.dispatch('getUserParams');
      this.$store.dispatch('getUserProfile');
    },
    methods: {

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