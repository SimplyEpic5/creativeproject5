<template>
<div>
  <h1>Register for an account</h1>
  <p class="noAccount">Have an account already? <router-link to="/login" class="link">Login</router-link>
  </p>
  <form @submit.prevent="register" class="registerForm">
    <fieldset>
      <p class="message">All fields are required.</p>

      <div class="field">
        <label for="name">Real Name</label>
        <p></p>
        <input v-model="name" type="text" placeholder="Real Name">
      </div>

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
        <button type="submit" class="">Register</button>
      </div>

      <p v-if="error" class="error">{{error}}</p>
    </fieldset>
  </form>
</div>
</template>


<script>
export default {
  name: 'register',
  data() {
    return {
      name: '',
      username: '',
      password: '',
      error: '',
    }
  },
  methods: {
    async register() {
      try {
        this.error = await this.$store.dispatch("register", {
          name: this.name,
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

.registerForm {
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
}

.submitButton {
  margin: 10px;
}

.error {
  color: red;
}
</style>
