<template>
  <div class="login">
    <div class="container">
      <div class="row mt-5 login-form">
        <div class="col-md-6 col-lg-6 col-6 mx-auto">
          <div class="text-center">
            <h1 class="fs-3">Вход</h1>
            <router-link :to="{ name: 'register' }">
              <p class="fs-6">Создать новый аккаунт</p>
            </router-link>
          </div>
          <BValidationErrors :BValidationsError="$store.state.auth.validationsError"
            v-if="$store.state.auth.validationsError" />
          <form @submit.prevent="onSubmit">
            <div class="mb-3 mt-5">
              <input placeholder="Почта" type="email" class="form-control" :class="{
                'is-valid': $v.email.required && $v.email.email,
                'is-invalid': $v.email.$dirty && $v.email.$invalid,
              }" id="email" v-model="email" @blur="$v.email.$touch()"
                @focus="$store.commit('resetValidationsError')" />
              <div v-if="!$v.email.required" id="validationServerUsernameFeedback" class="invalid-feedback">
                Обязательное поле для заполнения
              </div>
              <div v-if="!$v.email.email" id="validationServerUsernameFeedback" class="invalid-feedback">
                Введите корректный email
              </div>
            </div>
            <div class="mb-3">
              <input placeholder="Пароль" type="password" class="form-control" :class="{
                'is-valid':
                  $v.password.required &&
                  $v.password.minLength &&
                  $v.password.maxLength,
                'is-invalid': $v.password.$dirty && $v.password.$invalid,
              }" id="password" v-model="password" @blur="$v.password.$touch()"
                @focus="$store.commit('resetValidationsError')" />
              <div v-if="!$v.password.required" id="validationServerUsernameFeedback" class="invalid-feedback">
                Обязательное поле для заполнения
              </div>
              <div v-if="!$v.password.minLength" id="validationServerUsernameFeedback" class="invalid-feedback">
                Минимальная длина символов 6
              </div>
              <div v-if="!$v.password.maxLength" id="validationServerUsernameFeedback" class="invalid-feedback">
                Максимальная длина символов 20
              </div>
            </div>

            <div class="text-end">
              <button type="submit" class="btn btn-primary" :disabled="$store.state.auth.isSubmitting || isValid">
                Вход
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
import BValidationErrors from "@/components/bValidationErrors/bValidationErrors.vue";

export default {
  data() {
    return { email: "", password: "" };
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(20),
    },
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          this.$router.push({ name: "main-feed" });
        });
    },
  },
  computed: {
    isValid() {
      return this.$v.email.$invalid || this.$v.password.$invalid;
    },
  },
  components: { BValidationErrors },
};
</script>

<style lang="scss">
.login {
  margin: 0 auto;
  margin-top: 150px;
}

.login-form {
  height: 100vh;

}
</style>
