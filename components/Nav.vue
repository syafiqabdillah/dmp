<template>
  <div>
    <nav id="full">
      <!-- Brand -->
      <div class="brand" @click="closeMenu">
        <NuxtLink to="/">
          <span class="orange"> Dataset Management </span>
          <span class="black"> Platform </span>
        </NuxtLink>
      </div>
      <!-- Menu -->
      <div class="menu">
        <NuxtLink to="/tasks">Tasks</NuxtLink>
        <NuxtLink to="/bookings">My Bookings</NuxtLink>
        <a href="#" class="grey" @click="logout()">Logout</a>
      </div>
    </nav>
    <nav id="mobile">
      <div class="brand" @click="closeMenu">
        <NuxtLink to="/"> <span class="orange">DM</span>P </NuxtLink>
      </div>
      <!-- Toggle -->
      <div class="toggle" @click="toggleMenuOpen">
        <i v-if="!menuOpenned" class="icofont-caret-down"></i>
        <i v-if="menuOpenned" class="icofont-caret-up"></i>
      </div>
      <!-- Menu -->
      <div class="menu" v-if="menuOpenned" @click="closeMenu">
        <NuxtLink to="/tasks">Tasks</NuxtLink>
        <NuxtLink to="/bookings">My Bookings</NuxtLink>
        <a href="#" class="grey" @click="logout()">Logout</a>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuOpenned: false,
    }
  },
  methods: {
    logout() {
      this.$setCookie('token', '')
      location.href = '/login'
    },
    toggleMenuOpen() {
      this.menuOpenned = !this.menuOpenned
    },
    closeMenu() {
      this.menuOpenned = false
    },
  },
}
</script>

<style scoped>
nav {
  padding: 1em;
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
}
@media (max-width: 480px) {
  nav#full {
    display: none;
  }
}
@media (min-width: 480px) {
  nav#mobile {
    display: none;
  }
  nav {
    padding: 1em 3em;
  }
}
.brand {
  font-weight: 700;
  font-size: 1.2rem;
  height: 100%;
  display: flex;
  align-items: center;
}
.orange {
  color: #ef7539;
}
nav .menu {
  font-weight: 600;
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
a {
  text-decoration: none;
  color: black;
}
.menu a:focus,
.menu a:hover {
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-decoration-color: #ef7539;
}
.menu a {
  margin-left: 1.25em;
}
a.grey {
  color: grey;
}
.toggle i {
  font-size: 2.5em;
}
#mobile {
  position: relative;
}
#mobile .menu {
  padding-top: 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 90px;
  right: 0;
  width: 100%;
  height: initial;
  z-index: 1;
  background: #ef7539;
}
#mobile .menu a {
  margin-bottom: 1em;
  color: white;
  letter-spacing: 1px;
}
</style>
