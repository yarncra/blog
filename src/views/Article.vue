<template>
  <div class="article">
    <BSpinner v-if="$store.state.article.isLoading" />

    <div class="article__inner" v-if="Object.keys($store.state.article.article).length">
      <div class="article__header">
        <div class="container">
          <h1 class="article__title">
            {{ $store.state.article.article.title }}
          </h1>
          <div class="article__info-group">
            <img :src="$store.state.article.article.author.image" alt="user-image" class="article__user-image" />
            <div class="article__info">
              <h6 class="article__username">
                {{ $store.state.article.article.author.username }}
              </h6>
              <p class="article__created-at">
                {{ $store.state.article.article.createdAt }}
              </p>
            </div>
            <router-link :to="{
              name: 'article-editor',
              params: { slug: this.$route.params.slug },
            }">
              <button class="btn btn-outline-primary mx-2">Редактировать пост</button>
            </router-link>

            <button class="btn btn-outline-danger" @click="deleteArticle($store.state.article.article.slug)">
              Удалить пост
            </button>
          </div>
          <template v-if="$store.state.article.article.tagList">
            <div class="article-tag__tags-wrapper">
              <div class="article-tag__tags" v-for="tag in $store.state.article.article.tagList" :key="tag">
                <div class="article-tag__tag">
                  {{ tag }}
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div class="container">
        <div class="article__body">{{ $store.state.article.article.body }}</div>

        <div class="row">
          <div class="col-md-9 col-lg-9 col-9 mx-auto">
            <form action="post" @submit.prevent="postComment">
              <div class="mt-5">
                <textarea class="form-control" rows="3" placeholder="Комментарий..." v-model="body"></textarea>
              </div>
              <div class="text-end mt-4">
                <button type="submit" class="btn btn-outline-primary px-5">
                  Отправить
                </button>
              </div>
            </form>
          </div>
        </div>

        <div class="row" v-if="$store.state.article.comments.length">
          <div class="col-md-9 col-lg-9 col-9 mt-3 mx-auto">
            <div class="article-comment" v-for="commentItem in $store.state.article.comments" :key="commentItem.id">
              <p class="article-comment__body">{{ commentItem.body }}</p>
              <div class="article-comment__footer">
                <div class="aticle-comment__info-group">
                  <img :src="commentItem.author.image" alt="" class="article-comment__image" />
                  <p class="article-comment__username">
                    {{ commentItem.author.username }}
                  </p>
                  <p class="article-comment__created-at">
                    {{ commentItem.createdAt }}
                  </p>
                </div>
                <i class="material-icons article-comment__delete" @click="deleteComment(commentItem.id)">delete</i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BSpinner from "@/components/spinner/bSpinner.vue";
export default {
  data() {
    return {
      body: "",
    };
  },
  mounted() {
    this.$store.dispatch("getArticle", this.$route.params.slug);
    this.$store.dispatch("getComments", this.$route.params.slug);
  },
  methods: {
    postComment() {
      this.$store
        .dispatch("postComment", {
          slug: this.$route.params.slug,
          body: this.body,
        })
        .then(() => {
          this.$store.dispatch("getComments", this.$route.params.slug);
        });
      this.body = "";
    },
    deleteComment(id) {
      this.$store.dispatch("deleteComment", {
        slug: this.$route.params.slug,
        id: id,
      });
    },
    deleteArticle(slug) {
      this.$store
        .dispatch("deleteArticle", slug)
        .then(() => this.$router.push({ name: "main-feed" }));
    },
  },
  components: { BSpinner },
};
</script>

<style lang="scss">
.article {
  margin-top: 75px;
}

.article__inner {
  margin-bottom: 20px;
}

.article__header {
  background: #333;
  padding: 50px 0;
}

.article__title {
  color: #fff;
  font-size: 24px;
  font-weight: 600;
}

.article__info-group {
  padding-top: 20px;
  display: flex;
}

.article__user-image {
  margin-right: 10px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.article__info {
  margin-right: 20px;
}

.article__username {
  color: #fff;
  font-size: 1rem;
}

.article__username-green {
  color: #5cb85c;
}

.article__created-at {
  color: #bbb;
  font-size: 0.8rem;
}

.article__body {
  margin-top: 20px;
  padding: 20px;
  min-height: 100px;
  -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
}

.article-comment {
  margin-top: 10px;
}

.article-comment__body {
  width: 100%;
  padding: 20px;
  font-size: 1rem;
  line-height: 1.5;
  -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);

}

.article-comment__footer {
  padding: 0.75rem 1.25rem;
  background-color: #f5f5f5;
  border-top: 1px solid #e5e5e5;
  display: flex;
  justify-content: space-between;
}

.aticle-comment__info-group {
  display: flex;
}

.article-comment__image {
  width: 20px;
  height: 20px;
}

.article-comment__username {
  margin-left: 10px;
  color: #5cb85c;
  font-size: 0.8rem;
}

.article-comment__created-at {
  margin-left: 10px;
  color: rgb(146, 152, 156);
  font-size: 0.8rem;
}

.article-comment__delete {
  width: 11px;
  height: 16px;
  cursor: pointer;
}

.article-tag__tags {
  padding: 5px;
  margin-left: 10px;
  margin-top: 10px;
  border-radius: 5px;
  background: rgb(208, 208, 208);
  display: inline-block;
}

.article-tag__tags-wrapper {
  display: block;
}

.article-tag__tag {
  color: #fff;
}
</style>
