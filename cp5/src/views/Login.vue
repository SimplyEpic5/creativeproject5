<template>
<div>
  <h1>Login to your account</h1>
  <p class="noAccount">Don't have an account? <router-link to="/register" class="link">Register</router-link>
  </p>
  <form @submit.prevent="login" class="loginForm">
    <fieldset>
      <p class="message">All fields are required.</p>

      <div class="field">
        <label for="username">Username</label>
        <p></p>
        <input v-model="username" type="text" placeholder="Username">
      </div>

      <div class="field">
        <label for="password">Password</label>
        <p></p>
        <input v-model="password" type="password" placeholder="Password">
      </div>

      <div class="button submitButton">
        <button type="submit" class="">Login</button>
      </div>

      <p v-if="error" class="error">{{error}}</p>
    </fieldset>
  </form>
</div>
</template>


<script>
export default {
  name: 'login',
  data() {
    return {
      username: '',
      password: '',
      error: '',
    }
  },
  methods: {
    async login() {
      try {
        this.error = await this.$store.dispatch("login", {
          username: this.username,
          password: this.password
        });
        if (this.error === "")
          this.$router.push('/');
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>
<style scoped>
fieldset {
  background-color: none;
  border: none;
  padding: none;
  margin: none;
}

.loginForm {
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  background-color: #eee;
  padding: 10px;
}

h1 {
  padding: 5px;
  margin-left: 20px;
  color: rgb(145, 29, 192);
}

p {
  margin: 10px;
  margin-left: 10px;
  color: rgba(0, 0, 0, 0.3);
  font-weight: lighter;
  font-size: 14px;
}

.noAccount {
  margin-left: 25px;
  color: rgba(0, 0, 0, 0.7);

  router-link {
    color: rgb(145, 29, 192);
  }
}

.submitButton {
  margin: 10px;
}

.error {
  color: red;
}
</style>
