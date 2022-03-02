<template>
  <div class="reset-password">
    <!--Affichage de la modal quand modalActive = true + écoute -->
    <Modal v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal" />
    <Loading v-if="loading" />
    <div class="form-wrap">
      <form class="reset">
        <p class="login-register">
          Retournez à
          <router-link class="router-link" :to="{ name: 'Login' }">Se connecter</router-link>
        </p>
        <h2>Réinitialiser le mot de passe</h2>
        <p>Mot de passe oublié? Entrez votre mot de passe pour le réinitialiser</p>
        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="Email" v-model="email" />
            <Email class="icon" />
          </div>
        </div>
        <button @click.prevent="resetPassword()">Réinitialiser</button>
        <div class="angle"></div>
      </form>
      <div class="background"></div>
    </div>
  </div>
</template>

<script>
//ICONS
import Email from "../assets/Icons/envelope-regular.svg";
//COMPONENTS
import Modal from "../components/Modal.vue";
import Loading from "../components/Loading.vue";

export default {
  name: "Forgot Password",
  data() {
    return {
      email: null,
      // Pour la modal
      modalActive: false,
      modalMessage: "",
      loading: null,
    };
  },
  components: { Email, Modal, Loading },
  methods: {
    //Permet de changer le statu de modalActive de true à false + clear le champ email
    closeModal() {
      this.modalActive = !this.modalActive;
      this.email = "";
      this.loading = false;
    },
    resetPassword() {
      this.loading = true; //On allume le spinner loading
      setTimeout(() => {
        this.loading = false; //On eteint le spinner loading
        this.modalMessage = "Fonctionnalité pas encore deployée";
        this.modalActive = !this.modalActive; //On active la modal
      }, 1500);
    },
  },
};
</script>

<style scoped>
.reset-password {
  position: relative;
}
.reset-password .form-wrap .reset h2 {
  margin-bottom: 8px;
}
.reset-password .form-wrap .reset p {
  text-align: center;
  margin-bottom: 32px;
}
</style>
