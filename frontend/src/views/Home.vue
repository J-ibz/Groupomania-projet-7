<template>
  <div class="home">
    <Publication :post="welcomeScreen" />
  </div>
</template>

<script>
// @ is an alias to /src
import Publication from "../components/Publication.vue";

export default {
  name: "Home",
  components: { Publication },
  data() {
    return {
      welcomeScreen: {
        title: "Bienvenue !",
        welcomeMessage: " Avec Groupomania! Partagez vos photos préféré et restez en contact avec vos collègues! ",
        welcomeScreen: true,
        photo: "welcome",
      },
    };
  },
};
</script>
