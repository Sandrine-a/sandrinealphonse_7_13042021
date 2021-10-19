<template>

  <div class="main">
    <Header/>

    <div>
      <h1>Profil</h1>
        <UsersIdentity /> 
        
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
    mounted() {
      console.log(this.$store.state.user.userId);
      if (this.$store.state.user.userId == -1 ) {
        this.$router.push('/');
        return;
      }
      this.$store.dispatch('getUserParams');
      this.$store.dispatch('getUserProfile');
    },  
    computed: {
      ...mapState({
        user: 'userInfos',
        userParams: 'user'
      })
    },
  }

</script>

<style lang="scss" scopted>

 @import "@/assets/_variables.scss";

  .main {
    background-color: $bg-color;
  }

</style>