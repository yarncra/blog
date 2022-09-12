<template>
  <section class="editor" v-if="Object.keys(this.$store.state.article.article).length">
    <div class="container">
      <div class="col-9 col-md-9 col-lg-9 mx-auto">
        <form class="mt-5" @submit.prevent="onSubmit" @keypress.enter.prevent="addTag">
          <div class="form-group">
            <div class="mt-3">
              <input placeholder="Заголовок" type="text" class="form-control" id="article-title" v-model="form.title" />
            </div>
            <div class="mt-3">
              <input placeholder="Описание" type="text" class="form-control" id="article-description"
                v-model="form.description" />
            </div>
            <div class="mt-3">
              <textarea placeholder="Текст" class="form-control" id="article-body" rows="3"
                v-model="form.body"></textarea>
            </div>
          </div>
          <div class="mt-3">
            <input placeholder="Введите название тэга и нажмите клавишу enter" type="text" class="form-control"
              id="article-title" v-model="tag" />
          </div>
          <template v-if="this.tags.length">
            <div class="article__tags" v-for="tag in this.tags" :key="tag">
              <div class="article__tags-wrapper">
                <div class="article__tag">{{ tag }}</div>
                <div class="material-icons article__tag-close-ico" @click="removeTag(tag)">
                  close
                </div>
              </div>
            </div>
          </template>
          <div class="text-end mt-3">
            <button type="submit" class="btn btn-primary px-5">Опубликовать</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      description: "",
      body: "",
      tag: "",
      tags: [],
    };
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch("putArticle", {
          slug: this.$route.params.slug,
          article: {
            title: this.form.title,
            description: this.form.description,
            body: this.form.body,
            tagList: this.tags,
          }
        })
        .then(() => {
          this.$router.push({
            name: "main-feed"
          });
        });
    },
    addTag() {
      if (!this.tags.includes(this.tag) && this.tag.trim() !== "")
        this.tags.push(this.tag.trim());
      this.tag = "";
    },
    removeTag(tag) {
      this.tags = this.tags.filter((el) => el !== tag);
    },
  },

  watch: {
    ['form.tags']() {
      this.tags = this.form.tags;
    }
  },

  mounted() {
    this.$store.dispatch("getArticle", this.$route.params.slug);
  },
  computed: {
    form() {
      if (Object.keys(this.$store.state.article.article).length) {
        return {
          title: this.$store.state.article.article.title,
          description: this.$store.state.article.article.description,
          body: this.$store.state.article.article.body,
          tags: this.$store.state.article.article.tagList ? this.$store.state.article.article.tagList : [],
        };
      }
      return {
        title: "",
        description: "",
        body: "",
        tag: "",
        tagList: [],
      };
    },
  }
};
</script>

<style lang="scss">

</style>
