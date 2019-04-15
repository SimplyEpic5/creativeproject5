<template>
<div class="home">
  <ask-question v-if="user" />
  <h1 class="title">Questions</h1>
  <question-gallery :questions="questions" />
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
    await this.$store.dispatch("getAllQuestions");
  },

}
</script>

<style scoped>
.title {
  color: rgb(145, 29, 192);
  font-weight: 600;
  font-size: 35px;

  margin: auto;
  margin-top: 10px;
  margin-bottom: 20px;
  margin-top: 20px;

  padding-left: 10px;
  padding-right: 10px;

  text-align: center;

  width: 600px;
}
</style>
