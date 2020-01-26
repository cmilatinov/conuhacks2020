<template>
  <div class="main-container">
    <div class="section-header">Currently Enrolled Events</div>
    <div class="event-list">
      <div class="event-container" v-for="event of events" :key="event.id">
        <event-card @learnMore="learnMore" class="event-card" :eventInfo="event"></event-card>
      </div>
    </div>
    <div class="section-header">Your Created Events (Admin)</div>
    <div class="event-list">
      <div class="event-container" v-for="allEvent of allEvents" :key="allEvent.id">
        <event-card @learnMore="editEvent" class="event-card" :eventInfo="allEvent" variant="danger" altText="Edit"></event-card>
      </div>
    </div>
    <div class="profile-info">
      <div class="name">{{currUser.fname}} {{currUser.lname}}</div>
      <div class="icon-container">
        <icon class="profile-icon" icon="user-alt"></icon>
      </div>
    </div>

    <b-modal id="deleteConfirm" title="Event Information" v-model="showEvent">
      <b-container fluid v-if="currEvent !== null">
        <div class="header">{{currEvent.name[lang]}}</div>
        <div class="content">{{currEvent.remainingTime}}</div>
        <div class="content">{{currEvent.description[lang]}}</div>

        <div class="header">Jobs</div>
        <div v-for="job of currEvent.jobs.filter(j => userJobs.find(jj => jj.event_id === currEvent.id && jj.job_id === j.id))" :key="job.id" class="job-container">
          <div class="job-title">{{job.title[lang]}}</div>
          <div class="job-skills">Skills: {{job.skills.map(s => s.name[lang]).join(', ')}}</div>
          <div class="job-tasks">Tasks: {{job.tasks.map(t => t.name[lang]).join(', ')}}</div>

          <b-button class="modal-btn" variant="primary" @click="taskCompleted">Job Completed</b-button>
        </div>
      </b-container>
      <div slot="modal-footer">
        <b-button variant="danger" style="margin-right: 10px;" @click="showEvent = false">Close</b-button>
      </div>
    </b-modal>

    <b-modal id="deleteConfirm" title="Event Information" v-model="showEdit">
      <b-container fluid v-if="currEvent !== null">
        <div class="modal-hdr" style="margin-top: 5%;">Name</div>
        <b-input class="form-input" v-model="currEvent.name[lang]"/>

        <div class="modal-hdr" style="margin-top: 5% 0 1% 0;">Description</div>
        <b-textarea class="form-input" v-model="currEvent.description[lang]"/>

        <div class="modal-hdr" style="margin-top: 5% 0 1% 0;">Start Date</div>
        <b-input class="form-input" v-model="currEvent.start" type="date"/>

        <div class="modal-hdr" style="margin-top: 5% 0 1% 0;">End Date</div>
        <b-input class="form-input" v-model="currEvent.end" type="date"/>
      </b-container>
      <div slot="modal-footer">
        <b-button variant="danger" style="margin-right: 10px;" @click="showEdit = false">Close</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import EventCard from "../components/event-card";
import RadarChart from "../components/radar-chart";
import net from "../helpers/network";

export default {
  components: {
    "event-card": EventCard,
    "radar-chart": RadarChart
  },

  activated() {
    net.get(`/users/${this.currUser.id}/job`).then(res => {
      this.userJobs = res.data;
      console.log(this.userJobs);
    }).catch(err => {
      console.log(err);
    })


    net
      .get(`/users/${this.currUser.id}/events`)
      .then(res => {
        this.events = res.data;
      })
      .catch(err => {
        console.log(err);
      });
    net
      .get(`/events/list`)
      .then(res => {
        let events = res.data;
        this.allEvents = events.filter(event =>
          event.admins.includes(this.currUser.id)
        );
        console.log(this.allEvents);
      })
      .catch(err => {
        console.log(err);
      });
  },

  methods: {
    taskCompleted() {
      this.events.splice(this.events.indexOf(this.currEvent), 1);
      this.showEvent = false;
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
    logout() {
      this.$store.commit("logout");
      this.$router.push("/authentication");
    },
    learnMore(id) {
      net
        .get(`/events/${id}`)
        .then(res => {
          this.currEvent = res.data;

          this.currEvent.start = new Date(this.currEvent.start);
          this.currEvent.end = new Date(this.currEvent.end);
          this.currEvent.remainingTime = this.getRemainingTime();
          this.showEvent = true;
        })
        .catch(err => {
          console.log(err);
        });
    },

    editEvent(id) {
      net
        .get(`/events/${id}`)
        .then(res => {
          this.currEvent = res.data;

          this.currEvent.start = new Date(this.currEvent.start);
          this.currEvent.end = new Date(this.currEvent.end);
          this.currEvent.remainingTime = this.getRemainingTime();
          this.showEdit = true;
        })
        .catch(err => {
          console.log(err);
        });
    },

    getRemainingTime() {
      let difference = this.currEvent.start - new Date().getTime();
      let days = Math.floor(difference / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      return `Days ${days}, Hours ${hours}, Minutes ${minutes}`;
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
  },

  data() {
    return {
      events: [],
      allEvents: [],
      currEvent: null,
      showEvent: false,
      showEdit: false,
      userJobs: [],
    };
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
      color: #fefefe;
    }
  }
}

.modal-hdr {
    font-weight: 500;
    text-transform: uppercase;
    font-size: 1.1em;
    letter-spacing: 2px;
}

.modal-timer {
    margin-bottom: 1.5%;
    font-size: 0.8em;
    opacity: 0.7;
}

.modal-cntent {
    margin-top: 3%;
}

.modal-sub-hdr {
    font-weight: 500;
}

.job-title {
    margin-top: 2%;
    text-decoration: underline;
    font-weight: 500;
}

.modal-btn {
    size: small;
    margin: 3% 0;
    width: 100%;
}
</style>

