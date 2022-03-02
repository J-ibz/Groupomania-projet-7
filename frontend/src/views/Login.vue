<template>
  <div class="form-wrap">
    <Modal v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal" />
    <Loading v-if="loading" />
    <form class="login">
      <p class="login-register">
        Vous n'avez pas encore de compte?
        <router-link class="router-link" :to="{ name: 'Register' }">S'enregistrer</router-link>
      </p>
      <h2>Se connecter à Groupomania</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="Email" v-model="email" />
          <Email class="icon" />
        </div>
        <div class="input">
          <input type="password" placeholder="Passord" v-model="password" />
          <Password class="icon" />
        </div>
      </div>
      <div v-show="error" class="error">{{ this.errorMsg }}</div>
      <router-link class="forgot-password" :to="{ name: 'ForgotPassword' }">Mot de passe oublié?</router-link>
      <button @click.prevent="userLogin()">Se connecter</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
//COMPONENTS
import Modal from "../components/Modal.vue";
import Loading from "../components/Loading.vue";
//MODULES
import axios from "axios";
//ICONS
import Email from "../assets/Icons/envelope-regular.svg";
import Password from "../assets/Icons/lock-alt-solid.svg";

export default {
  name: "Login",
  components: {
    Email,
    Password,
    Modal,
    Loading,
  },
  data() {
    return {
      email: "",
      password: "",
      //ERRORS HANDLER
      error: null,
      errorMsg: "",
      //RELATIVE TO MODAL & SPINNER
      modalActive: false,
      modalMessage: "",
      loading: null,
    };
  },
  methods: {
    //FONCTION QUI PERMET D'ACTIVER/DESACTIVER MODAL
    closeModal() {
      this.modalActive = !this.modalActive;
      this.email = "";
    },
    //FONCTION QUI PERMET DE LOG UN USER
    userLogin() {
      if (this.email == "" && this.password == "") {
        this.error = true;
        this.errorMsg = "Merci de remplir tous les champs";
      } else {
        this.loading = true; //TURN ON SPINNER
        this.error = false;
        this.errorMsg = "";
        axios
          .post("http://localhost:3000/api/auth/login", {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            sessionStorage.setItem("token", response.data.token);
            sessionStorage.setItem("userId", response.data.userId);
            sessionStorage.setItem("userName", response.data.userName);
            sessionStorage.setItem("firstName", response.data.firstName);
            sessionStorage.setItem("lastName", response.data.lastName);
            sessionStorage.setItem("userEmail", response.data.userEmail);
            sessionStorage.setItem("avatar", response.data.avatar);
            sessionStorage.setItem("role", response.data.role);
            console.log(response.data);
            this.loading = false; //TURN OFF SPINNER
            this.$router.push({ name: "FeedPage" }); //REDIRECT TO FEEDPAGE
          })
          .catch((error) => {
            this.loading = false;
            this.error = true;
            this.errorMsg = error.response.data.error;
          });
      }
    },
  },
};
</script>

<style>
.form-wrap {
  overflow: hidden;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-self: center;
  margin: 0 auto;
  width: 90%;
}
@media (min-width: 900px) {
  .form-wrap {
    width: 100%;
  }
}
.form-wrap .login-register {
  margin-bottom: 32px;
}
.form-wrap .login-register .router-link {
  color: #000;
}
.form-wrap form {
  padding: 0 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
}
@media (min-width: 900px) {
  .form-wrap form {
    padding: 0 50px;
  }
}
.form-wrap form h2 {
  text-align: center;
  font-size: 32px;
  color: #303030;
  margin-bottom: 40px;
}
@media (min-width: 900px) {
  .form-wrap form h2 {
    font-size: 40px;
  }
}
.form-wrap form .inputs {
  width: 100%;
  max-width: 350px;
}
.form-wrap form .inputs .input {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
}
.form-wrap form .inputs .input input {
  width: 100%;
  border: none;
  background-color: #f2f7f6;
  padding: 4px 4px 4px 30px;
  height: 50px;
}
.form-wrap form .inputs .input input:focus {
  outline: none;
}
.form-wrap form .inputs .input .icon {
  width: 12px;
  position: absolute;
  left: 6px;
}
.form-wrap form .forgot-password {
  text-decoration: none;
  color: #000;
  cursor: pointer;
  font-size: 14px;
  margin: 16px 0 32px;
  border-bottom: 1px solid transparent;
  transition: 0.5s ease all;
}
.form-wrap form .forgot-password:hover {
  border-color: #303030;
}
.form-wrap form .angle {
  display: none;
  position: absolute;
  background-color: #fff;
  transform: rotateZ(3deg);
  width: 60px;
  right: -30px;
  height: 101%;
}
@media (min-width: 900px) {
  .form-wrap form .angle {
    display: initial;
  }
}
.form-wrap .background {
  display: none;
  flex: 2;
  background-size: cover;
  background-image: url("../assets/background.png");
  width: 100%;
  height: 100%;
}
@media (min-width: 900px) {
  .form-wrap .background {
    display: initial;
  }
}
</style>
