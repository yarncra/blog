<template>
  <div class="tags-feed" v-if="$store.state.tags.articles.length">
    <BFeedItem v-for="article in $store.state.tags.articles" :article="article" :key="article.createdAt"
      @favoriteHandler="favoriteHandler" />
  </div>
</template>

<script>
import BFeedItem from "@/components/feedItem/bFeedItem.vue";
export default {
  components: { BFeedItem },
  methods: {
    favoriteHandler({ favorited, slug }) {
      favorited
        ? this.$store.dispatch("postTagsFavorited", slug)
        : this.$store.dispatch("deleteTagsFavorited", slug);
    },
  }
};
</script>

<style lang="scss">
.tags-feed {
  width: 100%;
  padding: 0 20px;
}
</style>
