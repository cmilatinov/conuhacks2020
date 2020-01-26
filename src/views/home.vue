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
        <div class="profile-info">
            <icon icon="user" class="user-icon"></icon>
            <div class="content title">Name</div>
            <div class="content">{{currUser.fname}} {{currUser.lname}}</div>
            <div class="content title">Email</div>
            <div class="content">{{currUser.email}}</div>

            <div class="header">Your Events</div>
            <div class="content participating" v-for="e of currUser.participating" :key="e.id">
                <div class="event-name">
                    {{e.name[lang]}}
                </div>
                <div class="event-status">status: participating</div>
            </div>
            <div class="content managing" v-for="e of currUser.managing" :key="e.id">
                <div class="event-name">{{e.name[lang]}}</div>
                <div>status: managing</div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import EventCard from "../components/event-card";

export default {
    components: {
        "event-card": EventCard,
    },

    activated() {
        this.$net
        .get(`/events/list`)
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
        }
    },

    data() {
        return {
            events: [],
            datacollection: {
                labels: [this.getRandomInt(), this.getRandomInt()],
                datasets: [
                    {
                    label: 'Data One',
                    backgroundColor: '#f87979',
                    data: [this.getRandomInt(), this.getRandomInt()]
                    }, {
                    label: 'Data One',
                    backgroundColor: '#f87979',
                    data: [this.getRandomInt(), this.getRandomInt()]
                    }
                ]
            }
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

.user-icon {
    text-align: center;
    width: 100%;
    font-size: 6em;
    margin-bottom: 10%;

    border-radius: 25px;
}

.content {
    font-weight: 400;
    margin: 0 6% 3% 6%;
}

.logout {
    font-weight: 600;
    width: 100%;
    margin: 5% 5% 10% 5%;

    cursor: pointer;
}

.header {
    font-weight: 600;
    font-size: 1.2em;
    width: 100%;
    text-align: center;

    margin: 5% 0;
}

.event-card {
    margin: 0 0 6% 0;
}

.profile-info {
    overflow-y: auto;
}

.participating {
    background-color: #99cccc;
    font-weight: 700;
    color: #0e1d1d;
    border-radius: 15px;
    padding: 5%;
    font-size: 1.2em;

    text-align: left;
}

.event-status {
    font-weight: 500;
    font-size: 0.9em;
}

.managing {
    background-color: #FF6961;
    color: white;

}

.title {
    font-weight: 700;
    text-align: left;
}
</style>

