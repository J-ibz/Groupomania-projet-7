<template>
  <footer>
    <div class="container">
      <div class="left">
        <div class="col-1">
          <Groupomania class="brand" />
          <router-link class="header" :to="{ name: 'Home' }">Groupomania </router-link>
          <ul>
            <li>
              <a href="#"><Youtube class="svg-icon" /></a>
            </li>
            <li>
              <a href="#"><Twitter class="svg-icon" /></a>
            </li>
            <li>
              <a href="#"><Instagram class="svg-icon" /></a>
            </li>
            <li>
              <a href="#"><Linkedin class="svg-icon" /></a>
            </li>
          </ul>
        </div>
        <div class="col-2">
          <ul>
            <router-link class="link" :to="{ name: 'Home' }">Accueil</router-link>
            <router-link class="link" :to="{ name: 'FeedPage' }">Fil d'actualité</router-link>
            <router-link class="link" :to="{ name: 'Login' }">Login</router-link>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import Youtube from "../assets/Icons/youtube-brands.svg";
import Twitter from "../assets/Icons/twitter-brands.svg";
import Instagram from "../assets/Icons/instagram-brands.svg";
import Linkedin from "../assets/Icons/linkedin-brands.svg";
import Groupomania from "../assets/Icons/groupomania.svg";

export default {
  name: "TheFooter",
  components: {
    Youtube,
    Twitter,
    Instagram,
    Linkedin,
    Groupomania,
  },
};
</script>

<style scoped>
footer {
  margin-top: auto;
  padding: 100px 25px;
  background-color: #303030;
}
footer .container {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
@media (min-width: 800px) {
  footer .container {
    flex-direction: row;
    gap: 0px;
  }
}
footer .container > div {
  display: flex;
  flex: 1;
}
footer .container .left {
  gap: 32px;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}
@media (min-width: 800px) {
  footer .container .left {
    flex-direction: row;
    align-items: initial;
    gap: 0;
  }
}
footer .container .left .header {
  text-align: center;
  font-size: 24px;
  color: #fff;
  margin-bottom: 16px;
  text-decoration: none;
  font-weight: 600;
}
@media (min-width: 800px) {
  footer .container .left .header {
    text-align: initial;
  }
}
footer .container .left ul {
  gap: 16px;
  list-style: none;
  display: flex;
}
footer .container .left .col-1,
footer .container .left .col-2 {
  gap: 32px;
  display: flex;
  flex: 1;
}
@media (min-width: 800px) {
  footer .container .left .col-1,
  footer .container .left .col-2 {
    gap: 0;
  }
}
footer .container .left .col-1 {
  flex-direction: column;
  align-items: center;
}
footer .container .left .col-1 h2 {
  text-align: center;
}
@media (min-width: 800px) {
  footer .container .left .col-1 h2 {
    text-align: initial;
  }
}
footer .container .left .col-1 ul {
  margin-top: auto;
}
footer .container .left .col-1 ul li {
  display: flex;
  align-items: center;
}
footer .container .left .col-1 ul li .svg-icon {
  width: 24px;
  height: auto;
  color: #fff;
}
footer .container .left .col-2 ul {
  height: 100%;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
}
@media (min-width: 800px) {
  footer .container .left .col-2 ul {
    flex-direction: column;
  }
}
footer .container .left .col-2 ul .link {
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  text-decoration: none;
}
footer .container .right {
  gap: 32px;
  color: #fff;
  align-items: center;
  flex-direction: column;
}
@media (min-width: 800px) {
  footer .container .right {
    align-items: flex-end;
    gap: 0;
  }
}
footer .container p {
  margin-top: auto;
}

.col-1 .brand {
  width: 40px;
}
</style>
