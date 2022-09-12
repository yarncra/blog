<template>
  <div class="container">
    <div class="profile-user-feed"
      v-if="$store.state.profileFeed.articles !== null && $store.state.profileFeed.articles.length">
      <BFeedItem v-for="article in $store.state.profileFeed.articles" :key="article.createdAt" :article="article"
        @favoriteHandler="favoriteHandler" />
      <paginate :page-count="50" :click-handler="getArticlesFromProfileUserFeed" :prev-text="'&laquo;'"
        :next-text="'&raquo;'" :container-class="'pagination justify-content-center mt-5'" :page-class="'page-item'"
        :page-link-class="'page-link'" :prev-class="'page-item'" :next-class="'page-item'"
        :prev-link-class="'page-link'" :next-link-class="'page-link'">
        >
      </paginate>
    </div>
    <div class="feed-empty text-center"
      v-if="$store.state.profileFeed.articles !== null && $store.state.profileFeed.articles.length === 0 ">
      <div class="fs-4">Пусто...</div>
      <router-link :to="{name: 'editor'}">Создать</router-link>
    </div>
  </div>
</template>

<script>
import BFeedItem from "../feedItem/bFeedItem.vue";
export default {
  components: { BFeedItem },
  methods: {
    getArticlesFromProfileUserFeed(page) {
      this.$store.dispatch("getProfileAuthorFeed", {
        page: page,
        slug: this.$route.params.slug,
      });
    },
    favoriteHandler({ favorited, slug }) {
      favorited
        ? this.$store.dispatch("postProfileUserFavorited", slug)
        : this.$store.dispatch("deleteProfileUserFavorited", slug);
    },
  },
  mounted() {
    this.$store.dispatch("getProfileAuthorFeed", {
      slug: this.$route.params.slug,
      page: 0,
    });
  },
};
</script>

<style lang="scss">

</style>
