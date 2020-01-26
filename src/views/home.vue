<template>
  <div class="main-container">
    <div class="custom-container events">
        <div class="container-header">Hey {{currUser.fname}}, Welcome Back to Vault!</div>
        <div class="event-list">
            <event-card @learnMore="learnMore" :eventInfo="event" v-for="event of events" :key="event.id">
            </event-card>
        </div>
    </div>
    <div class="custom-container profile">
        <div class="logout" @click="logout">Logout <icon icon="sign-out-alt" class="icon"></icon></div>
        <div class="profile-info">
            <icon icon="user" class="user-icon"></icon>
            <div class="content title">Name</div>
            <div class="content">{{currUser.fname}} {{currUser.lname}}</div>
            <div class="content title">Email</div>
            <div class="content">{{currUser.email}}</div>
            
            <radar-chart
                :labels="currUser.skills.map(s => s.name[lang])"
                :datasets="[{
                    label: 'Skills',
                    backgroundColor: 'rgba(224, 103, 80, 0.7)',
                    data: currUser.skills.map(s => s.rating)
                    }]"
                :options="{             
                    scale: {
                        angleLines: {
                            display: false
                        },
                        ticks: {
                            suggestedMin: 0,
                            suggestedMax: 5
                        }
                    }
                }"
            ></radar-chart>
        </div>
    </div>
    <b-modal id="deleteConfirm"
            title="Event Information"
            v-model="showEvent">
        <b-container fluid v-if="currEvent !== null">
            <div class="header">{{currEvent.name[lang]}}</div>
            <div class="content">{{currEvent.remainingTime}}</div>
            <div class="content">{{currEvent.description[lang]}}</div>

            <div class="header">Jobs</div>
            <div v-for="job of currEvent.jobs" :key="job.id" class="job-container">
                <div class="job-title">
                    {{job.title[lang]}}
                </div>
                <div class="job-skills">Skills: {{job.skills.map(s => s.name[lang]).join(', ')}}</div>
                <div class="job-tasks">Tasks: {{job.tasks.map(t => t.name[lang]).join(', ')}}</div>
            </div>
        </b-container>
        <div slot="modal-footer">
            <b-button variant="danger" style="margin-right: 10px;"
                    @click="showEvent = false">
                Close
            </b-button>
        </div>
    </b-modal>
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
        },
        learnMore(id) {
            net.get(`/events/${id}`).then(res => {
                this.currEvent = res.data;

                this.currEvent.start = new Date(this.currEvent.start);
                this.currEvent.end = new Date(this.currEvent.end);
                this.currEvent.remainingTime = this.getRemainingTime();
                this.showEvent = true;
            }).catch(err => {
                console.log(err);
            });
        },
        getRemainingTime() {
          let difference =  this.currEvent.start - new Date().getTime();
          let days = Math.floor(difference / (1000 * 60 * 60 * 24));
            let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          return `Days ${days}, Hours ${hours}, Minutes ${minutes}`;
      }
    },

    data() {
        return {
            events: [],
            currEvent: null,
            showEvent: false,
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
.custom-container {
    overflow: hidden;
}
.event-list {
  padding: 5% 15% 10% 15%;
  width: 75vw;
  height: 100%;
  overflow-y: auto;
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

.create-btn {
    width: 88%;
    margin: 3% 6% 3% 6%;
}
</style>

