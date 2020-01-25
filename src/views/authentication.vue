<template>
    <div class="body">
        <div class="login-card" v-if="login">
        
        </div>
        <div class="login-card" v-else>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                login: true,
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .body{
        background-color: #F29559;
        height: 100vh;
        width: 100vw;
    }
</style>