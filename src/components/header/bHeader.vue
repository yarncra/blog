<template>
  <header class="header">
    <div class="global-container">
      <div class="header__inner">
        <router-link :to="{ name: $store.state.auth.isLoggedIn ? 'main-feed' : 'login' }" class="header__logo-link">
          conduit</router-link>

        <template v-if="$store.state.auth.isLoggedIn === false">
          <div class="header__nav-items-burger" :class="{'header__nav-items-burger-toggle': isActive}"
            @click="isActive = !isActive">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="header__nav-items-mobile" :class="{'header__nav-items-mobile-active': isActive}">
            <div class="header__nav-item-wrapper" @click="isActive=!isActive">
              <router-link class="header__nav-item-login" active-class="active" :to="{ name: 'login' }">Войти
              </router-link>
            </div>
            <div class="header__nav-item-wrapper" @click="isActive=!isActive">
              <router-link class="header__nav-item-register" active-class="active" :to="{ name: 'register' }">
                Зарегистрироваться
              </router-link>
            </div>
          </div>
          <div class="header__nav-items">
            <router-link class="header__nav-item-login" active-class="active" :to="{ name: 'login' }">Войти
            </router-link>
            <router-link class="header__nav-item-register" active-class="active" :to="{ name: 'register' }">
              Зарегистрироваться
            </router-link>
          </div>
        </template>

        <template v-if="$store.state.auth.isLoggedIn">
          <div class="header__nav-items-burger" :class="{'header__nav-items-burger-toggle': isActive}"
            @click="isActive = !isActive">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="header__nav-items-mobile" :class="{'header__nav-items-mobile-active': isActive}">
            <div class="header__nav-item-wrapper" @click="isActive=!isActive">
              <router-link class="header__nav-item" active-class="active" :to="{ name: 'editor' }">
                Создать пост
              </router-link>
            </div>
            <div class="header__nav-item-wrapper" @click="isActive=!isActive">
              <router-link class="header__nav-item" active-class="active" :to="{ name: 'settings' }">
                Настройки
              </router-link>
            </div>
            <div class="header__nav-item-wrapper" @click="isActive=!isActive">
              <router-link class="header__nav-item" :to="{
                name: 'profile',
                params: {
                  slug: $store.state.auth.currentUser.username,
                },
              }">
                <img class="header__nav-item-img"
                  :src="$store.state.auth.currentUser.image ? $store.state.auth.currentUser.image: 'https://api.realworld.io/images/smiley-cyrus.jpeg'"
                  alt="">&nbsp;{{
                  $store.state.auth.currentUser.username }}
              </router-link>
            </div>
          </div>
          <div class="header__nav-items">
            <div class="header__nav-item-wrapper">
              <router-link class="header__nav-item" active-class="active" :to="{ name: 'editor' }">
                Создать пост
              </router-link>
            </div>
            <div class="header__nav-item-wrapper">
              <router-link class="header__nav-item" active-class="active" :to="{ name: 'settings' }">Настройки
              </router-link>
            </div>
            <div class="header__nav-item-wrapper">

              <router-link class="header__nav-item" :to="{
                name: 'profile',
                params: {
                  slug: $store.state.auth.currentUser.username,
                },
              }">
                <img class="header__nav-item-img"
                  :src="$store.state.auth.currentUser.image ? $store.state.auth.currentUser.image: 'https://api.realworld.io/images/smiley-cyrus.jpeg'"
                  alt="">&nbsp;{{
                  $store.state.auth.currentUser.username }}
              </router-link>
            </div>
          </div>
        </template>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
    };
  },
};
</script>

<style lang="scss">
.header {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  background: #fff;
  -webkit-box-shadow: 0px 5px 5px -5px rgba(34, 60, 80, 0.6);
  -moz-box-shadow: 0px 5px 5px -5px rgba(34, 60, 80, 0.6);
  box-shadow: 0px 5px 5px -5px rgba(34, 60, 80, 0.6);
}

.header__inner {
  position: relative;
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header__logo-link {
  font-family: titillium web, sans-serif;
  font-size: 1.5rem;
  padding-top: 0;
  margin-right: 2rem;
  color: #5cb85c;
}

.header__nav-items {
  display: flex;
}

.header__nav-item,
.header__nav-item-login,
.header__nav-item-register {
  position: relative;
  margin-left: 30px;
  color: rgba(0, 0, 0, 0.3);
}

.header__nav-item-login:before {
  font-family: "Material Icons";
  content: '\ea77';
  position: absolute;
  top: 0;
  left: -20px;
  font-style: 16px;
}

.header__nav-item-register:before {
  font-family: "Material Icons";
  content: '\e8a6';
  position: absolute;
  top: 0;
  left: -20px;
  font-style: 16px;
}

.header__nav-item-wrapper:nth-child(1) .header__nav-item:before {
  font-family: "Material Icons";
  content: '\e148';
  position: absolute;
  top: 0;
  left: -20px;
  font-style: 16px;
}

.header__nav-item-wrapper:nth-child(2) .header__nav-item:before {
  font-family: "Material Icons";
  content: '\e8b8';
  position: absolute;
  top: 0;
  left: -20px;
  font-style: 16px;
}

.header__nav-item-img {
  width: 16px;
  border-radius: 50%;
}

.active {
  color: rgba(0, 0, 0, 0.8);
}

.header__nav-items-burger {
  display: none;
  width: 50px;
  height: 30px;
  position: relative;
}

.header__nav-items-burger span {
  position: absolute;
  background-color: #818a91;
  width: 100%;
  height: 2px;
  transition: all .1s ease-in
}

.header__nav-items-mobile {
  display: none;

}

.header__nav-items-mobile-active {
  position: absolute;
  top: 80px;
  left: 0;
  width: 100%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: #fff;
  -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
}

.header__nav-items-mobile-active .header__nav-item:nth-child(3) {
  margin-left: 0;
  font-size: 32px;

}

.header__nav-items-mobile-active .header__nav-item:nth-child(1) {
  font-size: 32px;
}

.header__nav-items-mobile-active .header__nav-item:nth-child(2) {
  font-size: 32px;
}

.header__nav-items-mobile-active .header__nav-item-img {
  width: 32px;
}

.header__nav-items-mobile-active .header__nav-item:nth-child(1):before,
.header__nav-items-mobile-active .header__nav-item:nth-child(2):before {
  left: -40px;
}

.header__nav-items-burger span:nth-child(1) {
  top: 0;
}

.header__nav-items-burger span:nth-child(2) {
  top: 50%;
}

.header__nav-items-burger span:nth-child(1) {
  top: 100%;
}

.header__nav-items-burger-toggle span:nth-child(1) {
  top: 50%;
  transform: rotate(45deg);
}

.header__nav-items-burger-toggle span:nth-child(2) {
  display: none;
}

.header__nav-items-burger-toggle span:nth-child(3) {
  top: 50%;
  transform: rotate(-45deg);
}
</style>
