<template>
    <div class="main-container body">
        <div class="login-card" v-if="login">
            <div class="header">Login</div>
            <b-input v-model="username" placeholder="Username" />
            <b-input v-model="pass" placeholder="password" type="Password" />

            <b-button variant="primary">Login</b-button>
            <b-link @click="login = false">Register here</b-link>
        </div>
        <div class="login-card" v-else>
            <div class="header">Register</div>
            <b-input v-model="newUser.fname" placeholder="First Name"/>
            <b-input v-model="newUser.lname" placeholder="Last Name"/>
            <b-input v-model="newUser.username" placeholder="Username"/>
            <b-input v-model="newUser.email" placeholder="E-mail"/>

            <b-button variant="primary">Register</b-button>
            <b-link @click="login = true">Login here</b-link>

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                login: true,

                username: ``,
                pass: ``,

                newUser: {
                    fname: ``,
                    lname: ``,
                    email: ``,
                    username: ``,
                }
            }
        },

        methods: {
            login() {

            },

            register() {

            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .body{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .login-card {
        display: block;

        background-color: white;
    }
</style>