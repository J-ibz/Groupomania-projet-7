<template>
  <div class="app-wrapper">
    <div id="app">
      <!--Ne s'affichera que si la data navigation est à false -->
      <Navigation v-if="!navigation" />
      <router-view />
      <TheFooter v-if="!navigation" />
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import TheFooter from "@/components/TheFooter.vue";
export default {
  name: "app",
  components: { Navigation, TheFooter },
  data() {
    return {
      navigation: null, //On déclare une valeur navigation afin de la passer a true ou false en fonction de la route sur laquelle on se trouve (via la fonction checkRoute)
    };
  },
  created() {
    this.checkRoute(); //Permet d'initialiser la fonction
  },
  mounted() {},
  methods: {
    //On vérifie si la route est = à /login /register /forgot-password etc pour pouvoir cacher la bar de navigation si on se trouve sur ces routes.
    checkRoute() {
      if (this.$route.name === "Login" || this.$route.name === "Register" || this.$route.name === "ForgotPassword") {
        this.navigation = true;
        return;
      }
      this.navigation = false;
    },
  },

  watch: {
    $route() {
      this.checkRoute();
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
}
.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}
.link-light {
  color: #fff;
}

.arrow {
  color: #fff;
  width: 12px;
}
.arrow path {
  fill: #000;
}

.arrow-light path {
  fill: #303030;
}

/* BUTTON */
button,
.router-button {
  transition: 500ms ease all;
  cursor: pointer;
  margin-top: 24px;
  padding: 12px 24px;
  background-color: #303030;
  color: #fff;
  border-radius: 20px;
  border: none;
  text-transform: uppercase;
}
button:focus,
.router-button:focus {
  outline: none;
}
button:hover,
.router-button:hover {
  background-color: rgba(48, 48, 48, 0.7);
}
.button-ghost {
  color: #000;
  padding: 0;
  border-radius: 0;
  margin-top: 50px;
  font-size: 15px;
  font-weight: 500;
  background-color: transparent;
}
@media (min-width: 700px) {
  .button-ghost {
    margin-top: 0;
    margin-left: auto;
  }
}
.button-ghost i {
  margin-left: 8px;
}
.button-light {
  background-color: transparent;
  border: 2px solid #fff;
  color: #fff;
}
.button-inactive {
  pointer-events: none !important;
  cursor: none !important;
  background-color: rgba(128, 128, 128, 0.5) !important;
}

.error {
  text-align: center;
  font-size: 12px;
  color: red;
}
</style>
