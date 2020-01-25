<template>
    <div class="event-card">
        <div class="header">event</div>
        <div class="description">asdkljhfaskdjlhfaksdjhfkjlh</div>
        <b-button variant="outline-primary" @click="learnMore">Learn More</b-button>
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
        border-radius: 20px;

        box-shadow: 0 0 20px -10px black;

        padding: 5%;
    }

    .header {
        font-weight: 500;
        text-transform: uppercase;
        font-size: 1.4em;

        margin-bottom: 1.5%;
    }

    .description {
        color: #585858;
        font-size: 1.1em;

        margin-bottom: 2%;
    }
</style>

