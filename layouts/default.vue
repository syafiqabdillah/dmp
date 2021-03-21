<template>
  <div>
    <client-only>
      <Nav v-if="!inLoginPage" />
      <Nuxt />
    </client-only>
  </div>
</template>

<script>
export default {
  mounted() {
    if (!this.inLoginPage) {
      if (!this.$isLoggedIn()) {
        this.$router.push('/login')
      }
    } else {
      if (this.$isLoggedIn()) {
        this.$router.push('/')
      }
    }
  },
  computed: {
    inLoginPage() {
      return this.$route.fullPath == '/login'
    },
  },
}
</script>

<style>
html, body {
  font-family: 'Inter', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

</style>
