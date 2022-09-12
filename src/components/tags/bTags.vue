<template>
  <div class="tags" v-if="$store.state.tags.tags.length">
    <h6 class="tags__title">Тэги</h6>
    <template>
      <div class="tags__item" v-for="tag in $store.state.tags.tags" :key="tag">
        <div @click="getTagsFeed(tag)">{{ tag }}</div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("getTags");
  },
  methods: {
    getTagsFeed(tag) {
      this.$store.dispatch("getTagsFeed", { page: 0, tag: tag });
      this.$emit("setTag", tag);
    },
  },
};
</script>

<style lang="scss">
.tags {
  max-width: 250px;
  height: 100%;
  padding: 10px;
  margin-bottom: 30px;
  background: #f3f3f3;
  border-radius: 5px;
  -webkit-box-shadow: 5px 5px 5px -5px rgba(34, 60, 80, 0.6);
  -moz-box-shadow: 5px 5px 5px -5px rgba(34, 60, 80, 0.6);
  box-shadow: 5px 5px 5px -5px rgba(34, 60, 80, 0.6);
}

.tags__title {
  font-size: 1rem;
  padding-bottom: 10px;
  color: #373a3c;
}

.tags__item {
  display: inline-block;
  background-color: #818a91;
  border-radius: 10px;
  font-size: 0.8rem;
  padding: 5px 10px;
  margin-top: 5px;
  margin-right: 5px;
  color: #fff;
  cursor: pointer;
  transition: all 0.1s ease-in;
}

.tags__item:hover {
  transform: scale(1.05);
}
</style>
