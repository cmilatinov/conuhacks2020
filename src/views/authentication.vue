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

    <div style="display: flex; justify-content: space-between">
        <b-checkbox v-model="rememberMe" style="opacity: 0.8;">Remember Me</b-checkbox>
      <b-link>Forgot Password?</b-link>
    </div>

      <b-button class="login-in" @click="submitLogin" variant="primary" style="width: 100%;">Login</b-button>
      <div class="register-info" style="opacity: 0.8;">Don't have an account yet? <b-link class="register-info" @click="login = false">Register here!</b-link></div>
    </div>
    <div class="login-card" v-else>
      <div class="header">Register</div>
      <b-input class="login-in" v-model="newUser.fname" placeholder="First Name" />
      <b-input class="login-in" v-model="newUser.lname" placeholder="Last Name" />
      <b-input class="login-in" v-model="newUser.email" placeholder="E-mail" />
      <b-input class="login-in" v-model="newUser.password" placeholder="Password" type="password" />

      <b-button class="login-in" @click="register" variant="primary" style="width: 100%;">Register</b-button>
      <div class="register-info" style="opacity:0.8">Already have an account? <b-link class="register-info" @click="login = true">Login here!</b-link></div>
    </div> 
  </div>
</template>

<script>
	import net from '../helpers/network';

    export default {
        data() {
            return {
                login: true,

                existingUser: {
                    email: ``,
                    password: ``,
                },

                newUser: {
                    fname: ``,
                    lname: ``,
                    email: ``,
                    password: ``,
                },

                rememberMe: false,
            }
        },

        methods: {
            submitLogin() {
                net.post(`/users/login`, 
                this.existingUser).then(res => {
                    net.get(`/users/${res.data.id}`).then(async res => {
						let user = res.data;
                        user.participating = (await net.get(`/users/${user.id}/events`)).data;
                        this.$store.commit(`setUser`, res.data);
                        this.$router.push('/home');
                    }).catch(err => {
                        console.log(err);
                        this.$swal(`ERROR`, `Unable to login`, `error`);
                    });
                }).catch(err => {
                    this.$swal(`ERROR`, `Unable to login`, `error`);
                })
            },

            register() {
                net.post(`/users/register`, this.newUser).then(res => {
                    this.$swal(`SUCCESS`, `You have been registered successfully!`, `success`);
                    this.login = true;
                }).catch(err => {
                    this.$swal(`ERROR`, `Unable to register`, `error`);
                });
            }
        },
    };
</script>

<style lang="scss" scoped>
.login-in {
    margin: 2% 0;
}

.login-card {
  background-color: white;
  padding: 5%;

  box-shadow: 0 0 15px -10px black;

  border-radius: 20px;
}

.main-container {
  padding: 10% 25%;
    display: block;
}

.register-info {
  margin: 0;
}

.header {
  font-weight: 500;
  text-transform: uppercase;
  font-size: 1.5em;
  margin: 0 2% 2% 0;
  letter-spacing: 2px;

  color: #383838;

  margin-bottom: 1.5%;
}
</style>