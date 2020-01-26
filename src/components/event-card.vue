<template>
    <div :class="`event-card ${variant}`">
        <div class="header">{{eventInfo.name[lang]}}</div>
        <div class="description">{{eventInfo.description[lang]}}</div>
        <div class="button-row">
            <b-button style="font-size: 0.7em;" :variant="`outline-${variant}`" @click="learnMore">Learn More</b-button>
        </div>
    </div>
</template>

<script>
    import globalMixin from '../mixins/global-mixin';

    export default {
        props: {
            eventInfo: Object,
            variant: {
                type: String,
                default: 'primary'
            }
        },
        methods: {
            learnMore() {
                this.$router.push(`/event/${this.eventInfo.id}`);
            }
        },
        mixins: [globalMixin]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .event-card {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        background-color: white;
        border-radius: 20px;

        opacity: 0.8;

        transition: 0.3s;

        padding: 10%;

        &:hover {
            box-shadow: 0 0 15px -10px black;
            transition: 0.3s;
        }

        &.danger {
            color: #721c24;
            background-color: #f8d7da;
            border: 1px solid #f5c6cb;
        }

        &.info {
            color: #0c5460;
            background-color: #d1ecf1;
            border-color: #bee5eb;
        }

        &.primary {
            color: #004085;
            background-color: #cce5ff;
            border-color: #b8daff;
        }

        &.warning {
            color: #856404;
            background-color: #fff3cd;
            border-color: #ffeeba;
        }
    }

    .header {
        font-weight: 500;
        text-transform: uppercase;
        font-size: 1.1em;

        margin-bottom: 1.5%;
    }

    .description {
        color: #585858;
        font-size: 0.8em;
        margin-top: 10px;
    }

    .button-row {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin-top: 20px;
    }
</style>

