<template>
  <div class="main-feed" v-if="$store.state.auth.isLoggedIn">
    <BSpinner v-if="
      $store.state.userFeed.isLoading ||
      $store.state.globalFeed.isLoading ||
      $store.state.tags.isLoading
    " />
    <div class="global-container">
      <div class="main-feed__inner">
        <div class="main-feed__header-inner">
          <div class="main-feed__header">
            <div class="main-feed__header-btn" v-for="button in buttons" :key="button.id">
              <button v-if="button.visible " class="global-feed__btn feed-btn"
                :class="{ 'global-feed__btn-active': button.active }" @click="setActive(button.id)">
                {{ button.name }}
              </button>
            </div>
          </div>
          <template class="global-feed" v-if="$store.state.auth.isLoggedIn">
            <BGlobalFeed v-if="buttonId === 1" />
            <BUserFeed v-if="buttonId === 2" />
            <BTagsFeed v-if="buttonId === 3" />
          </template>
          <template class="global-feed" v-else>
            <BGlobalFeed />
          </template>
        </div>
        <BTags @setTag="setTag" />
      </div>
    </div>
  </div>
</template>

<script>
import BUserFeed from "@/components/userFeed/bUserFeed.vue";
import BGlobalFeed from "@/components/globalFeed/bGlobalFeed.vue";
import BPagination from "@/components/pagination/bPagination.vue";
import BTags from "@/components/tags/bTags.vue";
import BTagsFeed from "@/components/tagsFeed/bTagsFeed.vue";
import BSpinner from "@/components/spinner/bSpinner.vue";
import Login from "./Login.vue";

export default {
  data() {
    return {
      page: 1,
      tag: "",
      buttons: [
        { name: "Все посты", id: 1, active: true, visible: true },
        {
          name: "Интересное",
          id: 2,
          active: false,
          visible: true,
        },
        {
          name: "Тэги",
          id: 3,
          active: false,
          visible: false,
        },
      ],

      buttonId: 1,
    };
  },
  components: {
    BUserFeed,
    BGlobalFeed,
    BPagination,
    BTags,
    BTagsFeed,
    BSpinner,
    Login,
  },
  methods: {
    setTag(tag) {
      this.tag = "#" + tag;
      this.buttonId = 3;
    },
    setActive(id) {
      this.buttonId = id;
      this.buttons.map((el) => {
        if (el.id === id) {
          el.active = true;
        } else {
          el.active = false;
        }
      });
    },
  },
  watch: {
    tag() {
      this.buttons.map((el) => {
        if (el.id === 3) {
          el.active = true;
          el.visible = true;
          el.name = this.tag;
        } else {
          el.active = false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
.main-feed {
  margin-top: 120px;

}

.main-feed__inner {
  position: relative;
  display: flex;
  justify-content: space-evenly;
}

@media screen and (max-width: 1199px) {}

@media screen and (max-width: 991px) {
  .global-feed-item {
    width: 100%;
    margin-top: 10px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
  }
}

@media screen and (max-width: 767px) {
  .global-feed-item {
    justify-content: flex-end;
    flex-wrap: wrap;

  }
}

@media screen and (max-width: 575px) {
  .global-feed-item__right-group {
    width: 100%;
  }

  .global-feed-item__tags-wrapper {
    flex-wrap: wrap;
  }


  .header__nav-item,
  .header__nav-item-login,
  .header__nav-item-register {
    margin-left: 0;
  }

  .tags {
    min-width: 100%;
  }

  .header__nav-items {
    display: none;
  }

  .header__nav-items-burger {
    display: block;
  }

  .main-feed__inner {
    flex-wrap: wrap-reverse;
  }

  .global-feed-item {
    text-align: center;
    justify-content: center;
  }

  .profile__link .btn {
    margin-top: 20px;
  }

  .main-feed__header-inner {
    text-align: center;
  }

}

.main-feed__header-inner {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.main-feed__header {
  padding-bottom: 20px;
  width: calc(100% - 20px);
}

.feed-btn {
  border: none;
  background: none;
  color: #aaa;
}

.main-feed__header-btn {
  display: inline-block;
}

.global-feed__btn {
  margin-bottom: 20px;
  margin-right: 20px;
  padding: 10px 20px;
  color: #818a91;
  border-radius: 5px;
  -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2) inset;
  -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2) inset;
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2) inset;
}

.global-feed__btn-active {
  padding: 10px 20px;
  color: #818a91;
  border-radius: 5px;
  -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);

}
</style>
  