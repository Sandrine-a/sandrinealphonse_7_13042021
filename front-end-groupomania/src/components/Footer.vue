<template>

  <footer class="footer">
    <nav class="footer__nav">
      <ul class="footer__nav-list">
        <li class="nav__list">À propos</li>
        <li class="nav__list">Conditions générales et confidentilité</li>
        <li class="nav__list exit" @click="exitApp"> Se déconnecter </li>
      </ul>
    </nav>
    <div class="footer__corporate">
      <img src="../assets/icon-groupomania-white.svg" alt="logo footer Groupomania" class="footer_logo-img">
    </div>
  </footer>
  
</template>

<script>
import { mapState } from 'vuex'

export default {
  name:'Footer',
  data() {
    return{
    }
  },
  computed: {
    ...mapState(['userInfos','userAccess'])
  },
  methods: {
    exitApp() {
      this.$store.dispatch('exitApp')
      this.$router.push('/');
    }

  }

}
</script>

<style lang="scss" scoped>

 @import "@/assets/_variables.scss";

 .footer {
   margin-top: 30px;
   padding: 30px 0;
   background-color: $primary-color;
   color:$text-color-secondary;
   &__nav {
     cursor: pointer;
     &-list {
       list-style-type: none;
       padding: 0;
     }
   }
  }
  .exit {
    font-weight: bold;
  }
  .footer_logo-img {
    width: 200px
  }


</style>