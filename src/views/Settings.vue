<template>
  <div class="settings">
    <BSpinner v-if="$store.state.auth.isLoading" />
    <div class="container">
      <div class="settings mt-5" v-if="Object.keys(currentUser).length">
        <h1 class="fs-3 text-center">Настройки профиля</h1>

        <div class="col-9 col-md-9 col-lg-9 mx-auto">
          <div class="" v-if="$store.state.auth.isLoading">Loading...</div>
          <form class="mt-5 settigns__form" @submit.prevent="onSubmit">
            <div class="form-group">
              <div class="mt-3">
                <input placeholder="Ссылка на изображение" type="text" class="form-control" id="url-profile-picture"
                  v-model="form.image" />
              </div>
              <div class="mt-3">
                <input placeholder="Имя пользователя" type="text" class="form-control" id="username"
                  v-model="form.username" />
              </div>
              <div class="mt-3">
                <textarea placeholder="О себе" class="form-control" id="bio" rows="3" v-model="form.bio"></textarea>
                <div class="mt-3">
                  <input placeholder="Почта" type="text" class="form-control" id="email" v-model="form.email" />
                </div>
                <div class="mt-3">
                  <input placeholder="Пароль" type="password" class="form-control" id="password"
                    v-model="form.password" />
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-between mt-5">
              <button type="button" @click="logout" class="btn btn-outline-danger px-5">
                Выйти
              </button>
              <button type="submit" class="btn btn-outline-primary px-5">
                Обновить
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BSpinner from "@/components/spinner/bSpinner.vue";
export default {
  data() {
    return {};
  },

  computed: {
    ...mapGetters(["currentUser"]),
    form() {
      if (Object.keys(this.currentUser).length) {
        return {
          image: this.currentUser.image,
          username: this.currentUser.username,
          bio: this.currentUser.bio,
          email: this.currentUser.email,
          password: "",
        };
      }
      return {
        image: "",
        username: "",
        bio: "",
        email: "",
        password: "",
      };
    },
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch("updateSettings", {
          image: this.form.image,
          username: this.form.username,
          bio: this.form.bio,
          email: this.form.email,
          password: this.form.email,
        })
        .then(() => this.$router.push({ name: "main-feed" }));
    },
    logout() {
      this.$store
        .dispatch("logout")
        .then(() => this.$router.push({ name: "login" }));
    },
  },
  components: { BSpinner },
};
</script>

<style lang="scss">
.settings {
  margin-top: 120px;
}

;
</style>
