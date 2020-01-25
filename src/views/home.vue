<template>
    <div class="main-container">
        <div class="container-header">Events</div>
        <div class="event-list">
            <event-card>
            </event-card>
        </div>
    </div>
</template>

<script>
    import EventCard from '../components/event-card';

    export default {
        components: {
            'event-card': EventCard
        },

        data() {
            return {
                events: []
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .event-list {
        padding: 5% 25% 10% 25%;
    }
</style>

