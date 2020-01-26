<template>
    <b-modal id="menu-modal-form"
        :visible="value"
        title="Event Info"
        header-bg-variant="dark"
        header-text-variant="light"
        body-bg-variant="dark"
        body-text-variant="light"
        footer-bg-variant="dark"
        footer-text-variant="light"
        
        @change="$emit('input', $event)">

        <b-container fluid>
            <div class="header">{{event.name[lang]}}</div>
          <div class="time">{{remainingTime}} minutes until it begins</div>
          <div class="content">{{event.description[lang]}}</div>
        </b-container>

        <div slot="modal-footer">
            <button class="btn btn-outline-light modal-default-button" 
                    style="margin-right: 10px;"
                    @click="$emit('cancel')">
                Cancel
            </button>
            <button class="btn btn-primary modal-default-button" :disabled="!validForm"
                    @click="prepareObject">
                {{action.text}}
            </button>
        </div>
    </b-modal>
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
    },
    value: Boolean
  },
};
</script>

<style lang="scss" scoped>
</style>