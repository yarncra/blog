<template>
  <div class="global-feed-item">
    <div class="global-feed-item__left-group">
      <div class="global-feed-item__user-info">
        <img :src="article.author.image" alt="" class="global-feed-item__img" />
        <div class="global-feed-item__user">
          <router-link :to="{
            name: 'profile',
            params: { slug: article.author.username },
          }" class="global-feed-item__user-name">
            {{ article.author.username }}
          </router-link>
          <p class="global-feed-item__user-create-at">
            {{ article.createdAt }}
          </p>
        </div>
      </div>
      <div class="global-feed-item__article">
        <router-link :to="{ name: 'article', params: { slug: article.slug } }">
          <h6 class="global-feed-item__article-title">
            {{ article.title }}
          </h6>
          <p class="global-feed-item__article-description">
            {{ article.description }}
          </p>
          <p class="global-feed-item__read-more-link">Далее...</p>
        </router-link>
      </div>
    </div>
    <div class="global-feed-item__right-group">
      <div class="global-feed-item__favorite d-flex justify-content-end">
        <button class="btn btn-secondary btn-sm d-flex align-items-center justify-content-evenly"
          :class="{ 'btn-danger': article.favorited }" @click="
            favoriteHandler({
              favorited: !article.favorited,
              slug: article.slug,
            })
          ">
          <div class="global-feed-item__favorite-ico">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          {{ article.favoritesCount }}
        </button>
      </div>
      <template v-if="article.tagList.length">
        <div class="global-feed-item__tags-wrapper">
          <div class="global-feed-item__tags" v-for="tag in article.tagList" :key="tag">
            <div class="global-feed-item__tag">
              <router-link :to="{ name: 'article', params: { slug: article.slug } }">
                {{ tag }}
              </router-link>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    article: Object,
    defalut() {
      return {};
    },
  },
  methods: {
    favoriteHandler(data) {
      console.log(data);
      this.$emit("favoriteHandler", data);
    },
  },
};
</script>
<style lang="scss">
.global-feed-item {
  width: 100%;
  margin-top: 10px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  border-bottom: 1px solid silver;
  padding-bottom: 20px;
  border-radius: 5px;
  -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  transition: all 0.1s ease-in;
}

.global-feed-item:hover {
  transform: scale(1.05);
}

.global-feed-item__user-info {
  display: flex;
  align-items: center;
}

.global-feed-item__img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.global-feed-item__user {
  margin-left: 10px;
}

.global-feed-item__user-name {
  color: #5cb85c;
}

.global-feed-item__user-create-at {
  color: #bbb;
  font-size: 0.8rem;
}

.global-feed-item__article {
  max-width: 350px;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: start;
}

.global-feed-item__article-title {
  font-size: 1.5rem;
  color: #000;
}

.global-feed-item__article-description {
  color: #bbb;
  font-size: 1rem;
  line-height: 1.3rem;
}

.global-feed-item__read-more-link {
  font-size: 0.8rem;
  color: #bbb;
}

.global-feed-item__right-group {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.global-feed-item__favorite-ico {
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.global-feed-item__favorite-ico svg {
  fill: #fff;
  width: 15px;
  height: 15px;
}

.global-feed-item__tags {
  padding: 5px;
  margin-left: 10px;
  margin-top: 10px;
  border-radius: 5px;
  background: rgb(208, 208, 208);
  display: inline-block;
  cursor: pointer;
}

.global-feed-item__tags:hover {
  background: #818a91;
}

.global-feed-item__tags-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.global-feed-item__tag a {
  color: #fff;
}
</style>
