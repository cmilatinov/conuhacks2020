<template>
    <div class="main-container">
        <div class="profile-card">
            <chart :data="[]" :options="{}"></chart>
            <div class="header">Profile</div>
            <b-img class="profile-image"></b-img>
            <b-form-file class="profile-input" v-model="file2" plain></b-form-file>
            <b-input class="profile-input" v-model="username" placeholder="Username" />
            <b-input class="profile-input" v-model="email" placeholder="E-mail" />
            <b-input class="profile-input" v-model="user.fname" placeholder="First Name" />
            <b-input class="profile-input" v-model="user.lname" placeholder="Last Name" />
        </div>
    </div>
</template>

<script>
    import Chart from '../components/chart';
    export default {
        components: {
            'chart': Chart
        },

        data() {
            return {
                user: {
                    fname: ``,
                    lname: ``,
                    username: ``,
                    email: ``,
                }
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .profile-input {
        margin: 2%;
    }

    .profile-card {
        background-color: white;
        padding: 5%;

        box-shadow: 0 0 25px -10px black;

        border-radius: 40px;
    }

    .main-container {
        padding: 10%;
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

