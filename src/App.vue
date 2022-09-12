<template>
  <div id="app">
    <BHeader />
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
import BHeader from "@/components/header/bHeader.vue";

export default {
  components: { BHeader },
  mounted() {
    this.$store.dispatch("getCurrentUser")
      .catch(() => {
        if (!this.$store.state.auth.isLoggedIn) this.$router.push({ name: 'login' });
      });
  },
};
</script>

<style lang="scss">

</style>
