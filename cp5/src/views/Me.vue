<template>
<div class="home">
  <div class="loggedIn" v-if="user">
    <h1 class="title">My Questions</h1>
    <question-gallery :questions="questions" />
  </div>
  <div class="loggedOut" v-if="!user">
    <div class="buttonsContainer">
      <router-link to="/register" class="regButton"><button type="submit" class="button">Register</button></router-link> or
      <router-link to="/login" class="logButton"><button type="submit" class="button">Login</button></router-link>
    </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import QuestionGallery from '@/components/QuestionGallery.vue'
import AskQuestion from '@/components/AskQuestion.vue'

export default {
  name: 'home',
  components: {
    QuestionGallery,
    AskQuestion
  },
  computed: {
    questions() {
      return this.$store.state.questions;
    },
    user() {
      return this.$store.state.user;
    }
  },
  async created() {
    await this.$store.dispatch("getUser");
    await this.$store.dispatch("getMyQuestions");
  },

}
</script>

<style scoped>
.title {
  color: rgb(145, 29, 192);
  font-weight: 600;
  font-size: 35px;

  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;

  padding-left: 10px;
  padding-right: 10px;

  text-align: center;

  width: 600px;
}

.home {
  width: 100%;
}

button {
  margin-left: 5px;
  margin-right: 5px;
}

.loggedOut {
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
}

.buttonsContainer {
  margin: auto;
  text-align: center;
}
</style>
