<template>
<div>
  <div class="DraftQuestion">
    <p v-if="error" class="error">{{error}}</p>
    <form @submit.prevent="upload">
      <input v-model="qDraftText" placeholder="Ask a Question">
      <button type="submit" class="button">Ask</button>
    </form>
  </div>
</div>
</template>

<script>
export default {
  name: 'AskQuestion',
  data() {
    return {
      qDraftText: '',
      error: '',
    }
  },
  methods: {
    async upload() {
      try {
        this.error = await this.$store.dispatch("upload", {
          title: this.qDraftText
        });
        if (!this.error) {
          this.qDraftText = "";
          await this.$store.dispatch("getAllQuestions");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>
.DraftQuestion {
  margin: 25px;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}

form {
  text-align: center;
}

button {
  margin-left: 5px;
}

input {
  width: 70%;
}
</style>
