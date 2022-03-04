<template>
  <div>
    <div class="container site">
      <main class="main">
        <article v-for="publication in publicationsList" :key="publication.id" class="card" :class="{ active: publication === activeItem }">
          <header class="card-header card-header-avatar">
            <img :src="publication.avatar" alt="avatar" width="45" height="45" class="card-avatar" />
            <section class="card-header-wrapper">
              <div class="card-title">{{ publication.firstName }} {{ publication.lastName }}</div>
              <time class="card-date">
                {{ "Publié le " + publication.createdAt.slice(0, 10).split("-").reverse().join("/") + " à " + publication.createdAt.slice(11, 16) }}
              </time>
            </section>
          </header>
          <div class="card-body">
            <!-- Ne s'affiche que si on a un fichier uploadé  -->
            <div v-if="publication.messageUrl">
              <img :src="publication.messageUrl" alt="img posted" class="fullwidth" />
            </div>
            <p v-show="publication.message">
              {{ publication.message }}
            </p>
          </div>
          <footer class="card-footer">
            <div @click="like"><Like /><span class="card-icon">0 like</span></div>
            <!-- Active la fenêtre de commentaires au clic -->
            <div
              class="commentaires"
              @click="
                selectItem(publication);
                getComments(publication);
              "
            >
              <Comment /><span class="card-icon">Espace commentaires</span>
            </div>
            <!-- Si l'utilisateur est admin ou si le userId correpsondant à l'UserId de la publication alors on affiche l'icone modifier -->
            <div v-if="userId == publication.UserId || role == 'Administrateur'">
              <a class="link" :href="'/publication/edit/' + publication.id"><Edit /><span class="card-icon">Modifier</span></a>
            </div>
          </footer>
          <section class="comment-section" v-if="activeItem == publication.id">
            <input class="comment-section-messageBox" placeholder="Ecrivez quelque chose..." type="text" v-model="newComment" />
            <Send class="send" @click="postComment(publication)" />
          </section>
          <!-- ESPACE COMMENTAIRES -->
          <div v-if="activeItem == publication.id">
            <section v-for="comment in commentsList" :key="comment.id" class="comment-section">
              <img :src="comment.User.avatar" alt="avatar" width="45" height="45" class="card-avatar" />
              <div class="comment-section-messageBox comment-displayed">
                <small class="header-comment">
                  <div class="header-comment-title">
                    <b>{{ comment.User.firstName }} {{ comment.User.lastName }}</b>

                    <small v-if="userId == comment.UserId || role == 'Administrateur'">
                      <a class="edit" :href="'/comment/' + comment.id"><span>Editer</span></a>
                    </small>
                  </div>
                  <time v-if="!modeMobile" v-show="comment.updatedAt === comment.createdAt" class="card-date header-comment-date">
                    {{ "Publié le " + comment.createdAt.slice(0, 10).split("-").reverse().join("/") + " à " + comment.createdAt.slice(11, 16) }}
                  </time>

                  <time v-if="!modeMobile" v-show="comment.updatedAt != comment.createdAt" class="card-date header-comment-date">
                    {{ "Modifié le " + comment.updatedAt.slice(0, 10).split("-").reverse().join("/") + " à " + comment.updatedAt.slice(11, 16) }}
                  </time>
                </small>

                {{ comment.comment }}
              </div>
              <Delete @click="deleteComment(comment, publication)" v-if="userId == comment.UserId || role == 'Administrateur'" class="delete" />
            </section>
          </div>
        </article>
      </main>
    </div>
  </div>
</template>

<script>
import axios from "axios";
//ICONS
import Send from "../assets/Icons/send.svg";
import Like from "../assets/Icons/like.svg";
import Comment from "../assets/Icons/comment.svg";
import Edit from "../assets/Icons/edit-regular.svg";
import Delete from "../assets/Icons/delete.svg";
//COMPONENTS

export default {
  name: "PostCard",
  components: { Like, Comment, Edit, Send, Delete },

  data() {
    return {
      publicationsList: [],
      commentsList: [],

      // role: sessionStorage.getItem("role"),
      role: "",
      avatar: "",
      userId: "",
      newComment: "",
      activeItem: null,
      activeMessage: null,

      // Pour la modal
      modalActive: false,
      modalMessage: "",
      loading: null,

      modeMobile: null,
    };
  },

  created() {
    window.addEventListener("resize", this.checkScreen); //Permet de vérifier a chaque resier la taille de l'écran
    this.checkScreen(); //Permet de vérifier la taille de l'écran au lancement de l'app
  },

  computed: {},

  mounted() {
    this.getAllMessages();

    this.firstName = sessionStorage.getItem("firstName");
    this.lastName = sessionStorage.getItem("lastName");
    this.userId = sessionStorage.getItem("userId");
    this.avatar = sessionStorage.getItem("avatar");
  },

  methods: {
    //SELECT 1 ELEMENT
    selectItem(publication) {
      this.activeItem = publication.id;
    },

    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 750) {
        this.modeMobile = true;
        return;
      } else {
        this.modeMobile = false;
      }

      return;
    },

    like() {
      window.alert("Fonctionnalité pas encore implémenté");
    },

    //EDIT PUBLICATION
    editPublication(publication) {
      const userToken = sessionStorage.getItem("token");

      axios
        .get("http://localhost:3000/api/messages/" + publication.id, { headers: { Authorization: "Bearer " + userToken } })
        .then((res) => {
          console.log("This is the res from get message/id");
          console.log(res);
          this.$router.push({ name: "FeedPage" }); //REDIRECT TO FEEDPAGE
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    //GET ALL MESSAGES (permet de peuplé toutes nos cartes avec un combo v-for)
    getAllMessages() {
      const userToken = sessionStorage.getItem("token");
      axios
        .get("http://localhost:3000/api/messages", {
          headers: { Authorization: "Bearer " + userToken },
        })
        .then((response) => {
          this.publicationsList = response.data.ListeMessages;
          this.role = sessionStorage.getItem("role");
          console.log(sessionStorage.getItem("role"));
          console.log("response to get all messages");
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //POST COMMENT
    postComment(publication) {
      this.activeItem = publication.id;
      if (!this.newComment == "") {
        axios
          .post(
            "http://127.0.0.1:3000/api/comments/",
            { MessageId: this.activeItem, UserId: this.userId, comment: this.newComment },
            { headers: { Authorization: "Bearer " + sessionStorage.getItem("token") } }
          )
          .then((res) => {
            this.newComment = "";
            console.log("this is response from postComment");
            console.log(res);
          })
          //On refait un GET pour MAJ
          .then(() => {
            this.getComments(publication);
          })
          .catch((err) => {
            console.log("this is err from postComment");
            console.log(err);
          });
      }
    },
    //GET ALL COMMENTS (s'active lors du clic de l'icone "comment")
    getComments(publication) {
      const activeItem = publication.id;
      axios
        .get("http://127.0.0.1:3000/api/comments/messages/" + activeItem, {
          headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
        })
        .then((res) => {
          console.log("this is response for getting all comments");
          console.log(res);
          this.commentsList = res.data;
        });
    },
    //DELETE COMMENT (on recup comment et publication en parametre pour 1- delete l'item selectionné et 2- permettre de refaire un GET tout en gardant le rendu (si le get était fais avec comment en parametre la fenetre se fermée. obligé de recliquer sur "comment")) //
    deleteComment(comment, publication) {
      const activeComment = comment.id;
      axios
        .delete("http://127.0.0.1:3000/api/comments/" + activeComment, {
          headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
        })
        .then((response) => {
          // this.modalMessage = response.data.message; //On recup le message du back
          // this.modalActive = !this.modalActive; //On active la modal
          console.log("this is response from deleteComment");
          console.log(response.data.message);
        })

        //On refait un get derrière pour MAJ
        .then(() => {
          this.getComments(publication);
        })
        .catch((err) => {
          console.log("this is error from deleteComment");
          console.log(err);
        });
    },
  },
};
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* CARD START */
.card {
  border: solid 1px #dbdbdb;
  background: #fff;
  border-radius: 3px;
  margin-bottom: 15px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%);
}

.wrapper {
  display: flex;
  justify-content: start;
  align-items: center;
}

.comment-section {
  display: flex;
  align-items: center;
}

.comment-section-messageBox {
  border-top: solid 1px #dbdbdb;
  margin-right: 5px;
}

.comment-section .send:hover {
  cursor: pointer;
  fill: #1b74e4;
  transition: all 0.2s ease;
}

.delete:hover {
  cursor: pointer;
  fill: red;
  transition: all 0.2s ease;
}
.card:last-child {
  margin-bottom: 0;
}

/*CARD HEADER */
.card-header {
  padding: 10px;
  display: flex;
  align-items: center;
  border-bottom: solid 1px #dbdbdb;
}

.card-header-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: end;
  padding-left: 10px;
}

.card-avatar {
  border-radius: 50%;
  filter: brightness(0.4) invert(1);
}
.card-title {
  font-weight: bold;
  font-size: 18px;
  color: #000;
  margin-bottom: 5px 0;
}

.card-date {
  color: rgba(0, 0, 0, 0.38);
  font-size: 12px;
}

/* CARD BODY */
.card-body {
  padding: 0 10px;
}

.card-body p {
  padding-top: 5px;
  padding-bottom: 5px;
}

.card-body a {
  color: #34aaff;
  text-decoration: underline;
}

.card-body .fullwidth {
  width: calc(100% + 20px);
  display: block;
  margin-left: -10px;
  margin-right: -10px;
  object-fit: cover;
  height: 300px;
}

/*CARD FOOTER*/
.card-footer {
  border-top: solid 1px #dbdbdb;
  background: #fbfbfb;
  display: flex;
  padding: 10px;
  font-size: 12px;
  color: #dbdbdb;
  justify-content: space-around;
  border-bottom: solid 1px #dbdbdb;
}

.card-footer div {
  display: flex;
  align-items: end;
}

.card-icon {
  padding-left: 5px;
}

.card-footer div:hover {
  text-decoration: underline;
  cursor: pointer;
}

/*ASIDE*/
aside p {
  margin-top: 0;
}

.bio {
  display: none;
}

/*ASIDE SUGGESTION FRIEND*/
.sidebar-title {
  margin-top: 30px;
  margin-bottom: 20px;
  font-weight: bold;
  color: #000;
  font-size: 15px;
}
.sidebar-title::after {
  content: "";
  display: block;
  height: 1px;
  width: 100%;
  margin-top: 4px;
  background: #000;
}

.friend {
  margin: 14px 0;
  display: flex;
}

.friend-body {
  display: flex;
  flex-direction: column;
}
.friend-avatar {
  width: 70px;
  height: 70px;
  margin-right: 10px;
  flex: none;
}

.friend-avatar {
  display: block;
  font-weight: bold;
  color: #000;
}

.friend-name {
  display: block;
  font-weight: bold;
  color: #000;
  font-size: 15px;
  margin-bottom: 2px;
}

.friend-common {
  color: rgba(0, 0, 0, 0.38);
  font-size: 12px;
}

.friend-add {
  display: flex;
  font-size: 12px;
  color: #000;
  margin-top: auto;
}

.add-icon {
  padding-left: 5px;
}

.comment-section {
  margin: 20px;
}

.comment-section-messageBox {
  border: none;
  outline: none;
  background-color: #f2f7f6;
  width: 100%;
  border-radius: 25px;
  padding: 5px 5px 5px 20px;
  font-size: 15px;
  display: flex;
  align-items: center;
}
.comment-section-messageBox:focus {
  filter: brightness(95%);
  transition: all 0.2s ease;
}

.comment-displayed {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.edit {
  text-decoration: none;
}

.edit span {
  padding-left: 5px;
  color: #000;
}

.edit:hover {
  color: #000;
  font-weight: 600;
  text-decoration: underline;
}

.comment-section.commentaires {
  display: flex;
  flex-flow: column-reverse;
}
.header-comment {
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
}

.header-comment-date {
  margin-left: auto;
}
</style>
