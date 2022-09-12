<template>
  <div class="validation-errors">
    <ul class="alert alert-danger">
      <li v-for="errorMessage in errorMessages" :key="errorMessage">
        {{ errorMessage }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    validationsError: {
      type: Object,
      require: true,
      default() {
        return {};
      },
    },
  },
  computed: {
    errorMessages() {
      return Object.keys(this.validationsError).map((name) => {
        const message = name + " " + this.validationsError[name].join();
        return message;
      });
    },
  },
};
</script>

<style lang="scss">

</style>
