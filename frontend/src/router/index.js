import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import FeedPage from "../views/FeedPage.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import Profile from "../views/Profile.vue";
import EditPublication from "../views/EditPublication.vue";
import EditComment from "../views/EditComment.vue";
import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Accueil",
    },
  },
  {
    path: "/publications",
    name: "FeedPage",
    component: FeedPage,
    meta: {
      title: "Publications",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login",
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "Register",
    },
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: {
      title: "Forgot Password",
    },
  },
  {
    path: "/publication/edit/:id",
    name: "EditPublication",
    component: EditPublication,
    meta: {
      title: "Modifier publication",
    },
  },
  {
    path: "/comment/:id",
    name: "EditComment",
    component: EditComment,
    meta: {
      title: "Modifier commentaire",
    },
  },

  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      title: "Profil",
    },
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFound,
    meta: {
      title: "404 Not Found",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

//Modification du title qui apparait dans les onglets de navigation du navigateur
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Groupomania`;
  next();
});

export default router;
