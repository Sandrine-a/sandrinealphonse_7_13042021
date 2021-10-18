<template>

  <div class="posts__card">
    <div class="posts__container">
      <article class="posts__content">
        <h2 class="posts__content-title"> Titre du post </h2>
        <div class="posts__content-article">
          <p class="posts__content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nec velit ac quam vehicula ultricies et eu nulla. Cras lacinia aliquet vulputate. Etiam molestie a magna at dapibus. Nullam suscipit ipsum sit amet sem ultricies, eu pretium nunc dapibus. Sed lacinia nibh in ligula ultrices tincidunt. Nulla ullamcorper iaculis nunc, id efficitur justo accumsan vitae. Nullam commodo facilisis erat, in imperdiet nisi gravida et.
          </p>
        </div>
      </article>
      <div class="posts__buttons">
        <div class="btn__main">
          <button class="btn__main-modify" type="button"> Modifier </button>
        </div>
        <div class="btn__main">
          <button class="btn__main-modify" type="button"> Supprimer </button>
        </div>
      </div>
      <section class="posts__reactions">
        <div class="posts__reactions-comments">
          <p>
            0 commentaire
          </p>
        </div>
        <div class="posts__reactions-likes">
          <fa icon="heart" class="posts__reactions-icon"/>
        </div>
      </section>

    </div>
    
  </div>
  
</template>

<script>
export default {
  name: "PostsCard"
  
}
</script>

<style lang="scss" scoped>

 @import "@/assets/_variables.scss";

  .posts {
    &__card {
      margin-bottom: 70px;
      background-color: white;
      border-radius: 25px;
      border: 2px solid $secondary-color;
    }
    &__content {
      text-align: start;
      &-title{
        color: $text-color-secondary;
      }
    }
    &__container {
      display: flex;
      flex-direction: column;
      padding: 20px;
    }
    &__buttons {
      display: flex;
      justify-content: space-around;
    }
    &__reactions {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      &-likes {
        padding-top: 15px;
        padding-right: 20px;
        width: 30px;
        height: 30px;
      }
      &-icon {
        height: 100%;
        width: 100%;
      }
    }
  }
  .btn__main{
  height: 50px;
  &-modify {
    color: white;
    background: $tertiary-color;
    border-radius: 10px;
    height: 100%;
    width: 300px;
    border: none;
    cursor: pointer;
    font-weight: bold;
    font-size: 4vh;
    }
  }

</style>
