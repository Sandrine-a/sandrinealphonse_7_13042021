
<template>
  <div class="home">

    <div class="frame">
      <img alt="Vue sur Paris" src="../assets/groupomania_couverture_paris.jpg" class="frame__image">
      <div class="frame__logo">
       <img alt="Groupomania logo" src="../assets/icon-groupomania-white.svg" class="frame__logo--icon">
       </div>
    </div>
    <div class="form">     
     <Login/>
    </div>
  </div>

</template>

<script>
// @ is an alias to /src

import Login from '@/components/Login.vue'

export default {
  name: 'Home',
  components: {
    Login
  }
}
</script>

<style lang="scss" scopted>

 @import "@/assets/_variables.scss";


 .home{
   display: flex;
   position: absolute;  
 } 

 .frame {
/*   width: 40%; */
  position: relative;
  top: 0;
  left: 0;
   &__image {
     width: 100%;
     object-fit: fill;
     
   }
   &__logo {
     position: absolute;
     max-width: 30%; 
     height: 100px;
     background-color: $secondary-color; 
     border-radius: 25px; 
     position: relative;
     bottom: 100px;
     left: 30%;
     &--icon {
       padding: 20px;
       width: 80%;

     }
   }
 }

 .form {
   width:60%;
   position: relative;
   right: 25px;
   top:0;
   border-top-left-radius: 25%;
   border-bottom-left-radius: 25%;
   background-color: white;
 }

</style>
