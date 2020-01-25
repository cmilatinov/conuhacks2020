<template>
  <div class="main-container">
    <div class="login-card" v-if="login">
      <div class="header">Login</div>
      <b-input class="login-in" v-model="existingUser.email" placeholder="Email" />
      <b-input
        class="login-in"
        v-model="existingUser.password"
        placeholder="Password"
        type="password"
      />

      <b-button class="login-in" @click="submitLogin" variant="primary">Login</b-button>
      <div class="register-info">Don't have an account yet?</div>
      <b-link class="register-info" @click="login = false">Register here!</b-link>
    </div>
    <div class="login-card" v-else>
      <div class="header">Register</div>
      <b-input class="login-in" v-model="newUser.fname" placeholder="First Name" />
      <b-input class="login-in" v-model="newUser.lname" placeholder="Last Name" />
      <b-input class="login-in" v-model="newUser.email" placeholder="E-mail" />
      <b-input class="login-in" v-model="newUser.password" placeholder="Password" type="password" />

      <b-button class="login-in" @click="register" variant="primary">Register</b-button>
      <div class="register-info">Already have an account?</div>
      <b-link class="register-info" @click="login = true">Login here!</b-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: true,

      existingUser: {
        email: ``,
        password: ``
      },

      newUser: {
        fname: ``,
        lname: ``,
        email: ``,
        password: ``
      }
    };
  },

  methods: {
    submitLogin() {
      this.$net
        .post(`/users/login`, this.existingUser)
        .then(res => {
          this.$store.commit(`setUser`, res.data);
          this.$router.push("/home");
        })
        .catch(err => {
          this.$swal(`ERROR`, `Unable to login`, `error`);
        });

      //this.$net.get(`/users/${id}`) this.$store.getters.currentUser
    },

    register() {
      this.$net
        .post(`/users/register`, this.newUser)
        .then(res => {
          this.$swal(
            `SUCCESS`,
            `You have been registered successfully!`,
            `success`
          );
          this.login = true;
        })
        .catch(err => {
          this.$swal(`ERROR`, `Unable to register`, `error`);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.login-in {
  margin: 2%;
}

.login-card {
  background-color: white;
  padding: 5%;

  box-shadow: 0 0 25px -10px black;

  border-radius: 40px;
}

.main-container {
  padding: 10% 25%;
}

.register-info {
  margin: 0 2% 0 2%;
}

.header {
  font-weight: 500;
  text-transform: uppercase;
  font-size: 1.5em;
  margin: 0 2% 2% 2%;

  color: #383838;

  margin-bottom: 1.5%;
}
</style>