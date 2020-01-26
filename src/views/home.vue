<template>
  <div class="main-container">
        
    <div class="container-header">Hello {{currUser.fname}}, Welcome Back!</div>
    <div class="section-header">Upcoming Events</div>
    <div class="event-list">
        <div class="event-container" v-for="event of events" :key="event.id">
            <event-card class="event-card" :eventInfo="event">
            </event-card>
        </div>
    </div>

    <div class="profile-info">
        <div class="name">{{currUser.fname}} {{currUser.lname}}</div>
        <div class="icon-container">
            <icon class="profile-icon" icon="user-alt"></icon>
        </div>
    </div>

    <div class="hint-row">
        <div class="hint"><strong>{{nbEvents}}</strong> recently posted events</div>
        <div class="hint"><strong>{{nbUsers}}</strong> active users</div>
    </div>

  </div>
</template>

<script>
import EventCard from "../components/event-card";
import RadarChart from "../components/radar-chart";
import net from '../helpers/network';

export default {
    components: {
        "event-card": EventCard,
        "radar-chart": RadarChart,
    },

    activated() {
        net.get(`/events/list`)
        .then(res => {
            this.events = res.data;
            
            let user = this.currUser;
            user.managing = this.events.filter(e => e.admins.includes(user.id));
            this.$store.commit(`setUser`, user);

        }).catch(err => {
            console.log(err);
        });
    },

    methods: {
        getRandomInt () {
            return Math.floor(Math.random() * (50 - 5 + 1)) + 5
        },
        logout() {
            this.$store.commit('logout');
            this.$router.push('/authentication');
        }
    },

    data() {
        return {
            events: [],
            nbUsers: Math.floor(Math.random() * 20000),
            nbEvents: Math.floor(Math.random() * 1000)
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
.main-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 3%;
}

.event-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.event-container {
    width: 33%;
    padding: 2%;
}

.container-header {
    font-weight: 600;
    font-size: 1.5em;
    width: 100%;
    text-align: center;

    margin: 2% 0;
}

.section-header {
    font-weight: 400;
    font-size: 1.1em;
    width: 100%;
    text-align: left;

    margin: 1% 3%;
}

.profile-info {
    position: fixed;
    opacity: 0.6;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 20px 35px;
    cursor: pointer;

    .name {
        font-size: 0.9em;
        font-weight: 600;
        opacity: 0;
        transition: 0.2s;
        transform: translateX(15%);
    }

    &:hover > .name {
        transform: none;
        opacity: 1;
    }

    .icon-container {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        border-radius: 50px;
        margin-left: 10px;
        border: 1px solid rgba(0, 0, 0, 0.3);
        font-size: 1.2em;
        color: rgba(0, 0, 0, 0.3);
        transition: 0.2s;

        &:hover {
            background-color: rgb(40, 40, 40);
            border: none;
            color: #FEFEFE;
        }
    }
}

.hint-row {
    position: absolute;
    display: flex;
    flex-direction: row;
    align-items: center;
    bottom: 0;
    left: 0;
    margin: 20px;
    font-size: 0.8em;
    opacity: 0.7;

    .hint {
        margin-right: 20px;
    }
}
</style>

