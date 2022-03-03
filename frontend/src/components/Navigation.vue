<template>
  <header>
    <nav class="container">
      <div class="branding">
        <router-link class="header" :to="{ name: 'Home' }"><Groupomania class="brand" /> Groupomania</router-link>
      </div>
      <div class="nav-links">
        <ul v-show="!modeMobile">
          <router-link class="link" :to="{ name: 'Home' }">Accueil</router-link>
          <router-link class="link" :to="{ name: 'FeedPage' }">Fil d'actualité</router-link>
          <router-link v-if="!userData" class="link" :to="{ name: 'Login' }">Se connecter</router-link>
        </ul>
        <div v-if="userData" @click="toggleProfileMenu" class="profile" ref="profile">
          <span>{{ userInitials }}</span>
          <div v-show="profileMenu" class="profile-menu">
            <div class="info">
              <p class="initials">{{ userInitials }}</p>
              <div class="right">
                <p>{{ firstName }} {{ lastName }}</p>
                <p>{{ email }}</p>
              </div>
            </div>
            <div class="options">
              <div class="option">
                <router-link class="option" :to="{ name: 'Profile' }">
                  <UserIcon class="icon" />
                  <p>Profile</p>
                </router-link>
              </div>
            </div>
            <div v-if="role == 'Administrateur'" class="options">
              <div class="option">
                <router-link class="option" to="/admin">
                  <AdminIcon class="icon" />
                  <p>Admin</p>
                </router-link>
              </div>
            </div>
            <div class="options">
              <div @click="signOut" class="option">
                <SignOutIcon class="icon" />
                <p>Déconnexion</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <MenuIcon @click="toggleMobileNav" class="menu-icon" v-show="modeMobile" />
    <transition name="mobile-nav">
      <ul class="mobile-nav" v-show="mobileNav">
        <router-link class="link" :to="{ name: 'Home' }">Accueil</router-link>
        <router-link class="link" :to="{ name: 'FeedPage' }">Fil d'actualité</router-link>
        <router-link v-if="!userData" class="link" :to="{ name: 'Login' }">Se connecter</router-link>
      </ul>
    </transition>
  </header>
</template>

<script>
import axios from "axios";
import MenuIcon from "../assets/Icons/bars-regular.svg";
import UserIcon from "../assets/Icons/user-alt-light.svg";
import AdminIcon from "../assets/Icons/user-crown-light.svg";
import SignOutIcon from "../assets/Icons/sign-out-alt-regular.svg";
import Groupomania from "../assets/Icons/groupomaniablack.svg";

export default {
  name: "Navigation",
  components: {
    MenuIcon,
    UserIcon,
    AdminIcon,
    SignOutIcon,
    Groupomania,
  },
  data() {
    return {
      modeMobile: null, //va stocker un bolean pour savoir si on est en mobile view port ou non
      mobileNav: null, //va stocké un bolean pour savoir si notre navigation mobile est ouverte
      windowWidth: null, //va stocker la largeur de l'écran
      userData: "",
      userInitials: "",
      //On pré-remplit les inputs avec les info de l'user
      firstName: "",
      lastName: "",
      role: "",
      profileMenu: null,
    };
  },

  created() {
    window.addEventListener("resize", this.checkScreen); //Permet de vérifier a chaque resier la taille de l'écran
    this.checkScreen(); //Permet de vérifier la taille de l'écran au lancement de l'app
  },

  mounted() {
    this.getUser();
  },

  computed: {
    connected() {
      return this.currentUser;
    },
  },

  methods: {
    //Fonction qui permet de detecter la screen size (si inf a 750px on passe le bolean sur true et les autre sur false)
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 750) {
        this.modeMobile = true;
        return;
      } else {
        this.modeMobile = false;
        this.mobileNav = false;
      }

      return;
    },
    //Fonction qui permet d'activer la mobileNav quand on clic sur le hamburger
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },

    //Fonction qui permet d'activer le menu deroulant profile
    toggleProfileMenu(e) {
      if (e.target == this.$refs.profile) {
        this.profileMenu = !this.profileMenu;
      }
    },
    //Fonction qui permet la deconnexion
    signOut() {
      sessionStorage.clear();
      location.href = "/";
    },

    turnOffProfileMenu() {
      this.profileMenu = false;
    },

    getUser() {
      //Récupération de notre user dans le session storage
      const userId = sessionStorage.getItem("userId");
      const userToken = sessionStorage.getItem("token");

      if (userId) {
        axios
          .get("http://localhost:3000/api/users/" + userId, {
            headers: {
              Authorization: "Bearer " + userToken,
            },
          })
          .then((response) => {
            this.userData = response.data;
            this.firstName = response.data.firstName;
            this.lastName = response.data.lastName;
            this.email = response.data.email;
            this.role = response.data.role;
            sessionStorage.setItem("role", response.data.role);

            console.log("response getUser");
            console.log(response.data);
          })
          //Recupération des initiales de l'user
          .then(() => {
            let name = `${this.firstName} ${this.lastName}`;
            let rgx = new RegExp(/(\p{L}{1})\p{L}+/, "gu");
            let initials = [...name.matchAll(rgx)] || [];
            this.userInitials = ((initials.shift()?.[1] || "") + (initials.pop()?.[1] || "")).toUpperCase();
          })
          .catch((err) => console.log(err));
      }
    },
  },
};
</script>

<style scoped>
header {
  background-color: #fff;
  padding: 0 25px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 99;
}
header .link {
  font-weight: 500;
  padding: 0 8px;
  transition: 0.3s color ease;
}
header .link:hover {
  color: #1eb8b8;
}
header nav {
  display: flex;
  padding: 20px 0;
}
header nav .branding {
  display: flex;
  align-items: center;
}
header nav .branding .header {
  font-weight: 600;
  font-size: 24px;
  color: #000;
  text-decoration: none;
  display: flex;
  align-items: center;
}
header nav .nav-links {
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
}

@media (max-width: 750px) {
  header nav .nav-links {
    padding-right: 50px;
  }
}
header nav .nav-links ul {
  margin-right: 30px;
}
header nav .nav-links ul .link {
  margin-right: 30px;
}
header nav .nav-links ul .link:last-child {
  margin-right: 0;
}
header nav .nav-links .profile {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #fff;
  background-color: #303030;
  user-select: none;
}
header nav .nav-links .profile span {
  pointer-events: none;
}

header nav .nav-links .profile .profile-menu {
  position: absolute;
  top: 60px;
  right: 0;
  width: 250px;
  background-color: #303030;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
header nav .nav-links .profile .profile-menu .info {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #fff;
}
header nav .nav-links .profile .profile-menu .info .initials {
  position: initial;
  width: 40px;
  height: 40px;
  background-color: #fff;
  color: #303030;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
header nav .nav-links .profile .profile-menu .info .right {
  flex: 1;
  margin-left: 24px;
}
header nav .nav-links .profile .profile-menu .info .right p:nth-child(1) {
  font-size: 14px;
}
header nav .nav-links .profile .profile-menu .info .right p:nth-child(2),
header nav .nav-links .profile .profile-menu .info .right p:nth-child(3) {
  font-size: 12px;
}
header nav .nav-links .profile .profile-menu .options {
  padding: 15px;
}
header nav .nav-links .profile .profile-menu .options .option {
  text-decoration: none;
  color: #fff;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}
header nav .nav-links .profile .profile-menu .options .option .icon {
  width: 18px;
  height: auto;
}
header nav .nav-links .profile .profile-menu .options .option p {
  font-size: 14px;
  margin-left: 12px;
}
header nav .nav-links .profile .profile-menu .options .option:last-child {
  margin-bottom: 0px;
}
header nav .mobile-user-menu {
  margin-right: 40px;
}
header .menu-icon {
  cursor: pointer;
  position: absolute;
  top: 30px;
  right: 25px;
  height: 25px;
  width: auto;
}
header .mobile-nav {
  padding: 20px;
  width: 70%;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100%;
  background-color: #303030;
  top: 0;
  left: 0;
}
header .mobile-nav .link {
  padding: 15px 0;
  color: #fff;
}
header .mobile-nav-enter-active,
header .mobile-nav-leave-active {
  transition: all 1s ease;
}
header .mobile-nav-enter {
  transform: translateX(-250px);
}
header .mobile-nav-enter-to {
  transform: translateX(0);
}
header .mobile-nav-leave-to {
  transform: translateX(-250px);
}

.brand {
  width: 50px;
  padding-right: 5px;
}
</style>
