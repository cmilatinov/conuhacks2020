<template>
    <div class="event-card">
        <div class="header">{{eventInfo.name[lang]}}</div>
        <div class="description">{{eventInfo.description[lang]}}</div>
        <b-button variant="outline-primary" @click="learnMore">Learn More</b-button>
    </div>
</template>

<script>
    import globalMixin from '../mixins/global-mixin';

    export default {
        props: {
            eventInfo: Object
        },
        methods: {
            learnMore() {
                this.$emit('learnMore', this.eventInfo.id);
                // this.$router.push(`/event/${this.eventInfo.id}`);
            }
        },
        mixins: [globalMixin]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .event-card {
        background-color: white;
        border-radius: 20px;

        transition: 0.3s;

        padding: 5%;

        &:hover {
            box-shadow: 0 0 15px -10px black;
            transition: 0.3s;
        }
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

