<template>
  <div class="modal">
    <Modal v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal" />
    <Loading v-if="loading" />
    <div class="main">
      <a :href="'/publications'"><Close class="icon close" /></a>

      <header class="modal-header">
        <h2>Modifier votre commentaire</h2>
      </header>
      <section class="modal-body">
        <img :src="avatar" alt="user-avatar" class="card-avatar" />
        <textarea v-model="editedComment" @input="resize($event)" type="text" />
      </section>
      <footer>
        <button @click="updateComment">Modifier</button>
      </footer>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Modal from "../components/Modal.vue";
import Loading from "../components/Loading.vue";

import Close from "../assets/Icons/close.svg";

export default {
  name: "updatePublication",
  components: { Close, Modal, Loading },

  data() {
    return {
      firstName: "",
      userId: "",
      role: "",
      avatar: "",
      editedComment: "",

      file: null,

      modalActive: false,
      modalMessage: "",
      loading: null,
    };
  },

  mounted() {
    this.getComments();
  },

  methods: {
    //CLOSE MODAL
    closeModal() {
      this.$emit("close-modal"); //On envoi un emit au store a chaque fois qu'on clique le bouton
      this.$router.push({ name: "FeedPage" }); //REDIRECT TO FEEDPAGE
    },

    //RESIZE TEXT AREA
    resize(e) {
      e.target.style.height = "auto";
      e.target.style.height = `${e.target.scrollHeight}px`;
    },

    getComments() {
      axios
        .get("http://127.0.0.1:3000/api/comments/" + this.$route.params.id, {
          headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
        })
        .then((res) => {
          console.log("this is response for getting one comment");
          console.log(res);
          this.editedComment = res.data.comment;
          this.avatar = res.data.User.avatar;
        });
    },

    updateComment() {
      this.loading = true;
      axios
        .put(
          "http://127.0.0.1:3000/api/comments/" + this.$route.params.id,
          { comment: this.editedComment },
          { headers: { Authorization: "Bearer " + sessionStorage.getItem("token") } }
        )
        .then((response) => {
          this.loading = false; //On eteint le spinner "loading"
          this.modalMessage = response.data.message; //On recup le message du back
          this.modalActive = !this.modalActive; //On active la modal
          console.log("response to updatePublication");
          console.log(response.data.message);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
}

.main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 8px;
  width: 400px;
  min-height: 500px;
  padding: 40px 30px;
  background-color: #fff;
  position: relative;
}

.main a {
  position: absolute;
  top: 7px;
  right: 10px;
}

.main header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.main header h2 {
  display: flex;
  justify-content: center;
  font-size: 24px;
  font-weight: 400;
  text-decoration: underline 1px #dbdbdb;
  text-underline-offset: 10px;
  padding-bottom: 3px;
  padding-bottom: 10px;
  border-radius: 3px;
}

.modal-body {
  display: flex;
  padding: 15px 0;
}

.icon {
  width: 35px;
  height: auto;
}
.modal-file {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.modal-file p {
  padding-bottom: 10px;
}

input#file {
  padding-top: 10px;
  padding-bottom: 24px;
}

textarea {
  border: none;
  background-color: #f2f7f6;
  width: 100%;
  border-radius: 25px 25px 0px 25px;
  padding: 5px 5px 5px 20px;
  max-height: 250px;
  outline: none;
  resize: none;
  height: auto;
}
.close:hover {
  cursor: pointer;
  fill: rgba(48, 48, 48, 0.7);
}

.publication-photo {
  border-radius: 5px;
  width: 350px;
  height: 300px;
}

img {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  object-fit: cover;
}

footer {
  display: flex;
  justify-content: space-around;
}
</style>
