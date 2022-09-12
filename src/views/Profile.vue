<template>
  <div class="profile">
    <BSpinner v-if="$store.state.auth.isLoading || $store.state.profileFeed.isLoading" />
    <div class="profile__user-info text-center">
      <img :src="profile.image" alt="" class="profile__img" />
      <h2 class="profile__username">
        {{ profile.username }}
      </h2>
      <p class="profile__bio">
        {{ profile.bio }}
      </p>

      <div class="container">
        <div class="text-end">
          <router-link v-if="
            $route.params.slug === $store.state.auth.currentUser.username
          " :to="{ name: 'settings' }" class="profile__link">
            <button class="btn btn-outline-primary">
              Редактировать профиль
            </button>
          </router-link>
          <button v-else class="btn" :class="{
            'btn-outline-primary': !profile.following,
            'btn-outline-secondary': profile.following,
          }" @click="followHandler">
            {{ profile.following ? "unfollow" : "follow" }}
          </button>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="profile__feeds">
        <div class="profile__feeds-header">
          <button class="profile__user-feed-btn" :class="{ 'profile__user-feed-btn-active': isActive }" type="button"
            @click="isActive = !isActive">
            Мои посты
          </button>
          <button class="profile__favorited-feed-btn" :class="{ 'profile__user-feed-btn-active': !isActive }"
            type="button" @click="isActive = !isActive">
            Избранное
          </button>
        </div>
        <BProfileUserFeed v-if="isActive" />
        <BProfileFavoritedFeed v-else />
      </div>
    </div>
  </div>
</template>

<script>
import BProfileUserFeed from "@/components/profileUserFeed/bProfileUserFeed.vue";
import BProfileFavoritedFeed from "@/components/profileFavoritedFeed/bProfileFavoritedFeed.vue";
import { mapGetters } from "vuex";
import BSpinner from "@/components/spinner/bSpinner.vue";
export default {
  components: { BProfileUserFeed, BProfileFavoritedFeed, BSpinner },
  computed: {
    ...mapGetters(["profile"]),
  },
  data() {
    return {
      isActive: true,
    };
  },

  mounted() {
    this.$store.dispatch("getProfile", this.$route.params.slug);
  },
  methods: {
    followHandler() {
      this.profile.following
        ? this.$store.dispatch("unfollow", this.$route.params.slug)
        : this.$store.dispatch("follow", this.$route.params.slug);
    },
  },
};
</script>

<style lang="scss">
.profile {
  margin-top: 75px;
}

.profile__user-info {
  padding-top: 50px;
  padding-bottom: 50px;
  background: #f3f3f3;
}

.profile__img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.profile__bio {
  font-size: 1rem;
  color: #aaa;
}

.profile__feeds-header {
  padding: 30px 0;
}

.profile__user-feed-btn,
.profile__favorited-feed-btn {
  border: none;
  background: none;
  color: #aaa;
  border: none;
  margin-right: 20px;
  padding: 10px 20px;
  border-radius: 5px;
  -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2) inset;
  -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2) inset;
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2) inset;
}

.profile__user-feed-btn-active {
  padding: 10px 20px;
  color: #818a91;
  border-radius: 5px;
  -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
}
</style>
