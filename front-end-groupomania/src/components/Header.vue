<template>
  <header class="header">
    <div class="header__container">
      <div class="header__logo">
        <img src="../assets/icon-groupomania-black.svg" alt="logo Groupomania" class="header__logo--img">
      </div>
      <nav class="header__nav">
        <ul class="header__nav--list">
          <li class="nav__list"><router-link to="/posts" class="nav__link"><fa icon="home" class="nav__icon"/></router-link></li>
          <li class="nav__list"><router-link :to="`/users/${this.userAccess.userId}`" class="nav__link"><fa icon="user" class="nav__icon"/></router-link></li>
        </ul>
      </nav>
      <router-view />
      
    </div>
  </header>
  
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'Header',
  datas() {
    return {
    }
  },
  computed: {
    ...mapState(['userInfos','userAccess'])
  },
  methods: {
/*     getUserParams() {
      this.$store.dispatch('getUserParams');
    } */
  },
  mounted() {
    console.log(this.userAccess);
  }
}

</script>

<style lang="scss" scoped>

 @import "@/assets/_variables.scss";

   .header {
   background-color: $tertiary-color;
   border-bottom-left-radius: 20px;
   border-bottom-right-radius: 2px;
   padding: 0 25px;
   &__container {
    height: 150px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
   }
   &__logo {
     max-width: 350px;
     height: 70px;
     &--img {
       width: 100%;
     }
   }
   &__nav {
     list-style-type: none;
     &--list {
      display: flex;
      list-style-type: none;
     }
   }
 }
 a {
   color: black;
 }
 .nav {
  &__list {
  width: 100px;
  height: 50px;
  }
  &__icon {
    height: 100%;
    width: 80%;
  }
 }
</style>