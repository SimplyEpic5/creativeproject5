<template>
<div class="content">
  <div class="question" v-for="question in questions" v-bind:key="question._id">
    <router-link class="questionTitle" :to="getLink(question)">
      <h2>{{question.title}}</h2>
      <p class="questionDate">
        <span v-if="question.user.name">Asked by {{question.user.name}}, </span>
        {{formatDate(question.created)}}
      </p>
    </router-link>
  </div>
</div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'QuestionGallery',
  props: {
    questions: Array
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
    getLink(question) {
      return "/question/" + question._id
    }
  }
}
</script>

<style scoped>
.content {
  padding-left: 10px;
  padding-right: 10px;
}

.question {
  margin: auto;
  margin-top: 10px;

  width: 600px;

  background-color: rgb(145, 29, 192, 0.1);

  border-radius: 12px;
  border-color: rgb(145, 29, 192);
  border-style: solid;
  border-width: 2px;
  overflow: hidden;
  overflow: auto;
}

.questionTitle {
  text-decoration: none;
}

.questionTitle h2 {
  padding: 10px;
  padding-left: 15px;
  margin: 0px;
  color: rgb(145, 29, 192, 1);
  font-weight: 600;
  font-size: 30px;
}

.questionTitle p {
  margin: 0px;
  padding-bottom: 10px;
  padding-left: 15px;
  font-size: 15px;
  font-weight: normal;
  color: rgb(145, 29, 192, 0.7);
}

p {
  margin: 0px;
}
</style>
