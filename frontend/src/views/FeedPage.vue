<template>
  <div class="container site">
    <!-- <PostCardNav /> -->

    <main v-if="userId" class="main">
      <CreatePost />

      <PostCard />
      <!-- <PostCard v-for="(post, index) in sampleBlogPost" :key="index" /> -->
    </main>

    <main v-if="!userId">Vous devez être connecté</main>
    <!-- <PostCardAside /> -->
  </div>
</template>

<script>
import PostCard from "../components/PostCard.vue";
import CreatePost from "../components/CreatePostButton.vue";

// import PostCardAside from "../components/PostCardAside.vue";
// import PostCardNav from "../components/PostCardNav.vue";
export default {
  name: "FeedPage",
  components: { PostCard, CreatePost },
  // PostCardAside, PostCardNav

  data() {
    return {
      userId: "",
    };
  },
  computed: {
    //On récupère nos states depuis le store
    sampleBlogPost() {
      return this.$store.state.sampleBlogPost;
    },
  },
  mounted() {
    this.userId = sessionStorage.getItem("userId");
  },
};
</script>

<style>
.container {
  /* padding: 0 15px; */
  max-width: 1080px;
  margin-left: auto;
  margin-right: auto;
}

.site {
  margin-top: 20px;
  margin-bottom: 20px;
}

.main {
  margin-bottom: 20px;
}

@media only screen and (min-width: 1050px) {
  .site {
    display: flex;
  }

  .main {
    width: 100%;
    margin-left: 30px;
    margin-right: 30px;
  }
  .aside {
    flex: none;
    width: 310px;
  }
}
</style>
