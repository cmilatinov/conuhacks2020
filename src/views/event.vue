<template>
  <div class="main-container">
      <div class="container-header">
          Event Description
      </div>
      <div class="event-card" v-if="event !== null">
          <div class="header">{{event.name[lang]}}</div>
          <div class="time">{{remainingTime}} minutes until it begins</div>
          <div class="content">{{event.description[lang]}}</div>
      </div>
      
      <div class="container-header">
          Jobs Available
      </div>

      <div class="event-card" v-for="j of event.jobs" :key="j.id">
          <div class="header">{{j.title[lang]}}</div>
          <div class="content">{{j.description[lang]}}</div>
          <div class="content">Tasks: {{j.tasks.map(t => t.name[lang]).join(', ')}}</div>

          <b-button class="signup" variant="primary" @click="signUp(j.id)">Sign Up</b-button>
      </div>
  </div>
</template>

<script>
import net from '../helpers/network';

export default {
  activated() {
        net.get(`/events/${this.id}`).then(res => {
            this.event = res.data;

            console.log(this.event);

            this.event.start = new Date(this.event.start);
            this.event.end = new Date(this.event.end);

            this.setRemainingTime();
        }).catch(err => {
            console.log(err);
        });
  },

  methods: {
      signUp(job) {
          net.post(`/events/signup`, {event_id: this.event.id, job_id: job}).then(res => {

          }).catch(err => {

          })
      },

      setRemainingTime() {
          let difference = new Date().getTime() - this.event.start;
          console.log(difference);
          this.remainingTime = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      }
  },

  data() {
    return {
        event: null,
        remainingTime: 0,
    }
  },

  props: {
    id: {
      type: Number
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .event-card {
        background-color: white;
        padding: 3%;
        margin: 2%;

        box-shadow: 0 0 25px -10px black;

        border-radius: 40px;
    }

    .header {
        font-weight: 500;
        text-transform: uppercase;
        font-size: 1.5em;
        margin: 0 2% 0 2%;

        color: #383838;
    }

    .content {
        color: #383838;

        margin: 0 2% 1.5% 2%;
        font-size: 1.2em;
    }

    .time {
        color: #383838;

        margin: 0 2% 1.5% 2%;
        font-size: 1em;
    }

    .signup {
        margin: 0 0 0 2%;
    }

    .container-header {
        margin: 2% 5% 2% 5%;
        padding: 0;
    }
</style>