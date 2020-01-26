<template>
  <div class="main-container">
    <div class="custom-container events">
        <div class="container-header">All Events</div>
        <div class="event-list">
            <event-card :eventInfo="event" v-for="event of events" :key="event.id">
            </event-card>
        </div>
    </div>
    <div class="custom-container profile">
        <div class="logout">Logout <icon icon="sign-out-alt" class="icon"></icon></div>
        <div class="content">{{currUser.fname}} {{currUser.lname}}</div>
        <div class="content">{{currUser.email}}</div>
        <div>{{currUser}}</div>

        <div>Your Events</div>
    </div>
  </div>
</template>

<script>
import EventCard from "../components/event-card";

export default {
    components: {
        "event-card": EventCard
    },

    activated() {
        net.get(`/events/list`)
        .then(res => {
            this.events = res.data;
            console.log(this.events);
        }).catch(err => {});
    },

    methods: {
        learnEvent() {
            this.router.push();
        }
    },

    data() {
        return {
            events: []
        }
    },

    computed: {
        currUser() {
            return this.$store.getters.currentUser;
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.event-list {
  padding: 5% 15% 10% 15%;
  width: 75vw;
}

.icon {
    position: absolute; 
    right: 1.5%;
}

.content {
    font-weight: 400;
    text-align: center;
    margin: 5% 5% 0 5%;
}

.logout {
    font-weight: 600;
    width: 100%;
    margin: 5%;
}

.event-card {
    margin: 0 0 6% 0;
}
</style>

