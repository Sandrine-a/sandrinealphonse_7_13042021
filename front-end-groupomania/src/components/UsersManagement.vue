<template>

  <div class="management__user">

    <p class="management__user-identity">
     {{ user.firstName }} {{ user.lastName }} 
    </p>
    <div class="management__user-delete"  v-if="!user.isAdmin">
     <button @click.stop.prevent="deleteUser" class="btn__management-delete" type="button"> Supprimer </button>
    </div>
  </div>

</template>

<script>
    // @ is an alias to /src
  import {mapState} from 'vuex'

  export default {
    name:'UsersManagement',
    props: {
      user: Object
    },
    computed: {
      ...mapState(['userInfos','userAccess'])
    },
    methods: {
      deleteUser() {
        let result = confirm(`Confirmez-vous la suppression définitive de l'utilsateur ${this.user.lastName} ${this.user.firstName}?`);
        if(result) {
          this.$emit('delete-user', this.user)
        }     
      }
    }
  }
</script>

<style lang="scss" scopted>

 @import "@/assets/_variables.scss";

 .management{
   &__user{
      display: flex;
      justify-content: space-between;
      background-color: white;
      border: 1px $primary-color solid;
      &-identity {
        padding-left: 20px;
      }
      &-delete {
        padding-left: 20px;
      }
   }
 }
 .btn {
   &__management {
     &-delete {
      color: white;
      background: $tertiary-color;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      height: 100%;
      width: auto;
      border: none;
      cursor: pointer;
      font-weight: bold;
      font-size: 1.1rem;
     }
   }
 }

</style>