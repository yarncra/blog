<template>
  <div class="container">
    <div class="global-feed"
      v-if="$store.state.globalFeed.articles !== null && $store.state.globalFeed.articles.length">
      <BFeedItem v-for="article in $store.state.globalFeed.articles" :key="article.createdAt" :article="article"
        @favoriteHandler="favoriteHandler" />
      <paginate :page-count="50" :click-handler="getArticlesFromGlobalFeed" :prev-text="'&laquo;'"
        :next-text="'&raquo;'" :container-class="'pagination justify-content-center mt-5'" :page-class="'page-item'"
        :page-link-class="'page-link'" :prev-class="'page-item'" :next-class="'page-item'"
        :prev-link-class="'page-link'" :next-link-class="'page-link'">
        >
      </paginate>
    </div>
    <div class="feed-empty text-center"
      v-if="$store.state.globalFeed.articles !== null && $store.state.globalFeed.articles.length === 0">
      <div class="fs-4">Пусто...</div>
      <router-link :to="{name: 'editor'}">Создать</router-link>
    </div>
  </div>
</template>

<script>
import BFeedItem from "../feedItem/bFeedItem.vue";
export default {
  components: { BFeedItem },
  mounted() {
    this.$store.dispatch("getGlobalFeed");
  },
  methods: {
    getArticlesFromGlobalFeed(page) {
      this.$store.dispatch("getGlobalFeed", page);
    },
    favoriteHandler({ favorited, slug }) {
      favorited
        ? this.$store.dispatch("postGlobalFavorited", slug)
        : this.$store.dispatch("deleteGlobalFavorited", slug);
    },
  },
};
</script>
<style lang="scss">
.global-feed {
  padding: 0 20px;
}

.pagination {
  user-select: none;
}
</style>
