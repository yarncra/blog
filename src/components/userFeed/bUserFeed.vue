<template>
  <div class="container">
    <div class="user-feed" v-if="$store.state.userFeed.articles !== null && $store.state.userFeed.articles.length">
      <BFeedItem v-for="article in $store.state.userFeed.articles" :key="article.createdAt" :article="article"
        @favoriteHandler="favoriteHandler" />
      <paginate :page-count="50" :click-handler="getArticlesFromUserFeed" :prev-text="'&laquo;'" :next-text="'&raquo;'"
        :container-class="'pagination justify-content-center mt-5'" :page-class="'page-item'"
        :page-link-class="'page-link'" :prev-class="'page-item'" :next-class="'page-item'"
        :prev-link-class="'page-link'" :next-link-class="'page-link'">
        >
      </paginate>
    </div>

    <div class="feed-empty text-center"
      v-if="$store.state.userFeed.articles !== null && $store.state.userFeed.articles.length === 0 ">
      <div class="fs-4">Пусто...</div>
      <router-link :to="{name: 'editor'}">Создать</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BFeedItem from "@/components/feedItem/bFeedItem.vue";
export default {
  methods: {
    getArticlesFromUserFeed(page) {
      this.$store.dispatch("getUserFeed", page);
    },
    favoriteHandler({ favorited, slug }) {
      favorited
        ? this.$store.dispatch("postUserFeedFavorited", slug)
        : this.$store.dispatch("deleteUserFeedFavorited", slug);
    },
  },
  mounted() {
    this.$store.dispatch("getUserFeed");
  },
  components: { BFeedItem },
  computed: {
    ...mapGetters(["articles, isLoading"]),
  },
};
</script>

<style lang="scss">
.user-feed {
  padding: 0 20px;
}

.pagination {
  user-select: none;
}
</style>
