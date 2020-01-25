<template>
    <div class="event-card">
        <div class="header"></div>
        <div class="description"></div>
        <b-button @click="learnMore">Learn More</b-button>
    </div>
</template>

<script>
    export default {
        methods: {
            learnMore() {

            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .event-card {
        background-color: white;
    }
</style>

