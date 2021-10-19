<template>
  <div class="select">
    <label for="select" class="select__label">
      <input class="select__input" type="text" id="select" placeholder="Écrire ici...">
    </label>
  </div>

</template>

<script>
export default {
  name:'AddPostSelect'

}
</script>

<style lang="scss" scoped>

 @import "@/assets/_variables.scss";

 .select {
   &__input {
     border-radius: 10px;
     height: 30px;
     border: 1px solid black;
     width: 75%;
   }
 }


</style>