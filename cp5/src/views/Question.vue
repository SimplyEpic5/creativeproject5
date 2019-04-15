<template>
<div class="QuestionPage">
  <div class="content">
    <h1 class="questionTitle">{{question.title}}</h1>
    <p class="questionDate">
      <span v-if="question.user.name">Asked by {{question.user.name}}, </span>
      {{formatDate(question.created)}}
    </p>
  </div>

  <div class="writeAnswerSection">
    <div class="content">
      <div v-if="user && !thisUser" class="form">
        <div class="askAnswer" v-if="!writeBool">
          <h2 class="center">Can You Answer This Question?</h2>
          <p class="center"><button @click="toggleWriteAnswer">Answer</button>
          </p>
        </div>
        <div class="writeAnswer" v-if="writeBool">
          <h2>Write your Answer</h2>
          <textarea v-model="draftComment" placeholder="Write Your Answer" rows="8" cols="80"></textarea>
          <p></p>
          <button @click="comment">Submit</button>
        </div>
      </div>
    </div>
    <div class="owner" v-if="thisUser">
      <button @click="deleteQuestion">Delete Question</button>
    </div>
  </div>


  <div class="content">
    <h2 class="answersHeader">Answers</h2>
    <div class="comment" v-for="comment in comments" v-bind:key="comment._id">
      <p class="userTitle">
        Answered by {{comment.user.name}}
        <span class="commentDate">{{formatDate(comment.created)}}</span>
      </p>

      <p class="commentText" v-if="!editing(comment._id)">{{comment.text}}</p>
      <textarea class="editTextBox" v-model="comment.text" placeholder="Write Your Answer" rows="8" cols="80" v-if="editing(comment._id)"></textarea>

      <div class="commentOwner" v-if="ownComment(comment)">
        <button class="editButton" @click="editAnswer(comment)" v-if="!editing(comment._id)">Edit</button>
        <button class="editButton" @click="deleteAnswer(comment)" v-if="editing(comment._id)">Delete</button>
        <button class="editButton" @click="saveAnswer(comment)" v-if="editing(comment._id)">Save</button>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'question',
  computed: {
    user() {
      return this.$store.state.user;
    },
    thisUser() {
      if (this.user == null || this.user == "") {
        return false;
      }
      return this.user._id == this.question.user._id;
    },
  },
  data() {
    return {
      question: {},
      draftComment: "",
      comments: [],
      writeBool: false,
      editingID: ""
    }
  },
  async created() {
    await this.$store.dispatch("getUser");
    this.getQuestion()
    this.getComments()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    async getQuestion() {
      await this.$store.dispatch("getQuestion", this.$route.params.id)
      this.question = this.$store.state.currentQuestion;
    },
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
    async comment() {
      try {
        this.error = await this.$store.dispatch("postComment", {
          questionID: this.question._id,
          text: this.draftComment
        });
        if (!this.error) {
          this.draftComment = "";
          this.writeBool = false;
          this.getComments();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getComments() {
      await this.$store.dispatch("getComments", this.$route.params.id)
      this.comments = this.$store.state.currentComments;
    },
    toggleWriteAnswer() {
      this.writeBool = true;
    },
    async deleteQuestion() {
      try {
        this.error = await this.$store.dispatch("deleteQuestion", this.question._id);
        if (!this.error) {
          this.$router.push('/');
        }
      } catch (error) {
        console.log(error);
      }
    },
    editAnswer(comment) {
      this.editingID = comment._id
    },
    editing(id) {
      if (this.editingID == id) return true;
      return false;
    },
    ownComment(comment) {
      if (this.user == null) return false;
      return (this.user._id == comment.user._id)
    },
    async deleteAnswer(comment) {
      try {
        this.error = await this.$store.dispatch("deleteComment", comment._id);
        if (!this.error) {
          this.getComments()
        }
      } catch (error) {
        console.log(error);
      }
    },
    async saveAnswer(comment) {
      try {
        this.error = await this.$store.dispatch("editComment", {
          commentID: comment._id,
          text: comment.text
        });
        if (!this.error) {
          this.editingID = ""
          this.getComments();
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>
.content {
  margin: auto;
  margin-top: 10px;

  padding-left: 10px;
  padding-right: 10px;

  width: 600px;
}

.questionTitle {
  color: rgb(145, 29, 192);
  font-weight: 600;
  font-size: 35px;
  margin-bottom: 5px;
}

.questionDate {
  margin-top: 5px;
  margin-bottom: 20px;
  font-size: 13px;
  font-weight: normal;
  color: rgba(0, 0, 0, 0.5);
}

.writeAnswer {
  overflow: hidden;
  overflow: auto;
}

h2 {
  margin: 0px;
  margin-bottom: 10px;
  color: rgb(145, 29, 192);
  font-weight: 600;
  font-size: 22px;
}

textarea {
  margin: 0px;
  padding: 5px;
  border-radius: 6px;
  border-style: solid;
  border-width: 2px;
  border-color: rgb(145, 29, 192);
  background-color: rgb(255, 255, 255);

  display: block;
  width: calc(100% - 14px);
  outline: none;
  resize: none;
  height: 150px;
  font-size: 15px;
  color: black;
  margin: 0px;
}

.form {
  margin-bottom: 20px;
}

.writeAnswerSection {
  margin: 0px;
  padding: 0px;
  background-color: rgba(145, 29, 192, 0.1);

  border-bottom-style: solid;
  border-bottom-color: rgba(15, 3, 19, 0.2);
  border-bottom-width: 1px;

  border-top-style: solid;
  border-top-color: rgba(15, 3, 19, 0.2);
  border-top-width: 1px;
}

.comment {
  border-radius: 12px;
  border-style: solid;
  border-width: 2px;
  border-color: rgb(145, 29, 192);

  margin-top: 10px;

  background-color: rgba(145, 29, 192, 0.1);

  overflow: auto;
}

.userTitle {
  margin: 0px;
  padding: 10px;

  font-size: 18px;
  font-weight: normal;
  color: rgba(255, 255, 255, 1);

  background-color: rgba(145, 29, 192, 0.5);

  border-bottom-style: solid;
  border-bottom-color: rgb(145, 29, 192);
  border-bottom-width: 2px;
}

.commentDate {
  font-size: 13px;
  font-weight: lighter;
  color: rgba(255, 255, 255, 0.7);
}

.commentText {
  margin: 0px;
  padding: 10px;
  white-space: pre-line;
}

.center {
  text-align: center;
}

.owner {
  text-align: center;
  margin: 0px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  margin-bottom: 10px;
}

.commentOwner {
  margin: 0px;
  padding: 5px;

  background-color: rgba(145, 29, 192, 0.5);

  border-top-style: solid;
  border-top-color: rgb(145, 29, 192);
  border-top-width: 2px;
}

.editButton {
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 12px;
  margin-right: 5px;
}

.editTextBox {
  border: none;
  margin: none;
  padding: 10px;
  width: calc(100% - 20px);
}












.comment {}
</style>
