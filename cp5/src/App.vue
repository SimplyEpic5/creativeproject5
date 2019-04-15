<template>
<div id="app">
  <div id="nav" class="menu">
    <div class="pure-menu pure-menu-horizontal pure-menu-scrollable">

      <router-link to="/" class="link"><a href="/" class="pure-menu-link pure-menu-heading siteName">Question Quorner</a></router-link>
      <ul class="pure-menu-list">
        <li class="pure-menu-item menuItem">
          <router-link to="/" class="link">Home</router-link>
        </li>
        <li class="pure-menu-item menuItem">
          <router-link to="/me" class="link">Me</router-link>
        </li>
        <li class="pure-menu-item menuItem">
          <router-link v-if="!user" to="/login" class="link">Login</router-link>
          <div class="UserMenuItem" v-if="user">
            <p>{{user.name}}</p>
            <a href="#" @click="logout" class="logoutLink">Logout</a>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div class="content">
    <router-view />
  </div>
  <div class="footer">
    <p><a href="https://github.com/SimplyEpic5/creativeproject5.git">Github Repository</a></p>
  </div>
</div>
</template>

<script>
export default {
  name: 'mypage',
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  data() {
    return {
      showUser: false,
    }
  },
  async created() {
    await this.$store.dispatch("getUser");
  },
  methods: {
    async logout() {
      try {
        this.error = await this.$store.dispatch("logout");
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style>
#app {
  margin: 0px;
  padding: 0px;
  font-family: Helvetica;
}

#nav {
  padding: 5px;
  background-color: rgb(145, 29, 192);
  width: calc(100% - 10px);
  border-bottom-style: solid;
  border-bottom-color: rgba(15, 3, 19, 0.2);
  border-bottom-width: 1px;
}

#nav a {
  font-weight: bold;
  color: rgb(255, 240, 250);
}

#nav a.router-link-exact-active {
  color: rgba(255, 255, 255, 0.5);
}

.siteName {
  font-family: Times;
  font-size: 20px;
  color: rgb(255, 220, 240);
}

.menuItem {
  padding: 0px;
  border-radius: 0px;
}

.menuItem a {
  padding: 10px;
  margin: 5px;
  border-radius: 6px;
  text-decoration: none;
}

.menuItem a:hover {
  background-color: rgba(0, 0, 0, 0.2);
}

.pure-menu-link {
  color: #fff;
  padding: 10px 20px;
  font-weight: 800;
}

.pure-menu-link:hover {
  background: rgba(0, 0, 0, 0);
}

.pure-menu-link.router-link-exact-active {
  background: #fff;
  color: #F2385A;
}

button {
  border-radius: 6px;
  border-style: none;
  background-color: rgb(145, 29, 192);
  color: white;
  font-size: 17px;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
}

.field {
  padding: 10px;
}

.field label {
  font-weight: bold;
  font-size: 15px;
  margin: 0px;
  padding: 0px;
}

.field p {
  margin: 3px;
}

input {
  margin: 0px;
  padding: 5px;
  border-radius: 6px;
  border-style: solid;
  border-width: 2px;
  border-color: rgb(145, 29, 192);
  background-color: rgb(255, 255, 255);
}

.UserMenuItem p {
  color: rgba(255, 255, 255, 0.5);
  margin: 0px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 0px;
  padding-bottom: 0px;
  font-weight: 800;
}

.UserMenuItem a {
  color: #fff;
  margin: 4px;
  font-size: 12px;
  padding-left: 7px;
  padding-right: 7px;
  padding-top: 3px;
  padding-bottom: 3px;
  font-weight: 800;
}

.footer {
  margin: 0px;
  padding: 10px;
}

.footer p {
  margin: 0px;
  font-size: 12px;
  font-weight: 100;
  text-align: left;
}

.footer a {
  color: rgb(145, 29, 192);
}
</style>
