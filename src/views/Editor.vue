<template>
  <section class="editor" v-if="$store.state.auth.isLoggedIn">
    <div class="container">
      <h1 class="fs-3 text-center">Новый пост</h1>
      <div class="col-9 col-md-9 col-lg-9 mx-auto">
        <form class="mt-5" @submit.prevent="onSubmit" @keypress.enter.prevent="addTag">
          <div class="form-group">
            <div class="mt-3">
              <input placeholder="Заголовок" type="text" class="form-control" id="article-title" v-model="title" />
            </div>
            <div class="mt-3">
              <input placeholder="Описание" type="text" class="form-control" id="article-description"
                v-model="description" />
            </div>
            <div class="mt-3">
              <textarea placeholder="Текст" class="form-control" id="article-body" rows="3" v-model="body"></textarea>
            </div>
            <div class="mt-3">
              <input placeholder="Введите название тэга и нажмите клавишу enter" type="text" class="form-control"
                id="article-title" v-model="tag" />
            </div>
            <template v-if="tags.length">
              <div class="article__tags" v-for="tag in tags" :key="tag">
                <div class="article__tags-wrapper">
                  <div class="article__tag">{{ tag }}</div>
                  <div class="material-icons article__tag-close-ico" @click="removeTag(tag)">
                    close
                  </div>
                </div>
              </div>
            </template>
          </div>
          <div class="text-end mt-3">
            <button type="submit" class="btn btn-outline-primary px-5">
              Опубликовать
            </button>
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
        .dispatch("postArticle", {
          article: {
            title: this.title,
            description: this.description,
            body: this.body,
            tagList: this.tags,
          }
        })
        .then(() => {
          this.$router.push({ name: "main-feed" });
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
};
</script>
<style lang="scss">
.editor {
  margin-top: 120px;
}

.article__tags {
  padding: 10px;
  margin-right: 10px;
  margin-top: 10px;
  border-radius: 5px;
  background: rgb(208, 208, 208);
  display: inline-block;
}

.article__tags-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.article__tag {
  margin-right: 10px;
}

.article__tag-close-ico {
  cursor: pointer;
}
</style>
