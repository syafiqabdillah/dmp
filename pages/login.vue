<template>
  <div class="login-container">
    <b-card class="card">
      <h5 class="title mb-4">
        <span class="orange">Data Management</span>
        <span class="black">Platform</span>
      </h5>
      <b-form @submit.prevent="login">
        <b-form-group label="Username">
          <b-form-input v-model="form.username"></b-form-input>
        </b-form-group>
        <b-form-group label="Password">
          <b-form-input type="password" v-model="form.password"></b-form-input>
        </b-form-group>
        <b-button @click.prevent="login" block variant="primary"
          >Login</b-button
        >
      </b-form>
    </b-card>
    <Loading :visible="modalLoading.visible" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: null,
        password: null,
      },
      modalLoading: {
        visible: false,
      },
    }
  },
  methods: {
    login() {
      if (this.form.username && this.form.password) {
        this.modalLoading.visible = true;
        this.$axios
          .post(`${process.env.baseAPI}/users/login`, this.form)
          .then((res) => {
            const token = res.data.jwt;
            this.$setCookie("token", token);
            this.$router.push('/');
          })
          .catch((err) => {
            console.log(err)
            alert("Login gagal");
          })
          .finally(() => {
            this.modalLoading.visible = false;
          })
      } else {
        alert('Lengkapi form login')
      }
    },
  },
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #fff;
}
.card {
  width: 400px;
  background: white;
  margin: 0 1em;
}
.title {
  text-align: center;
}
</style>
