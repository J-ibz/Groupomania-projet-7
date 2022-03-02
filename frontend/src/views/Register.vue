<template>
  <div class="form-wrap">
    <Modal v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal" />
    <Loading v-if="loading" />
    <form class="register">
      <p class="login-register">
        Vous avez déjà un compte?
        <router-link class="router-link" :to="{ name: 'Login' }">Se connecter</router-link>
      </p>
      <h2>Créez votre compte Groupomania</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="Prénom" v-model="prenom" />
          <User class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Nom" v-model="nom" />
          <User class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Email" v-model="email" />
          <Email class="icon" />
        </div>
        <div class="input">
          <input type="password" placeholder="Mot de passe" v-model="password" />
          <Password class="icon" />
        </div>
        <!--Ne s'affiche que si error = true -->
        <div v-show="error" class="error">{{ this.errorMsg }}</div>
      </div>
      <button @click.prevent="userRegister()">S'enregistrer</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
//Components
import Modal from "../components/Modal.vue";
import Loading from "../components/Loading.vue";
//Icons SVG au format de components grace à vue-svg-loader
import Email from "../assets/Icons/envelope-regular.svg";
import Password from "../assets/Icons/lock-alt-solid.svg";
import User from "../assets/Icons/user-alt-light.svg";
//Dependencies
import axios from "axios";

export default {
  name: "Register",
  components: {
    Email,
    Password,
    User,
    Modal,
    Loading,
  },
  data() {
    return {
      //Permet de récupérer la valeur des inputs
      prenom: "",
      nom: "",
      email: "",
      password: "",
      //Gestion affichage des erreurs
      error: null,
      errorMsg: "",
      // Pour la modal
      modalActive: false,
      modalMessage: "",
      loading: null,
    };
  },
  methods: {
    closeModal() {
      this.modalActive = !this.modalActive;
      this.email = "";
      this.$router.push({ name: "Login" });
    },

    userRegister() {
      if (this.prenom == "" || this.nom == "" || this.email == "" || this.password == "") {
        this.error = true; // Si au moins 1 champ est vide on signal une erreur
        this.errorMsg = "Merci de remplir tous les champs"; //le message d'erreur
      } else {
        this.loading = true; // Activation du spinner "loading"
        this.error = false;
        this.errorMsg = "";
        axios
          .post("http://localhost:3000/api/auth/signup", {
            firstName: this.prenom,
            lastName: this.nom,
            email: this.email,
            userName: this.email,
            password: this.password,
          })
          .then((response) => {
            // Pour la modal
            this.loading = false; //On eteint le spinner "loading"
            this.modalMessage = response.data.message; //On recup le message du back
            this.modalActive = !this.modalActive; //On active la modal
            console.log(response.data.message);
          })
          .catch((err) => {
            this.loading = false;
            this.error = true;
            this.errorMsg = err.response.data.message;
            console.log(err.response.data.message);
          });
      }
    },
  },
};
</script>

<style scoped>
.register h2 {
  max-width: 350px;
}
</style>
