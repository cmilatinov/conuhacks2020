<template>
    <div class="main-container">
        <div class="profile-card">
            <b-input v-model="user.fname" placeholder="First Name" />
            <b-input v-model="user.lname" placeholder="Last Name" />
            <b-input v-model="username" placeholder="Username" />
            <b-input v-model="email" placeholder="E-mail" />
        </div>
    </div>
</template>

<script>

    export default {
        components: {
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
    .event-list {
        padding: 10% 25%;
    }
</style>

